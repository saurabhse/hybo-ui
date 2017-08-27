import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';
import BootstrapTable from 'reactjs-bootstrap-table';
import style from './App.css';


class Portfolio extends Component {

  constructor(props) {
      super(props);
      this.state = { clientId : ''}
      this.getData = this.getData.bind(this);
      this.getCurrentDate = this.getCurrentDate.bind(this);
    }

rd(data1){
    //var data1 = [{"asset":10000, "gg":[{"label":"VOE(E)","value":"47635.69","clientId":308336},{"label":"VBR(B)","value":"6851.599999999999","clientId":308336},{"label":"VTV","value":"6347.84","clientId":308336},{"label":"VTI","value":"23652.9","clientId":308336},{"label":"SHV","value":"32303.25","clientId":308336},{"label":"LQD","value":"115.04","clientId":308336}]}]
    //alert(data1[0].asset);
    //alert(data1[0].gg);
    //alert(data1[0].gg[0]);
  fusioncharts.ready(function () {
    var revenueChart = new fusioncharts({
        type: 'doughnut2d',
        renderAt: 'chart-container',
        width: '550',
        height: '465',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Portfolio",
                "subCaption": "Current",
                "numberPrefix": "$",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "1",
                "baseFontSize":"15",
                "startingAngle": "310",
                "labelFontBold":"1",
                "showLabels": "0",
                "showPercentValues": "1",
                "showLegend": "1",
                "legendShadow": "0",
                "legendBorderAlpha": "0",
                "defaultCenterLabel": "Total Assets: "+data1.total,
                "centerLabel": "$label: $value",
                "centerLabelBold": "1",
                "showTooltip": "0",
                "decimals": "0",
                "captionFontSize": "20",
                "subcaptionFontSize": "16",
                "subcaptionFontBold": "0"
            },
            "data":data1.data
        }
    }).render();
});
}
componentDidMount() {
        //alert(this.props.clientId);
        this.state = { clientId : this.props.clientId}
        //alert(this.state.clientId);
        
        this.getData(this.props.clientId)
   }
getCurrentDate(){

    fetch(
            "http://localhost:8090/process/getCurrentDate",
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                /*,body: JSON.stringify({"age":"23","amount":"232","time":"212","risk":"Low","income":"232"})*/
            }
        )
            .then(response => {
                if(response.status >=400){
                    // TODO proper error should be passed.
                    throw new Error('error');
                }
                return response.json();
            })
            .then(data => {
               // alert(data.label);
                //alert(document.getElementById("currentDate").innerHTML);
              document.getElementById("currentDate").innerHTML = data.label;
                return data
            })
            .catch(errors => {
              console.log(errors);
                return errors
            })

}
   getData(clientId){
    this.getCurrentDate();
    if(clientId == ''){
      clientId = this.state.clientId
    }
    //alert(this.state.clientId);
    //alert('getData'+clientId)
    fetch(
            "http://localhost:8090/black/getPortfolioCid?userId="+clientId,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                /*,body: JSON.stringify({"age":"23","amount":"232","time":"212","risk":"Low","income":"232"})*/
            }
        )
            .then(response => {
                if(response.status >=400){
                    // TODO proper error should be passed.
                    throw new Error('error');
                }
                return response.json();
            })
            .then(data => {
              console.log(data);
             this.rd(data);
                return data
            })
            .catch(errors => {
              console.log(errors);
                return errors
            })
   }


    

  render() {
     
    return (
      <div>
      
      <div style={{float:'right'}}>
        <b><div id="currentDate" style={{float:'right',textAlign:'center'}}></div></b> <br></br>

        <span  onClick={this.getData.bind(this,this.state.clientId)}><img src="assets/images/icons8-Refresh-26.png" alt=""></img></span>
       

      </div>
     <div id="chart-container"></div>
     
</div>

    );
  }
}

export default Portfolio;
