import React, { Component } from 'react'
import ResultsList from './ResultsList'

class BookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: 'option'

    }

    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(option) {
    this.setState({
      selection: option
    })
  }

  handleSubmit(event) {
    event.preventDefault();

      this.props.onBooking(this.state.selection);

  }

  render() {
    return (
   // <h1>Hello</h1>
    <ResultsList/>
      
    )
  }

}

export default BookingForm