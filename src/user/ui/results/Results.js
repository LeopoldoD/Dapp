import React, { Component } from 'react'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: ''
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
      <h1>
      'Hello this is a test'
      </h1>

    )
  }
}

export default Results