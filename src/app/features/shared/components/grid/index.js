import React, { PureComponent } from 'react';
import {
  SortingState,
  EditingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import { withStyles } from 'material-ui/styles';

import { uniq } from 'lodash';

import EditCell from './components/lookupEditCell';
import { Command } from './components/commands';

const styles = () => ({});

const Cell = props => {
  if (props.column.name === 'status') {
    return (
      <Checkbox checked value={props.row.status ? 'Enabled' : 'Disabled'} disabled {...props} />
    );
  }

  return <Table.Cell {...props} />;
};

const getRowId = row => row.id;

type Props = {
  rows: any[],
  columns: any[],
  columnOrder: string[],
  lookupValues: any,
  showModal?: (type: string, props: any) => void
};

class VPGrid extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 0,
      pageSizes: [5, 10, 0],
      currentColumnOrder: props.columnOrder,
      currentRows: props.rows,
      currentColumns: props.columns
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.areDifferentByIds(nextProps.columns, this.props.columns, 'name')) {
      this.setState({ currentColumns: nextProps.columns });
    }

    if (nextProps.columnOrder.toString() !== this.props.columnOrder.toString()) {
      const tableColumnExtensions = nextProps.columns.map(column => {
        if (column.type === 'number') {
          return {
            columnName: column.name,
            align: 'right'
          };
        }
        return { columnName: column.name };
      });

      this.setState({
        currentColumnOrder: nextProps.columnOrder,
        tableColumnExtensions
      });
    }

    this.setState({ currentRows: nextProps.rows });
  }

  areDifferentByIds = (next, current, prop) => {
    const nextids = uniq(next.map(x => x[prop]));
    const currids = uniq(current.map(x => x[prop]));
    const combinedIds = uniq(nextids.concat(currids));
    return nextids.length !== currids.length || combinedIds.length !== currids.length;
  };

  changeSorting = sorting => this.setState({ sorting });

  changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

  changeAddedRows = addedRows =>
    this.setState({
      addedRows: addedRows.map(row =>
        (Object.keys(row).length
          ? row
          : {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: this.props.lookupValues.roles[0],
            status: this.props.lookupValues.status[0]
          }))
    });

  changeRowChanges = rowChanges => this.setState({ rowChanges });

  changeCurrentPage = currentPage => this.setState({ currentPage });

  changePageSize = pageSize => this.setState({ pageSize });

  commitChanges = ({ added, changed, deleted }) => {
    let { currentRows } = this.state;
    if (added) {
      const startingAddedId =
        currentRows.length - 1 > 0 ? currentRows[currentRows.length - 1].id + 1 : 0;
      currentRows = [
        ...currentRows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...currentRows
        }))
      ];
    }
    if (changed) {
      currentRows = currentRows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    this.setState({
      currentRows,
      deletingRows: deleted || this.state.deletingRows
    });
  };

  cancelDelete = () => this.setState({ deletingRows: [] });

  cancelEdit = () => this.setState({ editingRowIds: [] });

  cancelAdd = () => this.setState({ addedRows: [] });

  saveRow = () => {
    const rows = this.state.currentRows.slice();
    this.state.editingRowIds.forEach(rowId => {
      const index = rows.findIndex(row => row.id === rowId);
      if (index > -1) {
        rows.splice(index, 1);
      }
    });
    this.setState({ currentRows: rows, deletingRows: [] });
  };

  updateRow = () => {
    const rows = this.state.currentRows.slice();
    this.state.editingRowIds.forEach(rowId => {
      const index = rows.findIndex(row => row.id === rowId);
      if (index > -1) {
        rows.splice(index, 1);
      }
    });
    this.setState({ currentRows: rows, deletingRows: [] });
  };

  deleteRows = () => {
    const rows = this.state.currentRows.slice();
    this.state.deletingRows.forEach(rowId => {
      const index = rows.findIndex(row => row.id === rowId);
      if (index > -1) {
        rows.splice(index, 1);
      }
    });
    this.setState({ currentRows: rows, deletingRows: [] });
  };

  changeColumnOrder = order => {
    this.setState({ currentColumnOrder: order });
  };

  render() {
    const {
      currentColumnOrder,
      currentColumns,
      tableColumnExtensions,
      currentRows,
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      pageSize,
      pageSizes
    } = this.state;

    return (
      <Paper>
        <Grid rows={currentRows} columns={currentColumns} getRowId={getRowId}>
          <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <DragDropProvider />

          <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />

          <TableColumnReordering
            order={currentColumnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={120}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'VPGrid', withTheme: true })(VPGrid);
