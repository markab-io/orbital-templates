/**
 * Pagination component for displaying and navigating through a paginated data set.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isSm - Indicates whether the screen size is small.
 * @param {number} props.rowsPerPage - The number of rows per page.
 * @param {function} props.onChangePage - The callback function to handle page change.
 * @param {number} props.page - The current page number.
 * @param {number} props.count - The total number of items.
 * @param {function} props.onChangeRowsPerPage - The callback function to handle rows per page change.
 * @returns {JSX.Element} The Pagination component.
 */

import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { Paper, IconButton, Icon } from "@mui/material";

interface PaginationProps {
  isSm: boolean;
  rowsPerPage: number;
  onChangePage: (page: number) => void;
  page: number;
  count: number;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  isSm,
  rowsPerPage,
  onChangePage,
  page,
  count,
  onChangeRowsPerPage,
}) => {
  return !isSm ? (
    <Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          onChangePage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          onChangeRowsPerPage(parseInt(event.target.value, 10));
        }}
      />
    </Paper>
  ) : (
    <Paper>
      <IconButton
        onClick={() => onChangePage(page - 1)}
        disabled={page === 0}
      >
        <Icon>navigate_before</Icon>
      </IconButton>
      {`${10 * page + 1} to ${Math.min(10 * (page + 1), count)} of ${count}`}
      <IconButton
        onClick={() => onChangePage(page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <Icon>navigate_next</Icon>
      </IconButton>
    </Paper>
  );
};

export default Pagination;
