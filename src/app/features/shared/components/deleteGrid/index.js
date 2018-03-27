import React, { PureComponent } from 'react';

import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

type Props = {
  rows: any[],
  columnExtensions: any[],
  columns: any[],
  cellComponent: any
};

export default class DeleteGrid extends PureComponent<Props> {
  props: Props;
  render() {
    const {
 rows, columns, columnExtensions, cellComponent 
} = this.props;
    return (
      <Grid rows={rows} columns={columns}>
        <Table
          columnExtensions={columnExtensions}
          cellComponent={cellComponent}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}
