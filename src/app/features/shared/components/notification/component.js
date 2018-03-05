import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  error: { background: theme.palette.error[theme.palette.type] }
});

type Props = {
  hideNotification: () => void,
  type: string,
  intl: intlShape.intl,
  message: {}
};

class Notification extends Component<Props> {
  props: Props;
  handleRequestClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.hideNotification();
  };

  render() {
    const {
      type, intl, message, classes
    } = this.props;

    return (
      <Snackbar
        open={Object.keys(message).length > 0}
        message={Object.keys(message).length > 0 && intl.formatMessage(message)}
        autoHideDuration={6000}
        onClose={this.handleRequestClose}
        SnackbarContentProps={{
          classes: { root: type === 'error' ? classes.error : '' }
        }}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(injectIntl(Notification));
