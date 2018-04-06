import React, { Component } from 'react';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  select: {
    marginTop: theme.spacing.unit,
    minWidth: 200,
    width: '100%'
  }
});

type Props = {
  input: any,
  classes: any,
  label: string,
  classes: any,
  children: any,
  meta: { touched: boolean, error: boolean }
};

class RenderSelect extends Component<Props> {
  render() {
    const {
      input,
      label,
      children,
      classes,
      meta: { touched, error, name },
      ...custom
    } = this.props;
    return (
      <FormControl className={classes.select} error={touched && error}>
        <InputLabel htmlFor="role">{label}</InputLabel>
        <Select
          {...custom}
          value={input.value}
          name={name}
          onChange={event => input.onChange(event.target.value)}
          renderValue={value => value}
        >
          {children}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RenderSelect);
