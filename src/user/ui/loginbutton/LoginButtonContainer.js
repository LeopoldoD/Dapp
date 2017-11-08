import { connect } from 'react-redux'
import LoginButton from './LoginButton'
import { verifyIdentity } from './LoginButtonActionsv2'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: (event) => {
    event.preventDefault();

      dispatch(verifyIdentity())
    }
  }
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default LoginButtonContainer
