import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone: '',
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onPhoneChange(event) {
    this.setState({ phone: event.target.value })
  }

  handleSubmit(event) {
  event.preventDefault()

    //Review lengths name, phone and email

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    if(this.state.phone.length <6){
      return alert('Please enter a valid phone number');
    }

    if(this.state.email.length <2){
      return alert('Please enter a valid email');
    }

    // Check email and phone format
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Regular expression
    var phoneformat = /^[-+]?[0-9]+$/;  

    if(this.state.email.match(emailformat) && this.state.phone.match(phoneformat))  { 
      this.props.onSignUpFormSubmit(this.state.name, this.state.email, this.state.phone)
    }
    else
    {
      return alert('Please enter valid email or phone number (only numbers)');
    }
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Email" />
          <span className="pure-form-message">This is a required field.</span>
          <br />

         <label htmlFor="phone">Phone number (XXXXXXXXXX)</label>
          <input id="phone" type="text" value={this.state.phone} onChange={this.onPhoneChange.bind(this)} placeholder="Phone" />
          <span className="pure-form-message">This is a required field.</span>
          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
