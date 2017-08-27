import React, { Component } from 'react';
import styles from './App.css';
import App from './tabs.js';
import ReactDOM from 'react-dom';

class Login extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password: ''
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.registerClicked = this.registerClicked.bind(this);
    }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }


    handleSubmit() {
          var username = document.getElementById('username').value;
          fetch(
            "http://localhost:8090/black/validateUser?userId="+username,
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
              console.log(data.label);
             ReactDOM.render(<App clientId={username} label={data.label}/>, document.getElementById('root1'));
                return data
            })
            .catch(errors => {
              console.log(errors);
                return errors
            })
          
          //this.props.router.push('/dashboard');
          // this.props.loginClient(this.state);
    
  } 

    registerClicked() {
        this.props.router.push('/register');
    }

    render() {
        return (

          <div data-spy="scroll" data-target=".navbar-collapse">


        <div className="culmn">
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
  <div className="wrapper">
    <div className="form-signin">       
      <h2 className="form-signin-heading">Login</h2>
      <input type="text" className="form-control" name="username" id="username" placeholder="User Name" required="" autoFocus="" />
      <br></br>
      <input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
      
        <br></br><br></br>
      
      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Login</button>   
    </div>
  </div>
  </div>
  </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('root1'));

