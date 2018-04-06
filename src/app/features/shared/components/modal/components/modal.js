import React, { PureComponent } from 'react';

import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  dialog: {
    width: 'calc(100% - 16px)'
  }
});

type Props = {
  item: any,
  onClose: () => void,
  alert: any,
  classes: any
};

class VPModal extends PureComponent<Props> {
  onClose(data) {
    if (this.props.item.onClose) {
      this.props.item.onClose(data);
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }
  onConfirm() {
    if (this.props.item.onConfirm) {
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }
  render() {
    const { type, title } = this.props.item;

    if (type === 'confirmation') {
      const { text } = this.props.item;
      return (
        <Dialog
          open
          disableBackdropClick
          disableEscapeKeyDown
          onClose={data => this.onClose(data)}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={data => this.onClose(data)} color="primary">
              {'Cancel'}
            </Button>
            <Button onClick={data => this.onClose(data)} color="secondary">
              {'OK'}
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else if (type === 'custom') {
      const { getContent } = this.props.item;
      return (
        <Dialog
          open
          disableBackdropClick
          onClose={data => this.onClose(data)}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{title}</DialogTitle>
          <DialogContent>
            {this.props.alert.text ? (
              <DialogContentText>{this.props.alert.text}</DialogContentText>
            ) : null}
            {getContent(data => this.onClose(data))}
          </DialogContent>
        </Dialog>
      );
    }
    return <div />;
  }
}

export default withStyles(styles, { withTheme: true })(VPModal);
