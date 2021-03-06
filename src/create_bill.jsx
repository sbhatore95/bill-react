import React from 'react';
import './App.css'
import BillForm from './bill_form.jsx';

class NewBill extends BillForm{
    constructor(){
        super({state: {data: {title: '', amount: ''}}});
    }
    handleSubmit = (e) => {
        console.log(this.state.data);
        this.props.onSub(this.state.data);
        e.preventDefault();
    }
    render(){
        return(
            <div class="create-bill">
                <div><h1>Create a Bill</h1></div>
                <div class="border-div" id="div-border-1"></div>
                <div class="border-div" id="div-border-2"></div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" id="" value={this.state.data.title} placeholder="Title" onChange={this.handleChange1}/>
             <br /><br />
                    <input type="number" name="amount" id="" placeholder="Bill Amount" value={this.state.data.amount} onChange={this.handleChange2}/>
            
            <br /><br />
                    <input placeholder="Bill Date" type="text" onfocus="(this.type='date')" value={this.state.data.date} onChange={this.handleChange3}/>
            
            <br /> <br />
                    <input type="checkbox" name="advance" id="" onChange={this.handleChange4} checked={this.state.data.checked}/><label>Paid</label>
           
            <br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewBill;