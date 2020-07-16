import React from 'react';
import main from './media/main.png';
import './App.css'
import logo from './media/logo.jpg';
import NewBill from './create_bill.jsx';
import EditBill from './edit_bill.jsx';
import AddIncome from './add_income.jsx';


class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {show: 'page1', column: 'pending', data: {pending: {titles: [], amounts: [], dates: []}, 
        paid: {titles: [], amounts: [], dates: []}}, cash: 0}
        this.onStateChange = this.onStateChange.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    onStateChange(show){
        this.setState({show: show, data: this.state.data, cash: this.state.cash});
    }
    handleClickSubmit(data){
        let dataClone;
        dataClone = {...this.state.data};
        if(data.checked === undefined){
            dataClone.pending.titles.push(data.title);
            dataClone.pending.amounts.push(data.amount);
            dataClone.pending.dates.push(data.date);
        }
        else{
            dataClone.paid.titles.push(data.title);
            dataClone.paid.amounts.push(data.amount);
            dataClone.paid.dates.push(data.date);
        }
        this.setState({show: 'page1', data: dataClone, cash: this.state.cash});
    }
    onToggle(column){
        alert('hey');
        // if(column === 'pending' && this.state.column !== 'pending')
        //     this.setState({show: this.state.show, column: 'pending', data: this.state.data, cash: this.state.cash})
        // else if(column === 'paid' && this.state.column !== 'paid')
        //     this.setState({show: this.state.show, column: 'paid', data: this.state.data, cash: this.state.cash})
    }
    onEdit(id){
        this.setState({show: 'edit-'+id, column: 'pending', data: this.state.data, cash: this.state.cash});
    }
    afterEdit = (data, id, column) => {
        let dataClone = {...this.state.data};
        dataClone[column].titles[id] = data.title;
        dataClone[column].amounts[id] = data.amount;
        dataClone[column].dates[id] = data.date;
        this.setState({show: 'page1', column: 'pending', data: dataClone, cash: this.state.cash});
    }
    onAddInc = (amount) => {
        let new_cash = this.state.cash + parseInt(amount);
        this.setState({show: 'page1', column: 'pending', data: this.state.data, cash: new_cash});
    }
    render(){
        const show = this.state.show;
        const data = this.state.data;
        const column = this.state.column;
        const cash = this.state.cash;
        console.log(this.state.cash);
        return(
            <div className="container">
                <Navbar onStateChange={this.onStateChange}/>
                <Body show={show} onToggle={this.onToggle} column={column} data={data} 
                onSub={this.handleClickSubmit} onEdit={this.onEdit} afterEdit={this.afterEdit} 
                onAddInc={this.onAddInc} cash={cash}/>: 
                <Footer />
            </div> 
        );
    }
}

class Body extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.show === 'page1')
            return(
                <div className="body">
                    <Landing />
                    <div className="spacer-div">
                        <Overview cash={this.props.cash}/>
                        <Toggle onToggle={this.props.onToggle} />
                        <List column={this.props.column} data={this.props.data} onEdit={this.props.onEdit}/>  
                    </div>
                </div>
            );
        else if(this.props.show == 'page2'){
            return(
                <NewBill onSub={this.props.onSub}/>
            );
        }
        else if(this.props.show[0] == 'e'){
            const id = this.props.show.split('-')[1];
            const exp = this.props.column==='pending';
            const pen = this.props.data.pending;
            const paid = this.props.data.paid;
            let state = {data: 
                {title: exp ? pen.titles[id]:paid.titles[id],
                    amount: exp ? pen.amounts[id]:paid.amounts[id],
                    date: exp ? pen.dates[id]:paid.dates[id],
                    checked: exp ? pen.checks[id]:paid.checks[id]
                }
            }
            console.log(state);
            return(
                <EditBill id={id} column={this.props.column} state={state} afterEdit={this.props.afterEdit}/>
            );
        }
        else if(this.props.show === 'addinc'){
            return(
                <AddIncome onAddInc={this.props.onAddInc} />
            );
        }
    }
}

class Navbar extends React.Component{
    handleClick1 = () => {
        this.props.onStateChange('page1');
    }
    handleClick2 = () => {
        this.props.onStateChange('page2');
    }
    handleClick3 = () => {
        this.props.onStateChange('addinc')
    }
    render(){
        return(
            <div class="topnav">
                <img src={logo} alt="logo" onClick={this.handleClick1} />
                <span></span>
                <div id="div-1"><a href="#">+ Add Accounts</a></div>
                <a href="#" onClick={this.handleClick2}>Create Bill</a>
                <a href="#" onClick={this.handleClick3}>Add Income</a>
                <div id="div-2"><a href="#">Log Out</a></div>
                <div class="empty"></div>
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
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }
    handleClick(){
        this.props.onToggle('pending');
    }
    handleClick2(){
        this.props.onToggle('paid');
    }
    render(){
        return(
            <div class="bills">
                <div onClick={this.handleClick} id="bill-1"><span>Pending</span></div>
                <div onClick={this.handleClick2} id="bill-2">Paid</div>
            </div>
        );
    }
}

class Overview extends React.Component{
    render(){
        return(
            <table id="overview" class="overview">
                <tr id="tr-1">
                    <td class="ov">BILLS DUE</td>
                    <td class="spacer"></td>
                    <td class="ov">AMOUNT PAID</td>
                    <td class="spacer"></td>
                    <td class="ov">CASH AVAILABLE</td>
                </tr>
                <tr id="tr-2">
                    <td class="ov">$2, 254</td>
                    <td class="spacer"></td>
                    <td class="ov">$12, 818</td>
                    <td class="spacer"></td>
                    <td class="ov">${this.props.cash}</td>
                </tr>
            </table>
        );
    }
}

class List extends React.Component{
    constructor(props){
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit(e){
        this.props.onEdit(e.target.id);
    }
    render(){
        const data = this.props.data;
        let edit_btn = (id) => {
            return <button className="edit-bill" id={id} onClick={this.handleEdit}>Edit</button>
        }
        let table_elements = [];
        let titles;
        let amounts;
        let dates;
        if(this.props.column === 'pending'){
            titles = data.pending.titles;
            amounts = data.pending.amounts;
            dates = data.pending.dates;
        }
        else{
            titles = data.paid.titles;
            amounts = data.paid.amounts;
            dates = data.paid.dates;
        }
        for( let i=0;i<titles.length;i++){
            table_elements.push(<tr><td>{dates[i]}</td><td>{titles[i]}</td><td>{amounts[i]}</td><td>{edit_btn(i)}</td></tr>);
        }
        return(
            <div class="bills-list">
                <span id="bills-list-title">Upcoming Bills</span>
                <div id="due-title">
                    <div id="side"></div>
                    <span id="bills-list-subtitle">Due</span>
                </div>
                <table>{table_elements}</table>
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