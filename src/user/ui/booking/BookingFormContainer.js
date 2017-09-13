import { connect } from 'react-redux'
import BookingForm from './BookingForm'
import { bookRide } from './BookingFormActions'
import ResultsList from './ResultsList'


const mapStateToProps = (state, ownProps) => {
  return {
  	//id: state.allresults[0].from,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBooking: (id, seats) => {
      event.preventDefault();
      dispatch(bookRide(id, seats))
    }
  }
}

const BookingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm)

export default BookingFormContainer
