import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

import { withStyles } from 'material-ui/styles';

const styles = () => ({
  checkbox: {
    width: '18px'
  }
});

type Props = {
  input: any,
  classes: any,
  label: string
};

class RenderCheckbox extends Component<Props> {
  render() {
    const { input, classes, label = '' } = this.props;
    return (
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={input.value === 'enabled' || input.value === true}
            onChange={input.onChange}
          />
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(RenderCheckbox);
