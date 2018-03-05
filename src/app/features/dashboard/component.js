import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import translations from './translations';

type Props = {
  status: string,
  value: number,
  onStart: () => void,
  onStop: () => void,
  onReset: () => void
};

const styles = { marginLeft: 10 };

export default class Timer extends Component<Props> {
  props: Props;

  render() {
    const {
 onReset, onStart, onStop, status, value 
} = this.props;

    return (
      <Card>
        <CardHeader title="Counterqq" className="title" />
        <Typography>
          <FormattedMessage
            {...translations.timerCount}
            values={{ count: value }}
          />
        </Typography>
        <CardActions>
          <RaisedButton variant="raised" color="primary" onClick={onStart}>
            Start
          </RaisedButton>
          <RaisedButton variant="raised" color="primary" onClick={onStop}>
            Stop
          </RaisedButton>
          <RaisedButton
            variant="raised"
            color="secondary"
            onClick={onReset}
            style={styles}
          >
            Reset
          </RaisedButton>
        </CardActions>
      </Card>
    );
  }
}
