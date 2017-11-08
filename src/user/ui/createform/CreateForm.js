import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

class CreateRide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      address2: '',
      geocodeResults: null,
      geocodeResults2: null,
      geocodeResults3: null,
      loading: false,
      loading2: false,
      loading3: false,
      seats: this.props.seats,
      cost: this.props.cost,
      startDate: moment(),
      rideTime: this.props.rideTime,
      meetingpoint: ''
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect2 = this.handleSelect2.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSelect3 = this.handleSelect3.bind(this)
    this.handleChange3 = this.handleChange3.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })

  }

  handleSelect2(address2) {
    this.setState({
      address2,
      loading2: true
    })

    geocodeByAddress(address2)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading2: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults2: this.renderGeocodeFailure(error),
          loading2: false
        })
      })
  }

  handleSelect3(meetingpoint) {
    this.setState({
      meetingpoint,
      loading3: true
    })

    geocodeByAddress(meetingpoint)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading3: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults3: this.renderGeocodeFailure(error),
          loading3: false
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

  handleChange2(address2) {
    this.setState({
      address2,
      geocodeResults2: null
    })
  }

  handleChange3(meetingpoint) {
    this.setState({
      meetingpoint,
      geocodeResults3: null
    })
  }

  handleSeats(event) {
    console.log('handleseats');
    this.setState({
      seats: event.target.value
    })
  }

  handleCost(event) {
    console.log('handlecost');
    this.setState({
      cost: event.target.value
    })
  }

  handleDate(date) {
    this.setState({
      startDate: date
    })
  }

  handleTime(time) {
    console.log('handle time');
    this.setState({
      rideTime: time
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    //Review create parameters

    if (this.state.address.length < 3)
    {
      return alert('Please enter a valid starting point')
    }

    if(this.state.address2.length <3){
      return alert('Please enter a valid destination');
    }

    if(this.state.meetingpoint.length <3){
      return alert('Please enter a valid meetingpoint');
    }

    if(this.state.seats == null || this.state.seats === 0 || this.state.seats>5){
      return alert('Invalid number of seats');
    }

    if(this.state.rideTime === null || typeof (this.state.rideTime) === "undefined"){
      return alert('Invalid time');
    }
    console.log(this.state.startDate);
    if(this.state.rideTime === null || typeof (this.state.rideTime) === "undefined"){
      return alert('Invalid date');
    }

    if(this.state.cost == null || this.state.cost === 0 || this.state.cost <3){
      return alert('Invalid cost, minimum cost is 3 Finney');
    }

    // Change date to human readable format MMM-DD-YYY i.e. SEP-30-2017 
    //var tempdate = moment(this.state.startDate).format('MMM-DD-YYYY'); 
   // this.state.startDate = tempdate;
   // var tempridetime = moment(this.state.rideTime).format('HH:mm');
    //this.state.rideTime = tempridetime;

      this.props.onCreateFormSubmit(this.state.address, this.state.address2, this.state.seats, moment(this.state.startDate).format('MMM-DD-YYYY'), moment(this.state.rideTime).format('HH:mm'), this.state.cost, this.state.meetingpoint)

  }


  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)
  

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "From",
      name: 'Demo__input',
      id: "my-input-id",
    }

    const inputProps2 = {
      type: "text",
      value: this.state.address2,
      onChange: this.handleChange2,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "To",
      name: 'Demo__input2',
      id: "my-input-id2",
    }

    const inputProps3 = {
      type: "text",
      value: this.state.meetingpoint,
      onChange: this.handleChange3,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Meeting Point",
      name: 'Demo__input3',
      id: "my-input-id3",
    }

    return (

      <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
      <fieldset>
          
         <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
          />
          {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}

           <PlacesAutocomplete
            onSelect={this.handleSelect2}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect2}
            classNames={cssClasses}
            inputProps={inputProps2}
          />
          {this.state.loading2 ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading2 && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults2}</div> :
          null}

          <PlacesAutocomplete
            onSelect={this.handleSelect3}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect3}
            classNames={cssClasses}
            inputProps={inputProps3}
          />
          {this.state.loading3 ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading3 && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults3}</div> :
          null}

          <label htmlFor="seats">Number of Seats (1-5)</label>
          <input id="seats" type="text" value={this.state.seats} onChange={this.handleSeats.bind(this)} placeholder="#Seats"/>
          <br />

          <label htmlFor="cost">Desired gas retribution (Finney, 1 ETH = 1000 Finney)</label>
          <input id="cost" type="text" value={this.state.cost} onChange={this.handleCost.bind(this)} placeholder="Cost"/>
          <br />

        <label htmlFor="date">Select a Date </label>
         <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDate}
            minDate={moment()}
          />

          <TimePicker
            showSecond={false}
            style={{ width: 100 }}
            className="xxx"
            placeholder="Enter time"
            value={this.state.rideTime}
            onChange={this.handleTime}
          />
         <button type="submit" className="pure-button pure-button-primary">Create</button>
        </fieldset> 
      </form>

    )
  }
}

export default CreateRide