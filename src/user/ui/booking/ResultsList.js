import React, { Component } from 'react'
import {results} from '../searchform/SearchFormActions'

class ResultsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection : '',
      allresults :results,
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
        
     var test = results;
     // console.log(test);
      console.log(this.state.allresults);
      //var rides = this.props.allresults.map(ride => {
      //return ride={ride};
  //  });

   return (
    <h1>Hello2</h1>
   )   
    
  }

}

export default ResultsList