import { connect } from 'react-redux'
import CreateButton from './CreateButton'
import { createRide } from './CreateButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRideClick: (event) => {
      event.preventDefault();

      dispatch(createRide())
    }
  }
}

const CreateButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateButton)

export default CreateButtonContainer
