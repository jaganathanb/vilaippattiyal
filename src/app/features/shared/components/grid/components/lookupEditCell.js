import React, { PureComponent } from 'react';

import { MenuItem } from 'material-ui/Menu';
import { TableCell } from 'material-ui/Table';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';

import { TableEditRow } from '@devexpress/dx-react-grid-material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  inputRoot: {
    width: '100%'
  }
});

type Props = {
  lookupValues: any[],
  rowDetails: any,
  classes: any
};

class LookupEditCell extends PureComponent<Props> {
  props: Props;

  render() {
    const {
      classes, lookupValues, rowDetails, ...rest
    } = this.props;

    return lookupValues ? (
      <TableCell className={classes.lookupEditCell}>
        <Select
          value={rowDetails.value}
          onChange={event => {
            rowDetails.onValueChange(event.target.value);
          }}
          input={<Input classes={{ root: classes.inputRoot }} />}
        >
          {lookupValues.map(item => (
            <MenuItem key={item.key} value={item.key}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    ) : (
      <TableEditRow.Cell {...rowDetails} {...rest} />
    );
  }
}

export default withStyles(styles, { withTheme: true })(LookupEditCell);
