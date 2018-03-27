import { connect } from 'react-redux';
import { selectors } from '../../reducer';
import actions from '../../actions';

import UserFormContainer from './container';

const enhance = connect(
  state => ({
    isUserSaving: selectors.isUserSaving(state),
    userSaved: selectors.userSaved(state)
  }),
  {
    addUser: actions.addUser
  }
);

export default enhance(UserFormContainer);
