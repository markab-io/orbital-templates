/**
 * @file Table.tsx
 * @desc A reusable table component with sorting, pagination, and selection functionality.
 */

import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, WithStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import theme from "theme";
import { styles, toolbarStyles } from "./Table.styles";
import {
  Grid,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

interface Column {
  id: string;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
}

interface Row {
  _id: string;
  [key: string]: any;
}

interface EnhancedTableProps extends WithStyles<typeof styles> {
  rows: Row[];
  columns: Column[];
  title: string;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  count: number;
}

interface EnhancedTableState {
  order: "asc" | "desc";
  orderBy: string;
  selected: string[];
  page: number;
  rowsPerPage: number;
}

/**
 * Sorts the array in descending order based on the specified property.
 * @param {Object} a - The first object to compare.
 * @param {Object} b - The second object to compare.
 * @param {string} orderBy - The property to sort by.
 * @returns {number} - The comparison result.
 */
function desc(a: any, b: any, orderBy: string): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Sorts the array in a stable way based on the specified comparison function.
 * @param {Array} array - The array to sort.
 * @param {Function} cmp - The comparison function.
 * @returns {Array} - The sorted array.
 */
function stableSort(array: any[], cmp: (a: any, b: any) => number): any[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * Returns the sorting function based on the order and orderBy parameters.
 * @param {string} order - The sorting order ("asc" or "desc").
 * @param {string} orderBy - The property to sort by.
 * @returns {Function} - The sorting function.
 */
function getSorting(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy);
}

interface EnhancedTableHeadProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: "asc" | "desc";
  orderBy: string;
  numSelected: number;
  rowCount: number;
  columns: Column[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  count: number;
}

/**
 * The table head component with sorting functionality.
 */
class EnhancedTableHead extends Component<EnhancedTableHeadProps> {
  /**
   * Creates a sort handler function for the specified property.
   * @param {string} property - The property to sort by.
   * @returns {Function} - The sort handler function.
   */
  createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columns,
      count,
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
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.numeric ? "right" : "left"}
              padding={column.disablePadding ? "none" : "default"}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? "bottom-end" : "bottom-start"}
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
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

interface EnhancedTableToolbarProps extends WithStyles<typeof toolbarStyles> {
  numSelected: number;
  title: string;
}

/**
 * The toolbar component for the table.
 * @param {Object} props - The component props.
 * @param {number} props.numSelected - The number of selected rows.
 * @param {Object} props.classes - The CSS classes.
 * @param {string} props.title - The title of the table.
 * @returns {JSX.Element} - The JSX element representing the toolbar.
 */
let EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const { numSelected, classes, title } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

/**
 * The enhanced table component with sorting, pagination, and selection functionality.
 */
class EnhancedTable extends Component<EnhancedTableProps, EnhancedTableState> {
  state: EnhancedTableState = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  /**
   * Handles the request to sort the table.
   * @param {Object} event - The event object.
   * @param {string} property - The property to sort by.
   */
  handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  /**
   * Handles the click event on a row.
   * @param {Object} event - The event object.
   * @param {string} id - The ID of the clicked row.
   */
  handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  /**
   * Checks if a row is selected.
   * @param {string} id - The ID of the row.
   * @returns {boolean} - True if the row is selected, false otherwise.
   */
  isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      classes,
      rows,
      columns,
      title,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count,
    } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar title={title} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <MaterialTable className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              columns={columns}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy)).map((n) => {
                const isSelected = this.isSelected(n._id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => this.handleClick(event, n._id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell component="th" scope="row" padding="none">
                        {n[col.label]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaterialTable>
        </div>
        <Grid container justifyContent="flex-start">
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onPageChange={(event, page) => setPage(page)}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { defaultTheme: theme })(EnhancedTable);
