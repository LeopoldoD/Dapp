import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import { searchRide } from './SearchFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchFormSubmit: (address,address2, startDate) => {
      event.preventDefault();
      dispatch(searchRide(address, address2, startDate))
    }
  }
}

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default SearchFormContainer
