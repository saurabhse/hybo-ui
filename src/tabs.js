import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Contact from './contact/Contact.js';
import Portfolio from './portfolio.js';
import Rebalance from './rebalance.js';
import TaxLossHarvesting from './tlh.js';
import style1 from './demo.css';
import style2 from './tabs.css';
import style3 from './tabstyles.css';




var Tabs = React.createClass({
	displayName: 'Tabs',
	propTypes: {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps: function () {
  	return {
    	selected: 0
    };
  },
  getInitialState: function () {
    return {
    	selected: this.props.selected
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
  	return this.props !== nextProps || this.state !== nextState;
  },
  handleClick: function (index, event) {
  	event.preventDefault();
  	var elems = document.getElementById("main-div").getElementsByTagName("li");
  	[].forEach.call(elems, function(el) {

    el.classList.remove("tab-current");
	});
  	
  	var d = document.getElementById(index)
  	d.className = 'tab-current';
    this.setState({
    	selected: index
    });
  },
  _renderTitles: function () {
  	function labels(child, index) {
    	var activeClass = (this.state.selected === index ? 'tab-current' : '');
    	return (
      	<li id={index} key={index} className={activeClass}>
        	<a href="#" 
          	className="icon icon-home"
          	onClick={this.handleClick.bind(this, index)}><span>
          	{child.props.label}</span>
          </a>
        </li>
      );
    }
  	return (
  		
  		<section>
				<div id="main-div" className="tabs tabs-style-bar">
					<nav>
    	<ul >
      	{this.props.children.map(labels.bind(this))}

        <li  ><a href="#" style={{backgroundColor:'#2CC185',width:'130px',float:'right'}}><b><span id="currentDate" style={{color:'#FFFFFF',fontWeight:'bold',fontFamily:'cursive'}}></span></b></a> </li>
      </ul>

      </nav>

      </div>

      </section>
      
    );
  },
  _renderContent: function () {
  	return (
    	<div className="tabs__content">
	    	{this.props.children[this.state.selected]}

      </div>
    );
  },
	render: function () {
  	return (
    	<div class="container">
        {this._renderTitles()}
      	{this._renderContent()}
      </div>
    );
  }
});

var Pane = React.createClass({
	displayName: 'Pane',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
	render: function () {
  	return (
    	<div>
      	{this.props.children}
      </div>
    );
  }
});

var App = React.createClass({
	myCallback(dataFromChild){
		
        
        this.setState({
          clientId: dataFromChild
        })
        alert('fff' + this.state.clientId);
    },
    getInitialState () {
    return {
      
          clientId: ''
        
    };
  	},
	render: function () {
  	return (
    	<div>
    	<br></br><br></br><br></br><br></br><br></br>

        <Tabs selected={this.props.label}>

          <Pane label="Personal Details">
          	<div id="chart-container">
            	<Contact clientId={this.props.clientId}/>
            </div>
          </Pane>
          <Pane label="Portfolio">
            <Portfolio clientId={this.props.clientId}/>
          </Pane>
          <Pane label="Portfolio Rebalancing">
            <Rebalance clientId={this.props.clientId}/>
          </Pane>
          <Pane label="Tax Loss Harvesting">
            <TaxLossHarvesting clientId={this.props.clientId}/>
          </Pane>
          <Pane label="Ask Hybo">
            <div>
		        <h1>Lex test</h1>
		        
		      </div>

          </Pane>

        </Tabs>
      </div>
    );
  }
});
 
export default App;