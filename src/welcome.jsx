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
        paid: {titles: [], amounts: [], dates: []}}, over: {due: 0, paid: 0, cash: 0}}
        this.onStateChange = this.onStateChange.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    onStateChange(show){
        this.setState({show: show, data: this.state.data, over: this.state.over});
    }
    handleClickSubmit(data){
        let dataClone = {...this.state.data};
        let overClone = {...this.state.over};
        let amt = parseInt(data.amount);
        if(data.checked === undefined || data.checked === false){
            dataClone.pending.titles.push(data.title);
            dataClone.pending.amounts.push(data.amount);
            dataClone.pending.dates.push(data.date);
            overClone.due += amt;
        }
        else{
            dataClone.paid.titles.push(data.title);
            dataClone.paid.amounts.push(data.amount);
            dataClone.paid.dates.push(data.date);
            overClone.paid += amt;
            overClone.cash -= amt;
        }
        this.setState({show: 'page1', column: 'pending', data: dataClone, over: overClone});
    }
    onToggle(column){
        if(column === 'pending' && this.state.column !== 'pending')
            this.setState({show: this.state.show, column: 'pending', data: this.state.data, over: this.state.over})
        else if(column === 'paid' && this.state.column !== 'paid')
            this.setState({show: this.state.show, column: 'paid', data: this.state.data, over: this.state.over})
    }
    onEdit(id){
        this.setState({show: 'edit-'+id, column: this.state.column, data: this.state.data, over: this.state.over});
    }
    afterEdit = (data, id, column) => {
        let dataClone = {...this.state.data};
        let dCD = dataClone['paid'];
        let dCP = dataClone['pending'];
        if(data.checked === undefined || data.checked === false){
            if(column === 'paid'){
                this.state.over.due += parseInt(data.amount);
                this.state.over.paid -= parseInt(data.amount);
                dCD.titles.splice(id, 1);
                dCD.amounts.splice(id, 1);
                dCD.dates.splice(id, 1);
                dCP.titles.push(data.title);
                dCP.amounts.push(data.amount);
                dCP.dates.push(data.date);
            }
            else{
                dCP.titles[id] = data.title;
                dCP.amounts[id] = data.amount;
                dCP.dates[id] = data.date;
            }
        }
        else{
            if(column === 'pending'){
                this.state.over.due -= parseInt(data.amount);
                this.state.over.paid += parseInt(data.amount);
                this.state.over.cash -= parseInt(data.amount);
                dCP.titles.splice(id, 1);
                dCP.amounts.splice(id, 1);
                dCP.dates.splice(id, 1);
                dCD.titles.push(data.title);
                dCD.amounts.push(data.amount);
                dCD.dates.push(data.date);
            }
            else{
                dCD.titles[id] = data.title;
                dCD.amounts[id] = data.amount;
                dCD.dates[id] = data.date;
            }
        }
        this.setState({show: 'page1', column: 'pending', data: {paid: dCD, pending: dCP}, over: this.state.over});
    }
    onAddInc = (amount) => {
        let new_over = {...this.state.over};
        new_over.cash = this.state.over.cash + parseInt(amount);
        this.setState({show: 'page1', column: 'pending', data: this.state.data, over: new_over});
    }
    render(){
        const show = this.state.show;
        const data = this.state.data;
        const column = this.state.column;
        const over = this.state.over;
        console.log(this.state.cash);
        return(
            <div className="container">
                <Navbar onStateChange={this.onStateChange}/>
                <Body show={show} onToggle={this.onToggle} column={column} data={data} 
                onSub={this.handleClickSubmit} onEdit={this.onEdit} afterEdit={this.afterEdit} 
                onAddInc={this.onAddInc} over={over}/>: 
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
                        <Overview over={this.props.over}/>
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
            const id = parseInt(this.props.show.split('-')[1]);
            const exp = this.props.column==='pending';
            const pen = this.props.data.pending;
            const paid = this.props.data.paid;
            let state = {data: 
                {title: exp ? pen.titles[id]:paid.titles[id],
                    amount: exp ? pen.amounts[id]:paid.amounts[id],
                    date: exp ? pen.dates[id]:paid.dates[id],
                    checked: !exp
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
                <a href="#" onClick={this.handleClick1}>Home</a>
                <a href="#" onClick={this.handleClick2}>Create Bill</a>
                <a href="#" onClick={this.handleClick3}>Add Income</a>
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
                    <td class="ov">${this.props.over.due}</td>
                    <td class="spacer"></td>
                    <td class="ov">${this.props.over.paid}</td>
                    <td class="spacer"></td>
                    <td class="ov">${this.props.over.cash}</td>
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
            table_elements.push(
                <tr>
                    <td>{dates[i]}</td>
                    <td>{titles[i]}</td>
                    <td>{amounts[i]}</td>
                    <td>{edit_btn(i)}</td>
                </tr>);
        }
        let ret = titles.length !== 0 ?
            <table className="list">
                <thead>
                    <th>Bill Date</th>
                    <th>Bill Title</th>
                    <th>Bill Amount (in $)</th>
                </thead>
                {table_elements}
            </table>
            :
            <span></span>
        return(
            <div class="bills-list">
                {ret}
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