import { connect } from 'react-redux'
import BookingForm from './BookingForm'
import { bookRide } from './BookingFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBooking: (option) => {
      event.preventDefault();
      dispatch(bookRide(option))
    }
  }
}

const BookingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm)

export default BookingFormContainer
