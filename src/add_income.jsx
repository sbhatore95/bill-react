import React from 'react';
import './App.css'

class AddIncome extends React.Component{
    constructor(props){
        super(props);
        this.state = {amount: null};
    }
    handleChange = (e) => {
        this.setState({amount: e.target.value});
    }
    handleSubmit = (e) => {
        this.props.onAddInc(this.state.amount);
        e.preventDefault();
    }
    render(){
        return(
            <div className="addInc">
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="amount" id="" placeholder="Income Amount" value={this.state.amount} onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AddIncome;