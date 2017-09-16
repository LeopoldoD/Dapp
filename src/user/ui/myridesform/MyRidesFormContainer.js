import { connect } from 'react-redux'
import MyRidesForm from './MyRidesForm'
//import RidesList from './RidesList'
import {getMyRides} from './MyRidesFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    /*
    driving: state.rides.driving,
    myrides: state.rides.myrides,
    */
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMyRidesSubmit: () => {
      if (event === undefined)
      {
        dispatch(getMyRides())
      }
      
      else{
      event.preventDefault();
      dispatch(getMyRides())
      }
    }
  }
}

const MyRidesFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRidesForm)

export default MyRidesFormContainer
