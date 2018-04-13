import { connect } from 'react-redux';

import AuthContainer from './container';
import { selectors } from './reducer';

const enhance = connect(
  (state, ...rest) => ({
    theme: selectors.theme(state),
    ...rest
  }),
  {}
);

export default enhance(AuthContainer);
