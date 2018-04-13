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

import { withStyles } from 'material-ui/styles';

import { uniq, sortBy } from 'lodash';

import EditCell from './components/editCell';
import Cell from './components/cell';
import { Command } from './components/commands';

const styles = () => ({});

const getRowId = row => row.id;

type Props = {
  actions: { save: (data: any[]) => void, remove: (data: any) => void },
  progress: { saved: boolean, removed: boolean },
  rows: any[],
  columns: any[],
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
      currentColumnOrder: sortBy(props.columns, 'index').map(column => column.name),
      currentRows: props.rows,
      currentColumns: props.columns
    };
  }
  componentWillReceiveProps(nextProps) {
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
      currentColumnOrder: sortBy(nextProps.columns, 'index').map(column => column.name),
      tableColumnExtensions,
      currentColumns: nextProps.columns,
      currentRows: nextProps.rows
    });

    if (nextProps.progress.saved) {
      console.log(`Data saved? ${nextProps.progress.saved}`);
    }
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
      addedRows
    });

  changeRowChanges = rowChanges => this.setState({ rowChanges });

  changeCurrentPage = currentPage => this.setState({ currentPage });

  changePageSize = pageSize => this.setState({ pageSize });

  commitChanges = ({ added, changed }) => {
    const { currentRows } = this.state;
    if (added) {
      this.saveRow(added[0]);
    }
    if (changed) {
      const changedRows = Object.values(changed);
      if (changedRows.length) {
        const updatedRow = currentRows.filter(row => changed[row.id])[0];
        this.updateRow({ id: updatedRow.id, ...changed[updatedRow.id] });
      }
    }
  };

  cancelDelete = () => this.setState({ deletingRows: [] });

  cancelEdit = () => this.setState({ editingRowIds: [] });

  cancelAdd = () => this.setState({ addedRows: [] });

  saveRow = row => {
    this.props.actions.save(row);
  };

  updateRow = row => {
    this.props.actions.save(row);
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
