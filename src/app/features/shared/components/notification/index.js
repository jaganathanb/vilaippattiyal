import { connect } from 'react-redux';
import { selectors } from './reducer';

import Notification from './component';

import { actions } from './actions';

const { hideNotification } = actions;

const enhance = connect(
  state => ({
    type: selectors.type(state),
    message: selectors.message(state)
  }),
  {
    hideNotification
  }
);

export default enhance(Notification);
