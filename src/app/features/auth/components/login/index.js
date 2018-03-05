import { connect } from 'react-redux';
import { selectors } from './reducer';
import { actions } from './actions';

import LoginContainer from './container';

const enhance = connect(
  state => ({
    isLoggingIn: selectors.isLoggingIn(state)
  }),
  {
    logUserIn: actions.login
  }
);

export default enhance(LoginContainer);
