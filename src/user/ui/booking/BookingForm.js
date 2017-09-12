import React, { Component } from 'react'
import ResultsList from './ResultsList'

class BookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: '',

    }

  }
  
  handleChange(option) {
    this.setState({
      selection: option.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.state.selection == 0) {

      return alert ('Please enter a valid option');

    } 

      this.props.onBooking(this.state.selection);

  }

  render() {
    return (
   <div>
    <ResultsList/>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="selection">Select an option to book</label>
          <input id="selection" type="text" value={this.state.selection} onChange={this.handleChange.bind(this)} placeholder="Enter selection" />
          <span className="pure-form-message">This is a required field.</span>

          <button type="submit" className="pure-button pure-button-primary">Book</button>
        </fieldset>
      </form>
     </div> 
      
    )
  }

}

export default BookingForm