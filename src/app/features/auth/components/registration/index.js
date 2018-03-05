import { connect } from 'react-redux';
import { selectors } from './reducer';
import { actions } from './actions';

import RegistrationContainer from './container';

const enhance = connect(
  state => ({
    isRegistering: selectors.isRegistering(state),
    registered: selectors.registered(state)
  }),
  {
    registerUser: actions.register
  }
);

export default enhance(RegistrationContainer);
