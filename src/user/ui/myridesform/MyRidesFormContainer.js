import { connect } from 'react-redux'
import MyRidesForm from './MyRidesForm'
import RidesList from './RidesList'
import {getMyRides} from './MyRidesFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    //email: state.user.data.email,
    //phone: state.user.data.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMyRidesSubmit: () => {
      event.preventDefault();
      dispatch(getMyRides())
    }
  }
}

const MyRidesFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RidesList)
//MyRidesForm
export default MyRidesFormContainer
