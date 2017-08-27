import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'reactjs-bootstrap-table';
import st from './App.css';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';

var data2;
class Rebalance extends Component {

  constructor(props) {
      super(props);
      this.state = {data1 : ''}
      this.getData = this.getData.bind(this);
    }


componentDidMount() {
	 this.state = { clientId : this.props.clientId}
        this.getData(this.props.clientId)
   }

   rd(data1){
   	console.log(data1.length);
   	fusioncharts.ready(function () {
   	for(var i=0;i<data1.length;i++){
   		var elem = document.createElement("div");
		 
		                       
		  elem.setAttribute("id","chart-container"+i);
		  elem.setAttribute("style","width: 500px; float:left;margin-left: 50px;margin-right: 50px;margin-bottom: 10px;margin-top: 10px");
		  document.getElementById("outerDiv").appendChild(elem);
		 
		  
   var category= data1[i].data;
    var data =data1[i].value;
                    var price = data1[i].price;
                   var allo = data1[i].allocation;
                   //alert(data1[0].allocation);
                   //alert(data1);
  
  	console.log('i --> '+i);
  	var l = 'chart-container'+i;
    var revenueChart = new fusioncharts({
        type: 'mscombidy2d',
        renderAt: 'chart-container'+i,
        width: '550',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "ETF Timeline",
                "subCaption": data1[i].name,
                "xAxisname": "Year",
                "pYAxisName": "Value (In USD)",
                "sYAxisName": "Allocation %",
                "numberPrefix": "$",
                "sNumberSuffix" : "%",
                "sYAxisMaxValue" : "100",

                //Cosmetics
                "paletteColors" : "#0075c2,#1aaf5d,#f2c500",
                "baseFontColor" : "#333333",
                "baseFont" : "Helvetica Neue,Arial",
                "captionFontSize" : "14",
                "subcaptionFontSize" : "14",
                "subcaptionFontBold" : "0",
                "showBorder" : "0",
                "bgColor" : "#ffffff",
                "showShadow" : "0",
                "canvasBgColor" : "#ffffff",
                "canvasBorderAlpha" : "0",
                "divlineAlpha" : "100",
                "divlineColor" : "#999999",
                "divlineThickness" : "1",
                "divLineIsDashed" : "1",
                "divLineDashLen" : "1",
                "divLineGapLen" : "1",
                "usePlotGradientColor" : "0",
                "showplotborder" : "0",
                "showXAxisLine" : "1",
                "xAxisLineThickness" : "1",
                "xAxisLineColor" : "#999999",
                "showAlternateHGridColor" : "0",
                "showAlternateVGridColor" : "0",
                "legendBgAlpha" : "0",
                "legendBorderAlpha" : "0",
                "legendShadow" : "0",
                "legendItemFontSize" : "10",
                "legendItemFontColor" : "#666666"
            },
            "categories": [{
                category
            	}],
            "dataset": [
                {
                    "seriesName": "Value",
                    data
                }, 
                {
                    "seriesName": "Allocation",
                    "renderAs": "line",
                    "showValues": "0",
                    "data" : price
                }, 
                {
                    "seriesName": "Allocation %",
                    "parentYAxis": "S",
                    "renderAs": "line",
                    "showValues": "0",
                    "data": allo
                }
            ]
        }
    });
    
    revenueChart.render();
 }
   	});
 
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
                alert(data.label);
                alert(document.getElementById("currentDate").innerHTML);
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
    	//alert('eee');
    	var data1 = [{"ETF":"SHV","Price":"110.23","Value":"3.2323232E7","Percentage":"32.36625114749942","Price On 2015-01":"110.23","Value On 2015-01":"0.0","Percentage On 2015-01":"0.0","Update Value On 2015-01":"1.046170884E7","Updated On 2015-01":"32.36625114749942"},{"ETF":"VBR","Price":"96.31","Value":"3.2323232E7","Percentage":"5.503035804708036","Price On 2015-01":"105.41","Value On 2015-01":"1946817.29","Percentage On 2015-01":"7.95144757388567","Update Value On 2015-01":"1805251.66","Updated On 2015-01":"8.165058163673327"},{"ETF":"VTV","Price":"75.69","Value":"3.2323232E7","Percentage":"5.103348210786869","Price On 2015-01":"84.51","Value On 2015-01":"1841726.4300000002","Percentage On 2015-01":"7.522221642887","Update Value On 2015-01":"1674143.1","Updated On 2015-01":"7.572061053145561"},{"ETF":"VTI","Price":"95.08","Value":"3.2323232E7","Percentage":"18.956997139685182","Price On 2015-01":"105.92","Value On 2015-01":"6826014.4","Percentage On 2015-01":"27.87970700639742","Update Value On 2015-01":"6218986.88","Updated On 2015-01":"28.12815006320023"},{"ETF":"VOE","Price":"78.85","Value":"3.2323232E7","Percentage":"37.83183775056719","Price On 2015-01":"89.43","Value On 2015-01":"1.386925155E7","Percentage On 2015-01":"56.646623776829905","Update Value On 2015-01":"1.24110954E7","Updated On 2015-01":"56.13473071998089"},{"ETF":"LQD","Price":"114.41","Value":"3.2323232E7","Percentage":"0.23852994675330075","Price On 2015-01":"114.41","Value On 2015-01":"0.0","Percentage On 2015-01":"0.0","Update Value On 2015-01":"76997.93","Updated On 2015-01":"0.23852994675330075"},]
    if(clientId == ''){
      clientId = this.state.clientId
    }
    //alert(this.state.clientId);
   // alert('getData'+clientId)
    fetch(
            "http://localhost:8090/black/getRebalanceCid?userId="+clientId,
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
            	console.log('2222')
                if(response.status >=400){
                    // TODO proper error should be passed.
                    throw new Error('error');
                }
                return response.json();
            })
            .then(data => {
            	//alert('sdsdsdsd');
              //console.log(data);
              //data2 = data;
              this.rd(data);
             	
                return data
            })
            .catch(errors => {
            	console.log('33333')
              console.log(errors);
                return errors
            })
   }


    

  render() {
      
var divStyle = {
  
};

    return (
      <div>
      
      <div style={{float:'right'}}>
       

        <span  onClick={this.getData.bind(this,this.state.clientId)}><img src="assets/images/icons8-Refresh-26.png" alt=""></img></span>
        

      </div>
      <br></br>
      <div id="outerDiv">
      {/*<style>{"td, th{border:2px solid #2CC185;}"}</style>*/}

      
          
     
  
</div>
</div>
    );
  }
}

export default Rebalance;
