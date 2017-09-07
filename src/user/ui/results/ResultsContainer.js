import { connect } from 'react-redux'
import Results from './Results'
import { bookRide } from './ResultsActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBooking: () => {
      event.preventDefault();
      dispatch(bookRide())
    }
  }
}

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)

export default ResultsContainer
