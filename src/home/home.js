 import React, { Component } from 'react';
import Contact from '../contact/Contact.js';

class Home extends Component {
  render() {
    return (
      <div data-spy="scroll" data-target=".navbar-collapse">


        <div className="culmn">
            


           

            

            <section id="home" className="home bg-black fix">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="main_home text-center">
                            <div className="col-md-12">
                                <div className="hello_slid">
                                    <div className="slid_item">
                                        <div className="home_text ">
                                            <h2 className="text-white">Welcome to <strong>HYBO</strong></h2>
                                            <h1 className="text-white">We Do Business All Of Time</h1>
                                            <h3 className="text-white">- We Create <strong>Asset Allocation</strong> for you -</h3>
                                        </div>

                                        <div className="home_btns m-top-40">
                                            <a href="" className="btn btn-primary m-top-20">Invest Now</a>
                                            <a href="" className="btn btn-default m-top-20">Portfolio</a>
                                        </div>
                                    </div>
                                    <div className="slid_item">
                                        <div className="home_text ">
                                            <h2 className="text-white">Welcome to <strong>HYBO</strong></h2>
                                            <h1 className="text-white">We Do Business All Of Time</h1>
                                            <h3 className="text-white">- We do <strong>Portfolio Rebalancing</strong> -</h3>
                                        </div>

                                        <div className="home_btns m-top-40">
                                            <a href="" className="btn btn-primary m-top-20">Invest Now</a>
                                            <a href="" className="btn btn-default m-top-20">Portfolio</a>
                                        </div>
                                    </div>
                                    <div className="slid_item">
                                        <div className="home_text ">
                                            <h2 className="text-white">Welcome to <strong>HYBO</strong></h2>
                                            <h1 className="text-white">We Do Business All Of Time</h1>
                                            <h3 className="text-white">- We do <strong>Tax Loss Harvesting</strong> for you -</h3>
                                        </div>

                                        <div className="home_btns m-top-40">
                                            <a href="" className="btn btn-primary m-top-20">Invest Now</a>
                                            <a href="" className="btn btn-default m-top-20">Portfolio</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </section> 



            
            <section id="features" className="features">
                <div className="container">
                    <div className="row">
                        <div className="main_features fix roomy-70">
                            <div className="col-md-4">
                                <div className="features_item sm-m-top-30">
                                    <div className="f_item_icon">
                                        <i className="fa fa-thumbs-o-up"></i>
                                    </div>
                                    <div className="f_item_text">
                                        <h3>Best Advice</h3>
                                        <p>Sophisticated and well proven algorithms</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="features_item sm-m-top-30">
                                    <div className="f_item_icon">
                                        <i className="fa fa-tablet"></i>
                                    </div>
                                    <div className="f_item_text">
                                        <h3>Save Time</h3>
                                        <p>We Do All The Hard Work For You To Save Your Precious Time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="features_item sm-m-top-30">
                                    <div className="f_item_icon">
                                        <i className="fa fa-sliders"></i>
                                    </div>
                                    <div className="f_item_text">
                                        <h3>Save Money</h3>
                                        <p>We Don’t Charge Any Fees And Recommend Low Cost Products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            
            <section id="business" className="business bg-grey roomy-70">
                <div className="container">
                    <div className="row">
                        <div className="main_business">
                            <div className="col-md-6">
                                <div className="business_slid">
                                    <div className="slid_shap bg-grey"></div>
                                    <div className="business_items text-center">
                                        <div className="business_item">
                                            <div className="business_img">
                                                <img src="assets/images/confused.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="business_item">
                                            <div className="business_img">
                                                <img src="assets/images/details.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="business_item">
                                            <div className="business_img">
                                                <img src="assets/images/allocation.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="business_item">
                                            <div className="business_img">
                                                <img src="assets/images/relax_frame.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="business_item sm-m-top-50">
                                    <h2 className="text-uppercase">How <strong>HYBO</strong> Works :</h2>
                                    <ul>
                                       
                                        <li><i className="fa fa-arrow-circle-right"></i> Confused&nbsp;&nbsp;</li>
                                        <li><i className="fa fa-arrow-circle-right"></i> Get-Advice</li>
                                        <li><i className="fa fa-arrow-circle-right"></i> Invest&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                        <li><i className="fa fa-arrow-circle-right"></i> Relax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                    </ul>
                                   

                                    <div className="business_btn">
                                        <a href="" className="btn btn-default m-top-20">PHILOSOPHY</a>
                                        <a href="" className="btn btn-primary m-top-20">Invest Now</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="test" className="test bg-grey roomy-60 fix">
                <div className="container">
                    <div className="row">                        
                         <Contact/>
                    </div>
                </div>
            </section>

<div id="chart-container"></div>


            
            <section id="action" className="action bg-primary roomy-40">
                <div className="container">
                    <div className="row">
                        <div className="maine_action">
                            <div className="col-md-8">
                                <div className="action_item text-center">
                                    <h2 className="text-white text-uppercase">OUR PHILOSOPHY</h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="action_btn text-left sm-text-center">
                                    <a href="" className="btn btn-default">Invest Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <footer  className="footer action-lage bg-black p-top-80">
                
                 <img src="assets/images/philosophy.png" alt="" />

 
               
            </footer>




        </div>

    </div>
    );
  }
}
 
export default Home;
