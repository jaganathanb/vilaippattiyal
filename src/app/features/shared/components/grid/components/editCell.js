import React, { PureComponent } from 'react';

import { MenuItem } from 'material-ui/Menu';
import { TableCell } from 'material-ui/Table';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';

import { TableEditRow, TableEditColumnProps } from '@devexpress/dx-react-grid-material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  inputRoot: {
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type Props = {
  value: any,
  column: TableEditColumnProps,
  onValueChange: () => void,
  classes: any
};

class LookupEditCell extends PureComponent<Props> {
  props: Props;

  render() {
    const {
      classes, value, onValueChange, column, ...rest
    } = this.props;

    const Cell = (
      <TableEditRow.Cell value={value} onValueChange={onValueChange} column={column} {...rest} />
    );

    switch (column.type) {
      case 'multiselect':
        return column.lookups ? (
          <TableCell className={classes.lookupEditCell}>
            <Select
              multiple
              value={value}
              renderValue={selected => selected.join(', ')}
              onChange={event => {
                onValueChange(event.target.value);
              }}
              input={<Input classes={{ root: classes.inputRoot }} />}
              MenuProps={MenuProps}
            >
              {column.lookups.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  <Checkbox checked={value.indexOf(item.value) > -1} color="primary" />
                  <ListItemText primary={item.value} />
                </MenuItem>
              ))}
            </Select>
          </TableCell>
        ) : (
          Cell
        );
      case 'choice':
        return column.lookups ? (
          <TableCell className={classes.lookupEditCell}>
            <Checkbox
              checked={value}
              onChange={event => onValueChange(event.target.checked)}
              color="primary"
            />
          </TableCell>
        ) : (
          Cell
        );
      default:
        return Cell;
    }
  }
}

export default withStyles(styles, { withTheme: true })(LookupEditCell);
