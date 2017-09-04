import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from './location/react-places-autocomplete/src/PlacesAutocomplete'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      address2: '',
      geocodeResults: null,
      geocodeResults2: null,
      loading: false,
      loading2: false,
      startDate: moment()
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect2 = this.handleSelect2.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    this.handleDate = this.handleDate.bind(this)
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

    handleDate(date) {
    this.setState({
      startDate: date
    })
  }


  handleSubmit(event) {
    event.preventDefault()

    //Review lengths name, phone and email

    if (this.state.address.length < 2)
    {
      return alert('Please enter a valid starting point')
    }

    if(this.state.address2.length <2){
      return alert('Please enter a valid destination');
    }

      this.state.startDate = moment(this.state.startDate).format('MMM-DD-YYYY');  //Format Date
      this.props.onSearchFormSubmit(this.state.address, this.state.address2, this.state.startDate)

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


    return (

      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
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

         <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDate}
            minDate={moment()}
          />

         <button type="submit" className="pure-button pure-button-primary">Search</button>
        </fieldset>
      </form>

    )
  }
}

export default SearchForm

