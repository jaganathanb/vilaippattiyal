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
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';

import { uniq } from 'lodash';

import VPDialog from '../dialog';

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

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const Cell = props => <Table.Cell {...props} />;

const getRowId = row => row.id;

type Props = {
  rows: any[],
  columns: any[],
  columnOrder: string[],
  UserDialog: any,
  DeleteComponent: any,
  actions?: {
    add: (data: any) => void,
    edit: (data: any) => void,
    delete: (data: any[]) => void
  },
  showModal?: (type: string, props: any) => void,
  hideModal?: () => void
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
    if (this.areDifferentByIds(nextProps.rows, this.props.rows, 'id')) {
      this.setState({ currentRows: nextProps.rows });
    }

    if (this.areDifferentByIds(nextProps.columns, this.props.columns, 'name')) {
      this.setState({ currentColumns: nextProps.columns });
    }

    if (
      nextProps.columnOrder.toString() !== this.props.columnOrder.toString()
    ) {
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
  }

  areDifferentByIds = (next, current, prop) => {
    const nextids = uniq(next.map(x => x[prop]));
    const currids = uniq(current.map(x => x[prop]));
    const combinedIds = uniq(nextids.concat(currids));
    return (
      nextids.length !== currids.length || combinedIds.length !== currids.length
    );
  };
  changeSorting = sorting => this.setState({ sorting });
  changeEditingRowIds = editingRowIds => {
    const { UserDialog } = this.props;
    this.setState({ editingRowIds });
    this.props.showModal({
      id: 2,
      type: 'custom',
      title: 'Edit User',
      getContent: () => (
        <UserDialog
          edit
          initialValues={
            this.state.currentRows.filter(row => editingRowIds.indexOf(row.id) > -1)[0]
          }
        />
      )
    });
  };
  changeAddedRows = addedRows =>
    this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {}))
    });
  changeRowChanges = rowChanges => this.setState({ rowChanges });
  changeCurrentPage = currentPage => this.setState({ currentPage });
  changePageSize = pageSize => this.setState({ pageSize });
  commitChanges = ({ added, changed, deleted }) => {
    let { currentRows } = this.state;
    if (added) {
      const startingAddedId =
        currentRows.length - 1 > 0
          ? currentRows[currentRows.length - 1].id + 1
          : 0;
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

  saveRow = data => {
    this.props.actions.save(data);

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
  deleteRows = data => {
    this.props.actions.delete(data);
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
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      deletingRows,
      pageSize,
      pageSizes,
      currentColumnOrder,
      currentColumns,
      tableColumnExtensions,
      currentRows
    } = this.state;

    const { DeleteComponent, UserDialog } = this.props;

    return (
      <Paper>
        <Grid rows={currentRows} columns={currentColumns} getRowId={getRowId}>
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <EditingState
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            onCommitChanges={this.commitChanges}
          />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />

          <TableColumnReordering
            order={currentColumnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <TableHeaderRow showSortingControls />
          <TableEditColumn
            width={120}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
        {/* <VPDialog
          title="Delete User"
          open={!!deletingRows.length}
          onNegative={this.cancelDelete}
          onPositive={this.deleteRows}
          contentText={`Are you sure to delete the user${
            this.deleteRows.length > 1 ? 's?' : '?'
          }`}
          Content={() => (
            <DeleteComponent
              rows={currentRows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={currentColumns}
              columnExtensions={this.state.tableColumnExtensions}
              cellComponent={Cell}
            />
          )}
        />
        <UserDialog
          title="Edit User"
          edit
          open={!!editingRowIds.length}
          onNegative={this.cancelEdit}
          onPositive={this.updateRow}
          data={
            currentRows.filter(row => editingRowIds.indexOf(row.id) > -1)[0]
          }
          contentText="Fill the details below"
        />
        <UserDialog
          title="Add User"
          open={!!addedRows.length}
          onNegative={this.cancelAdd}
          onPositive={this.saveRow}
          contentText="Fill the details below"
        /> */}
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VPGrid);
