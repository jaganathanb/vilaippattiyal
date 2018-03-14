import React, { PureComponent } from 'react';

import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from 'material-ui/Table';

type Props = {
  onSort: (event: any, property: string) => void,
  onSelectAllClick: () => void,
  order: string,
  orderBy: string,
  rowCount: number,
  numSelected: number,
  columns: any[]
};

class VPTableHead extends PureComponent<Props> {
  props: Props;
  createSortHandler = property => event => {
    this.props.onSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columns
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(
            column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default VPTableHead;
