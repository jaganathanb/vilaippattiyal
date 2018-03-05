import { connect } from 'react-redux';
import { selectors as timerSel } from './reducer';
import { actions as timerActions } from './actions';

import TimerPage from './container';

const { timerStart, timerCancel, timerReset } = timerActions;

const enhance = connect(
  state => ({
    value: timerSel.value(state),
    status: timerSel.status(state)
  }),
  {
    onStart: timerStart,
    onStop: timerCancel,
    onReset: timerReset
  }
);

export default enhance(TimerPage);
