import { connect } from 'react-redux';

import VPModals from './container';
import { selectors } from './reducer';

import { hideModal } from '../../actions';

export default connect(
  state => ({
    modals: selectors.modals(state),
    alert: selectors.alert(state)
  }),
  {
    closeModal: hideModal
  }
)(VPModals);
