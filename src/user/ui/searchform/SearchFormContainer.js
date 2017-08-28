import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import { searchRide } from './SearchFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchFormSubmit: (address,address2) => {
      event.preventDefault();
      console.log('search');
      dispatch(searchRide(address, address2))
    }
  }
}

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default SearchFormContainer
