import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';
import Home from './home/home.js';
import Login from './login.js';
import Tabs from './tabs.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

charts(fusioncharts)

class App extends Component {
  render() {
    return (

   <Router>         
<div>

            <nav className="navbar navbar-default bootsnav navbar-fixed">
               
                
                <div className="top-search">
                    <div className="container">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-search"></i></span>
                            <input type="text" className="form-control" placeholder="Search"/>
                            <span className="input-group-addon close-search"><i className="fa fa-times"></i></span>
                        </div>
                    </div>
                </div>
                


                <div className="container"> 
                    <div className="attr-nav">
                        <ul>
                            <li className="search"><a href="#"><i className="fa fa-search"></i></a></li>
                        </ul>
                    </div> 

                    
                    <div className="navbar-header">
                        
                       <h2>
                        <img src="assets/images/logo1.png" className="logo" alt=""/>
                          
                        <label className="logo" style={{color:'#00a885', verticalAlign: 'sub'}}>HYBO</label>
                          </h2>
                      

                    </div>
                    
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">{/*<a href="#home">*/}Home</Link></li>                    
                            <li><a href="#features">About</a></li>
                            <li><a href="#business">Service</a></li>
                            <li><a href="#action">Philosophy</a></li>
                            <li><a href="/#test">Invest Now</a></li>
                            <li><Link to="/login">{/*<a href="#test">*/}Login</Link></li>
                            <li></li>
                        </ul>

                    </div>

                </div> 

            </nav>

<Route exact path="/" component={Home}/>
<Route path="/login" component={Login}/>

      </div>
      </Router>
    );
  }
}


export default App;
