import { connect } from 'react-redux'
import MyRidesForm from './MyRidesForm'
import { cancelRide } from './MyRidesFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    selection: state.user.selection,
    //email: state.user.data.email,
    //phone: state.user.data.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelRideSubmit: (selection) => {
      event.preventDefault();
      dispatch(cancelRide(selection))
    }
  }
}

const MyRidesFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRidesForm)

export default MyRidesFormContainer
