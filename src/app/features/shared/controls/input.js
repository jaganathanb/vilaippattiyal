import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

type Props = {
  label?: string,
  meta?: { touched: boolean, error?: string },
  input: {}
};

export default class RenderTextField extends Component<Props> {
  props: Props;
  render() {
    const {
      meta: { touched = false, valid, error = '' },
      label = '',
      input,
      ...rest
    } = this.props;
    return (
      <TextField
        helperText={(touched && !valid) ? error : ''}
        placeholder={label}
        label={label}
        error={touched && !valid}
        {...input}
        {...rest}
      />
    );
  }
}
