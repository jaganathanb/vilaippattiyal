import React, { PureComponent } from 'react';

import {
  SortingState,
  SelectionState,
  FilteringState,
  PagingState,
  GroupingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableSelection,
  TableGroupRow,
  GroupingPanel,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from 'material-ui/styles';

import Validator from '../validator';

const styles = theme => ({
  title: {
    color: theme.palette.text.primary
  }
});

type Props = {
  rows: any[],
  columns: any[],
  sorting?: any[],
  onSortingChange?: (sorting: any[]) => void,
  selection?: any[],
  onSelectionChange?: (selection: any[]) => void,
  grouping?: any[],
  onGroupingChange?: (grouping: any[]) => void,
  expandedGroups?: any[],
  onExpandedGroupsChange?: (expandedGroups: any[]) => void,
  filters?: any[],
  onFiltersChange?: (filters: any[]) => void,
  currentPage?: number,
  onCurrentPageChange?: (currentPage: number) => void,
  pageSize?: number,
  onPageSizeChange?: (pageSize: number) => void,
  pageSizes?: number[],
  columnOrder?: string[],
  onColumnOrderChange?: (columnOrder: string[]) => void,
  columnWidths?: any[],
  onColumnWidthsChange?: (columnWidths: any[]) => void
};
class VPGrid extends PureComponent<Props> {
  props: Props;

  static defaultProps = {
    sorting: [],
    selection: [],
    filters: [],
    currentPage: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15],
    columnOrder: [],
    columnWidths: [],
    onSortingChange: () => ({}),
    onSelectionChange: () => ({}),
    onFiltersChange: () => ({}),
    onCurrentPageChange: () => ({}),
    onPageSizeChange: () => ({}),
    onColumnWidthsChange: () => ({}),
    onColumnOrderChange: () => ({})
  };
  render() {
    const {
      rows,
      columns,
      sorting,
      onSortingChange,
      selection,
      onSelectionChange,
      filters,
      onFiltersChange,
      currentPage,
      onCurrentPageChange,
      pageSize,
      onPageSizeChange,
      pageSizes,
      columnWidths,
      onColumnWidthsChange
    } = this.props;
    return (
      <div>
        <Grid rows={rows} columns={columns}>
          <FilteringState filters={filters} onFiltersChange={onFiltersChange} />
          <SortingState sorting={sorting} onSortingChange={onSortingChange} />

          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={onCurrentPageChange}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
          />

          <SelectionState
            selection={selection}
            onSelectionChange={onSelectionChange}
          />

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <Table />

          <Validator
            shouldRender={columnWidths.length > 0}
            Component={TableColumnResizing}
            columnWidths={columnWidths}
            onColumnWidthsChange={onColumnWidthsChange}
          />

          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <TableSelection showSelectAll />
          <Toolbar />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VPGrid);
