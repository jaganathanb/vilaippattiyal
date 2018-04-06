import React, { PureComponent } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';

import { isEqual } from 'lodash';

type Props = {
  open?: boolean,
  title?: string,
  data?: any,
  contentText?: string,
  onPositive?: () => void,
  onNegative?: () => void,
  negativeText?: string,
  positiveText?: string,
  classes: any,
  Content: any
};

const styles = theme => ({
  dialog: {
    width: 'calc(100% - 16px)'
  }
});

class VPDialog extends PureComponent<Props> {
  static defaultProps = {
    open: false,
    data: {},
    onNegative: () => {},
    onPositive: () => {},
    title: '',
    contentText: '',
    positiveText: 'Ok',
    negativeText: 'Cancel'
  };

  state = {
    data: null
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.state.data = nextProps.data;
    }
  }
  render() {
    const {
      open,
      onPositive,
      onNegative,
      title,
      classes,
      contentText,
      negativeText,
      positiveText,
      Content
    } = this.props;

    const { data } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onNegative}
        classes={{ paper: classes.dialog }}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <Paper>
            <Content />
          </Paper>
        </DialogContent>

        <DialogActions>
          <Button onClick={onNegative} color="primary">
            {negativeText}
          </Button>
          <Button onClick={() => onPositive(data)} color="secondary">
            {positiveText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VPDialog);
