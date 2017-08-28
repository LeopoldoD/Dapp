import { connect } from 'react-redux'
import CreateForm from './CreateForm'
import { createRide } from './CreateFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFormSubmit: (address,address2) => {
      event.preventDefault();
      dispatch(createRide(address, address2))
    }
  }
}

const CreateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)

export default CreateFormContainer
