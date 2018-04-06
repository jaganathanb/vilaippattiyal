import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  input: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 200,
    width: '100%'
  }
});

type Props = {
  label?: string,
  meta?: { touched: boolean, error?: string },
  input: any,
  classes: any
};

class RenderTextField extends Component<Props> {
  static defaultProps = {
    label: 'Label',
    meta: {}
  };
  render() {
    const {
      meta: { touched = false, valid, error = '' },
      label = '',
      input,
      classes,
      ...rest
    } = this.props;
    return (
      <TextField
        className={classes.input}
        helperText={touched && !valid ? error : ''}
        placeholder={label}
        label={label}
        error={touched && !valid}
        {...input}
        {...rest}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(RenderTextField);
