import React from 'react';
import './App.css'

class BillForm extends React.Component{
    constructor(props){
        super(props);
        this.state = props.state;
    }
    handleChange1 = (e) => {
        this.setState({data: {title: e.target.value, amount: this.state.amount, date: this.state.data.date,
            checked: this.state.data.checked}});
    }
    handleChange2 = (e) => {
        this.setState({data: {title: this.state.data.title, amount: e.target.value, date: this.state.data.date,
            checked: this.state.data.checked}});
    }
    handleChange3 = (e) => {
        this.setState({data: {title: this.state.data.title, amount: this.state.data.amount, date: e.target.value,
            checked: this.state.data.checked}});
    }
    handleChange4 = (e) => {
        this.setState({data: {title: this.state.data.title, amount: this.state.data.amount, date: this.state.data.date, 
            checked: e.target.checked}});
    }
    render(){
        let ret_data = this.props.data;
        return(
            <div class="create-bill">
                <div><h1>Edit Bill</h1></div>
                <div class="border-div" id="div-border-1"></div>
                <div class="border-div" id="div-border-2"></div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" id="" value={this.state.data.title} placeholder="Title" onChange={this.handleChange1}/>
             <br /><br />
                    <input type="number" name="amount" id="" placeholder="Bill Amount" value={this.state.data.amount} onChange={this.handleChange2}/>
            
            <br /><br />
                    <input placeholder="Bill Date" type="text" onfocus="(this.type='date')" value={this.state.data.date} onChange={this.handleChange3}/>
            {/*
            <br /> <br />
                    <input type="checkbox" name="advance" id="" /><label for="advance" onChange={this.handleChange(this, 'paid')}>Paid</label>
            */}
            <br /><br /> 
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default BillForm;