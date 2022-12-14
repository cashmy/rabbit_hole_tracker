import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TablePagination, TableSortLabel, useTheme } from "@mui/material";
import TextContrast from '../helpers/getTextContrast';

export default function useRTKTable(data, columnCells, filterFn, theadColor, ...props) {
  // const classes = useStyles(props);
  const theme = useTheme();

  const pages = [5, 10, 25, { label: "All", value: -1 }];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table
      sx={{
        marginTop: theme.spacing(3),
        "& thead th": {
          fontWeight: "600",
          backgroundColor: theadColor ? theadColor : theme.palette.background.default,
          color: theadColor 
            ? TextContrast.getTextContrast(theadColor)
            : theme.palette.getContrastText(theme.palette.background.default),
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: theme.palette.action.hover,
          cursor: "pointer",
        },
      }}
      // className={classes.table}
      stickyHeader={false || props.stickyHeader}
    >{props.children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead
        style={{ backgroundColor: "purple" }}
      >
        <TableRow>
          {columnCells.map((columnCell) => (
            <TableCell
              key={columnCell.id}
              sortDirection={orderBy === columnCell.id ? order : false}
            >
              {columnCell.disableSorting ? (
                columnCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === columnCell.id}
                  direction={orderBy === columnCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(columnCell.id);
                  }}
                >
                  {columnCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={data.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  // From the Material UI documents
  // modified to allow the ability to include the sort of objects
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy); //Change the sign, thus switching the direction.
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1; // Need to switch elements
    }
    if (b[orderBy] > a[orderBy]) {
      return 1; // In correct order
    }
    return 0; // They equal
  }

  const recordsAfterPagingAndSorting = () => {
    // start index = pageindex x rowsperpagecount
    // end index = (pageindex + 1) x rowsperpagecount
    // obo -- e.g. 0-5(4), 5-10(9), etc

    // The filterFn is passed in from the parent. It has the "fn" function defined.
    //   Into that function we pass the "data" and take the result to pass to the sorting functions

    return stableSort(
      filterFn.fn(data),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
