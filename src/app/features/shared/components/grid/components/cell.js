import React, { PureComponent } from 'react';

import Checkbox from 'material-ui/Checkbox';
import { MenuItem } from 'material-ui/Menu';
import { TableCell } from 'material-ui/Table';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { ListItemText } from 'material-ui/List';

import { TableEditColumnProps, Table } from '@devexpress/dx-react-grid-material-ui';

import { withStyles } from 'material-ui/styles';

const styles = () => ({});

type Props = {
  value: any,
  column: TableEditColumnProps,
  classes: any
};

class Cell extends PureComponent<Props> {
  props: Props;

  render() {
    const { value, column, ...rest } = this.props;

    const DefaultCell = <Table.Cell value={value} column={column} {...rest} />;

    switch (column.type) {
      case 'multiselect':
        return column.lookups ? (
          <TableCell>
            <Select
              disabled
              multiple
              value={value}
              renderValue={selected => selected.join(', ')}
              input={<Input />}
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
        return (
          <TableCell>
            <Checkbox checked={value} disabled color="primary" />
          </TableCell>
        );
      default:
        return DefaultCell;
    }
  }
}

export default withStyles(styles, { withTheme: true })(Cell);
