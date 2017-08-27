import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';

const investAmount = (invest) => {
  console.log('22222222222')
    return 
        fetch(
            "http://localhost:8080/",
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invest)
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
                return data
            })
            .catch(errors => {
                return errors
            })

};
var data1;
class Contact extends Component {
rd(data1){
  fusioncharts.ready(function () {
    var revenueChart = new fusioncharts({
        type: 'doughnut2d',
        renderAt: 'chart-container',
        width: '450',
        height: '450',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Asset Allocation",
                "subCaption": "Current",
                "numberPrefix": "$",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "startingAngle": "310",
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
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0"
            },
            "data":data1.data
        }
    }).render();
});
}

investAmount(invest){
  
   fetch(
            "http://localhost:8090/black/createProfile",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(invest)
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
             data1 = data;
             //this.props.callbackFromParent(data[0].clientId);
                return data
            })
            .catch(errors => {
              console.log(errors);
                return errors
            })
}


  constructor(props) {
        super(props);

        this.state = {
            age: '',
            amount: '',
            time: '',
            risk: '',
            income:''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit () {
      let invest = {
        age:this.state.age,
        amount:this.state.amount,
        time:this.state.time,
        risk:this.state.risk,
        income:this.state.income,
        userId : this.props.clientId
      };
      console.log(invest)
     this.investAmount(invest)
    
     
    }

  render() {

    return (
      <div>

 <p><h2><b>THE BETTER WE KNOW YOU, THE MORE WE CAN DO.</b></h2></p>
  <h3><p>I am &nbsp; &nbsp;
      <b><input type="text"  value={this.state.age}  name="age" id="age"  onChange={this.handleInputChange} placeholder="(age)" required/></b> years old  having </p>
<p>  <label for="income"> annual income </label>  <b><input value={this.state.income} onChange={this.handleInputChange}  type="text" name="income" id="income" minlength="3" placeholder="(income)" required/></b> </p>    

  <p>and want to  <label for="amount"> invest</label> an amount of
    
    <b><input type="text" value={this.state.amount} name="amount" onChange={this.handleInputChange} id="amount" placeholder="(amount)" required/></b> 
  </p>

  <p> for  <label for="your-horizon"> time horizon</label> of
   
  <b><input type="text" value={this.state.time} name="time" onChange={this.handleInputChange} id="time" placeholder="(horizon)" required/></b> years
    </p> 

  <p>
    <select name="risk" value={this.state.risk} onChange={this.handleInputChange} id="risk" placeholder="(risk)" required>
     <option default disabled>Select--</option>
      <option name="ss">Low</option>
      <option>Moderate</option>
      <option>High</option>
    </select> with risk appetite.</p>
  
  </h3>
  <p>
     <button onClick={this.handleSubmit} className="btn btn-default">
      
      Submit
    </button>
  </p>

</div>
    );
  }
}

export default Contact;
