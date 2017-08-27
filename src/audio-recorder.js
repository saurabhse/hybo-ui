import React from 'react';
import AWS from "aws-sdk";

var recLength = 0,
  SIXTEEN_kHz = 16000,
  recBuffer = [],
  sampleRate;

export default class AudioRecorder extends React.Component {

    constructor(props) {
        super(props);
        var _this = this;

        this.state = {
            recordStyle: "idle",
            audioURL : ""
        };

      //variables
        this.recorder = {};
        this.audioContext = new AudioContext();
        this.userAudio = {};
        this.lexAudio = {};
        this.sampleRate='';

      //configurations
        var AWSConfig = new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'});
        var LexConfig = new AWS.Config({
            credentials: AWSConfig,
            region: 'us-east-1',
        });

        /*AWS.config.update({
            credentials: AWSConfig,
            region: 'us-east-1'
        });

        this.lexruntime = new AWS.LexRuntime();*/
        this.lexruntime = new AWS.LexRuntime({
            region: 'us-east-1',
            credentials: new AWS.Credentials('AKIAIPYR3OQRFI5QG37A', 'SOYkKD3TpaimJRNn74D4guHb4bAFazyBG9Ea7RLI', null)
          });

      this.record = this.record.bind(this);
      this.stop = this.stop.bind(this);
      this.sendToServer = this.sendToServer.bind(this);
      this.encodeWAV = this.encodeWAV.bind(this);


    }

    componentDidMount() {

        var _this = this;

        navigator.mediaDevices.getUserMedia({
            audio:true
        }).then(
            function onSuccess(stream) {
                console.log('22222 '+_this);
                var data = [];

                _this.recorder = new MediaRecorder(stream);
                console.log('3333 '+_this);
                _this.userAudio = document.getElementById('user-speech');
                _this.lexAudio = document.getElementById('lex-speech');
                console.log('4444 '+_this);
                _this.recorder.ondataavailable = function(e) {
                     console.log('ondataavailable');
                     console.log('ondataavailable data'+ e.data);
                    data.push(e.data);
                };

                _this.recorder.onerror = function(e) {
                     console.log('onstart');
                    throw e.error || new Error(e.name);
                }

                _this.recorder.onstart = function(e) {
                    console.log('onerror');
                    data = [];
                }

                _this.recorder.onstop = function(e) {
                         console.log('onerror');
                         console.log('onerror data'+ data);
                var blobData = new Blob(data, {type: 'audio/x-l16'});

                    _this.userAudio.src = window.URL.createObjectURL(blobData);

                    var reader = new FileReader();

                    reader.onload = function() {

                        _this.audioContext.decodeAudioData(reader.result, function(buffer) {

                        _this.reSample(buffer, 16000, function(newBuffer) {

                            var arrayBuffer = _this.convertFloat32ToInt16(newBuffer.getChannelData(0));
                            _this.sendToServer(_this.exportBuffer(newBuffer.getChannelData(0)[0]));

                            });
                        });
                    };
                    reader.readAsArrayBuffer(blobData);
                }

            })
        .catch(function onError(error) {
          console.log(error.message);
        });
    }

    record() {
        console.log('111 '+this.recorder);
        this.recorder.start();
    }

    stop() {
        this.recorder.stop();
    }

    reSample(audioBuffer, targetSampleRate, onComplete) {
        console.log('reSample' );
        var channel = audioBuffer.numberOfChannels;
        var samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;

        var offlineContext = new OfflineAudioContext(channel, samples, targetSampleRate);
        var bufferSource = offlineContext.createBufferSource();
        bufferSource.buffer = audioBuffer;

        bufferSource.connect(offlineContext.destination);
        bufferSource.start(0);
        offlineContext.startRendering().then(function(renderedBuffer){
          onComplete(renderedBuffer);
        })
    }

    convertFloat32ToInt16(buffer) {
        var l = buffer.length;
        var buf = new Int16Array(l);
        while (l--) {
                buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
        }
        return buf.buffer;
    }
 floatTo16BitPCM(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}
    encodeWAV(samples) {
        
  var buffer = new ArrayBuffer(44 + samples.length * 2);
  var view = new DataView(buffer);

  this.writeString(view, 0, 'RIFF');
  view.setUint32(4, 32 + samples.length * 2, true);
  this.writeString(view, 8, 'WAVE');
  this.writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  this.writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  this.floatTo16BitPCM(view, 44, samples);

  return view;
}
 writeString(view, offset, string) {
  for (var i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

 exportBuffer(recBuffer) {
  var mergedBuffers = this.mergeBuffers(recBuffer, recBuffer.length);
  var downsampledBuffer = this.downsampleBuffer(mergedBuffers, SIXTEEN_kHz);
  var encodedWav = this.encodeWAV(downsampledBuffer);
  var audioBlob = new Blob([encodedWav], { type: 'application/octet-stream' });
  return audioBlob
}

mergeBuffers(bufferArray, recLength) {
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < bufferArray.length; i++) {
    result.set(bufferArray[i], offset);
    offset += bufferArray[i].length;
  }
  return result;
}

downsampleBuffer(buffer) {
    if (SIXTEEN_kHz === sampleRate) {
      return buffer;
    }
    var sampleRateRatio = sampleRate / SIXTEEN_kHz;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Float32Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
      var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      var accum = 0,
        count = 0;
      for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }
    sendToServer (audioData) {
        var _this = this;
        var params = {
            botAlias: '$LATEST', /* required */
            botName: 'BookTrip', /* required */
            contentType: 'audio/x-l16; sample-rate=16000; channel-count=1', /* required */
            inputStream: audioData, /* required */
            userId: 'ss', /* required */
            accept: 'audio/mpeg'
        };

        this.lexruntime.postContent(params, function(err, data) {
            if (err) console.log('ERROR!', err, err.stack); // an error occurred
                else {
                    var uInt8Array = new Uint8Array(data.audioStream);
                    var arrayBuffer = uInt8Array.buffer;
                    var blob = new Blob([arrayBuffer]);
                    var url = URL.createObjectURL(blob);
                    _this.lexAudio.src = url;
                    _this.lexAudio.play();
                }
        });
    }

    render() {
        return (
          <div>
            <span onClick={this.record} className={this.state.recordStyle}>Record</span>
            <span onClick={this.stop}>Stop</span>
            <audio id="user-speech" controls>No support of audio tag</audio>
            <audio id="lex-speech" controls>No support of audio tag</audio>
          </div>
        )
    }
}
