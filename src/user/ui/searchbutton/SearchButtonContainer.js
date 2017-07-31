import { connect } from 'react-redux'
import SearchButton from './SearchButton'
import { searchRide } from './SearchButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchRideClick: (event) => {
      event.preventDefault();

      dispatch(searchRide())
    }
  }
}

const SearchButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchButton)

export default SearchButtonContainer
