import { connect } from 'react-redux';

import { setSideBarVisibility, logout } from '../shared/actions';
import AppBar from './component';

const enhance = connect(
  (state, ...rest) => ({
    state,
    ...rest
  }),
  {
    toggleSidebar: setSideBarVisibility,
    logout
  }
);

export default enhance(AppBar);
