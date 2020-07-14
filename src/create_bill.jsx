import React from 'react';
import './App.css'

class NewBill extends React.Component{
    render(){
        return(
            <div class="create-bill">
                <div><h1>Create a Bill</h1></div>
                <div class="border-div" id="div-border-1"></div>
                <div class="border-div" id="div-border-2"></div>
                <form action="#" method="post">
                    <input type="text" name="title" id="" placeholder="Title" />
            <br /><br />
                    <input type="number" name="amount" id="" placeholder="Bill Amount" />
            <br /><br />
                    <input placeholder="Bill Date" type="text" onfocus="(this.type='date')" />

            <br /> <br />
                    <input type="checkbox" name="advance" id="" /><label for="advance">Advance</label>
            <br /><br />
                    <input type="button" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewBill;