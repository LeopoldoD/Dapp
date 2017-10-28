import React, { Component } from 'react'
//import IPFSUploader from './IPFSUploader.js';


class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value})
  }
  onPhoneChange(event) {
    this.setState({ phone: event.target.value})
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

    console.log('email/phone verification');
    var phonecheck;
    phonecheck = String(this.state.phone);
    console.log(typeof(this.state.phone));
    if(this.state.email.match(emailformat) && phonecheck.match(phoneformat))  { 
      console.log('valid email, valid phone number')
      this.props.onProfileFormSubmit(this.state.name, this.state.email, this.state.phone)
    }
    else{
      return alert('Please enter valid email or phone number (only numbers)')
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

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>


    )
  }
}

export default ProfileForm
