import React, { Component } from 'react'
import ResultsList from './ResultsList'
import {results} from '../searchform/SearchFormActions'
import Results from './ResultsList'

class BookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: '',
      searchresults: results,
      seats: '',

    }

  }
  
  handleSelection(option) {
    this.setState({
      selection: option.target.value
    })
  }

  handleSeats(number) {
    this.setState({
      seats: number.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.state.selection == 0 || this.state.selection > this.state.searchresults.length) {

      return alert ('Please enter a valid selection');

    } 

    if (this.state.searchresults[this.state.selection-1].availableseats == 0){
      return alert ('This trip is fully booked, please select a different one');
    }
   
    if (this.state.seats>5 || this.state.seats ==0 || this.state.seats == undefined || this.state.seats > this.state.searchresults[this.state.selection-1].availableseats){
      return alert ('Please enter a valid number of seats');
    }

    var id = this.state.searchresults[this.state.selection-1].id;

      this.props.onBooking(id, this.state.seats);

  }

  render() {
    return (
   <div>
    <ResultsList/> 
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="selection">Select an option to book</label>
          <input id="selection" type="text" value={this.state.selection} onChange={this.handleSelection.bind(this)} placeholder="Enter selection" />
          <span className="pure-form-message">This is a required field.</span>

          <label htmlFor="selection">Select number of seats</label>
          <input id="seats" type="text" value={this.state.seats} onChange={this.handleSeats.bind(this)} placeholder="#Seats" />
          <span className="pure-form-message">This is a required field.</span>

          <button type="submit" className="pure-button pure-button-primary">Book</button>
        </fieldset>
      </form>
     </div> 
      
    )
  }

}

export default BookingForm