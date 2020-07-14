import React from 'react';
import main from './media/main.png';
import './App.css'
import logo from './media/logo.jpg';
import NewBill from './create_bill.jsx';

class Welcome extends React.Component{
    render(){
        // constructor(){
        //     this.
        // }
        return(
            <div className="container">
                <Navbar />
                <Footer />
            </div> 
        );
    }
}

class Body extends React.Component{
    render(){
        if(this.props.show === 'page1')
            return(
                <div className="body">
                    <Landing />
                    <Toggle />
                    <Overview />
                    <List />
                </div>
            );
        else
            return(
                <NewBill />
            );
    }
}

class Navbar extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {'show': 'page1'};
    }
    handleClick(e){
        this.setState({'show': 'page2'});
    }
    render(){
        const show = this.state.show;
        return(
            <div>
                <div class="topnav">
                    <img src={logo} alt="logo" />
                    <span></span>
                    <div id="div-1"><a href="#">+ Add Accounts</a></div>
                    <a href="#" onClick={this.handleClick}>Create Bill</a>
                    <a href="#">Settings</a>
                    <a href="#">Profile</a>
                    <a href="#">Tour</a>
                    <div id="div-2"><a href="#">Log Out</a></div>
                    <div class="empty"></div>
                </div>
                <Body show={show} />
            </div>
        );
    }
}

class Landing extends React.Component{
    render(){
        return(
            <div className="intro">
                <img src={main} alt="Landing image" class="landing" />
                <h1 id="img-head">Effortlessly stay on top of bills</h1>
                <p id="img-foot">Now you can manage bills and money together with Mint.</p>
                <div onclick="location.href='#';" id="sign-up">
                    <span id="sign-up-1"><b>SIGN UP FOR FREE</b></span>
                </div>
            </div>
        );
    }
}

class Toggle extends React.Component{
    render(){
        return(
            <div class="bills">
                <div onclick="location.href='#';" id="bill-1"><span>Bills</span></div>
                <div onclick="location.href='#';" id="bill-2">Payments</div>
            </div>
        );
    }
}

class Overview extends React.Component{
    render(){
        return(
            <table id="overview" class="overview">
                <tr id="tr-1">
                    <td class="ov">JANUARY BILLS DUE</td>
                    <td class="spacer"></td>
                    <td class="ov">CASH AVAILABLE</td>
                    <td class="spacer"></td>
                    <td class="ov">CREDIT AVAILABLE</td>
                </tr>
                <tr id="tr-2">
                    <td class="ov">$2, 254</td>
                    <td class="spacer"></td>
                    <td class="ov">$12, 818</td>
                    <td class="spacer"></td>
                    <td class="ov">$17, 000</td>
                </tr>
            </table>
        );
    }
}

class List extends React.Component{
    render(){
        return(
            <div class="bills-list">
                <span id="bills-list-title">Upcoming Bills</span>
                <div id="due-title">
                    <div id="side"></div>
                    <span id="bills-list-subtitle">Due</span>
                </div>
                <table>
                    <tr class="bottom-border table-2">
                        <td>Jan <br />17</td>
                        <td class="spacer-1"></td>
                        <td class="second-cell">Capital One Credit Card</td>
                        <td class="spacer-2"></td>
                        <td>$1,350</td>
                    </tr>
                    <tr class="bottom-border table-2">
                        <td>Jan <br />20</td>
                        <td class="spacer-1"></td>
                        <td class="second-cell">Pacific Gas & Electric</td>
                        <td class="spacer-2"></td>
                        <td>$87.65</td>
                    </tr>
                    <tr class="table-2">
                        <td>Jan <br />20</td>
                        <td class="spacer-1"></td>
                        <td class="second-cell">Discover Credit Card</td>
                        <td class="spacer-2"></td>
                        <td>$300</td>
                    </tr>
                </table>
            </div>
        );
    }
}

class Footer extends React.Component{
    render(){
        return(
            <div class="footer">
                <img src={logo} alt="logo" />
            <br />
                <i class="fa fa-facebook-square" aria-hidden="true"></i> &nbsp;
                <i class="fa fa-twitter-square" aria-hidden="true"></i> &nbsp;
                <i class="fa fa-instagram" aria-hidden="true"></i> &nbsp;
                <i class="fa fa-rss" aria-hidden="true"></i> &nbsp;
            </div>
        );
    }
}

export default Welcome;