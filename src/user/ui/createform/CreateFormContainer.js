import { connect } from 'react-redux'
import CreateForm from './CreateForm'
import { createRide } from './CreateFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFormSubmit: (address,address2, seats, startDate, rideTime) => {
      event.preventDefault();
      dispatch(createRide(address, address2, seats, startDate, rideTime))
    }
  }
}

const CreateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)

export default CreateFormContainer
