import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';
import BootstrapTable from 'reactjs-bootstrap-table';
import style from './App.css';


class TaxLossHarvesting extends Component {

  constructor(props) {
      super(props);

      this.getData = this.getData.bind(this);
    }


componentDidMount() {
        this.state = { clientId : this.props.clientId}
        this.getData(this.props.clientId)
   }

   getData(clientId){
    if(clientId == ''){
      clientId = this.state.clientId
    }
var column
    fetch(
            "http://localhost:8090/black/getTLHCid?userId="+clientId,
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
                 alert(data.length);
              alert(data[0].iternalList);
               //this.rd(data);
               for(var i=0;i<data.length;i++){
                var elem = document.createElement("div");
         
                               
                      elem.setAttribute("id","tableID"+i);
                      //elem.setAttribute("style","width: 500px; float:left;margin-left: 50px;margin-right: 50px;margin-bottom: 10px;margin-top: 10px");
                      document.getElementById("outerDiv").appendChild(elem);
                    ReactDOM.render(<BootstrapTable  style={{border: '5px solid #2CC185',color:'#2CC185',backgroundColor: '#FFFFFF'}}  data={data[i].iternalList} headers={true} />, document.getElementById('tableID'+i))
                }
                return data
            })
            .catch(errors => {
              console.log(errors);
                return errors
            })
   }


    

  render() {
      var data = [
   { id: 1, 'firstName': 'a', lastName: 'f', address: 'm'},
   { id: 2, 'firstName': 'b', lastName: 'd', address: 'n'},
   
]
var columns = [
  { name: 'firstName' },
  { name: 'lastName' },
  { name: 'address' }
]
let tableClass = [
      'table',
      'table table-hover',
      'table table-bordered table-hover',
      'table table-bordered table-hover table-condensed',
    ];
    return (
      <div>
      <div style={{float:'right',marginBottom:'5px'}}><button  className="btn btn-default" type="submit" onClick={this.getData}>Refresh</button></div>
     
       <div id="outerDiv">
         
     
            </div> 
</div>

    );
  }
}

export default TaxLossHarvesting;
