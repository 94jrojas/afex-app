import React from "react";
import { Clear, Delete, Done, Edit } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  useTheme,
} from "@mui/material";

// const testColumns = [
// 	{
// 	id: "avatar",
// 	label: "Avatar",
// 	// icon: <FormatListBulleted />,
// 	type: "avatar",
// 	align: "left",
// 	borderRadious: "25%",
// 	default: <SportsEsports />,
// 	width: 10,
// 	disabledPadding: true,
// },
// 	{ id: "id", label: "ID", type: "text", align: "left" },
// 	{ id: "displayName", label: "Display Name", type: "text", align: "left" },
// 	{ id: "description", label: "Description", type: "text", align: "left" },
// 	{ id: "price", label: "Price", type: "number", align: "right" },
// 	{ id: "stock", label: "Stock", type: "number", align: "right" },
// 	{ id: "category", label: "Category", type: "text", align: "center" },
// 	{ id: "tags", label: "Tags", type: "text", align: "center" },
// 	{ id: "createdAt", label: "Created At", type: "date", align: "center" },
// 	{ id: "updatedAt", label: "Updated At", type: "date", align: "center" },
// 	{ id: "isPublished", label: "Published", type: "boolean", align: "center" },
// 	{ id: "isConsumable", label: "Consumable", type: "boolean", align: "center" },
// 	{
// 		id: "isStackable",
// 		label: "Stackable",
// 		type: "boolean",
// 		values: [ "Yes", "No" ],
// 		align: "center",
// 	},

// ];

// const testRows = [
// 	{
// 		id: "1",
// 		displayName: "Item 1",
// 		description: "Description 1",
// 		price: 10,
// 		stock: 100,
// 		category: "Category 1",
// 		tags: "Tag 1, Tag 2",
// 		createdAt: "2021-10-10",
// 		updatedAt: "2021-10-10",
// 		isPublished: true,
// 		isConsumable: true,
// 		isStackable: true,
// 	},
// 	{
// 		id: "2",
// 		displayName: "Item 2",
// 		description: "Description 2",
// 		price: 20,
// 		stock: 200,
// 		category: "Category 2",
// 		tags: "Tag 2, Tag 3",
// 		createdAt: "2021-10-10",
// 		updatedAt: "2021-10-10",
// 		isPublished: false,
// 		isConsumable: false,
// 		isStackable: false,
// 	},
// 	{
// 		id: "3",
// 		displayName: "Item 3",
// 		description: "Description 3",
// 		price: 30,
// 		stock: 300,
// 		category: "Category 3",
// 		tags: "Tag 3, Tag 4",
// 		createdAt: "2021-10-10",
// 		updatedAt: "2021-10-10",
// 		isPublished: true,
// 		isConsumable: false,
// 		isStackable: true,
// 	},
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomizedTable({
  columns = [],
  dense = false,
  indexNumber = false,
  indexNumberHeader = "#",
  rows = [],
  defaultRowsPerPage = 10,
  defaultRowsPerPageOptions = [10, 25, 50, 100],
  defaultOrderBy = "displayName",
  defaultOrder = "asc",
  selectabledRows = false,
  limitedSelectableRows = false,
  // onAdd,
  onEdit,
  onDelete,
  selected = [],
  setSelected = () => {},
  // onSearch,
  onRowClick = () => {},
  // maxHeight = "auto",
  background = "transparent",
}) {
  // //test data
  // columns = testColumns;
  // rows = testRows;

  const theme = useTheme();
  // const [ page, setPage ] = React.useState(0);
  // const [ rowsPerPage, setRowsPerPage ] = React.useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [order, setOrder] = React.useState(defaultOrder);
  // const [ selected, setSelected ] = React.useState([]);
  // const [ search, setSearch ] = React.useState("");

  // const handlePageChange = (event, newPage) => {
  // 	setPage(newPage);
  // };

  // const handleRowsPerPageChange = (event) => {
  // 	setRowsPerPage(parseInt(event.target.value, 10));
  // 	setPage(0);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (limitedSelectableRows) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    onRowClick && onRowClick(row);
    if (!selectabledRows) {
      return;
    }

    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      if (limitedSelectableRows && selected.length >= limitedSelectableRows) {
        return;
      }
      newSelected = newSelected.concat(selected, row.id);
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

    setSelected(newSelected);
  };

  // const handleSearch = (event) => {
  //     setSearch(event.target.value);
  //     onSearch && onSearch(event.target.value);
  // };

  // const handleAdd = () => {
  // 	onAdd && onAdd();
  // };

  const handleEdit = (event, item) => {
    event.stopPropagation();
    onEdit && onEdit(item);
  };

  const handleDelete = (event, item) => {
    event.stopPropagation();
    onDelete && onDelete(item);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <>
      <TableContainer sx={{ backgroundColor: background }}>
        <Table size={dense ? "small" : "medium"}>
          <TableHead sx={{ background: alpha("#fff", 0.075) }}>
            <TableRow>
              {selectabledRows && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                    color="third"
                    sx={{
                      padding: 0,
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  />
                </TableCell>
              )}
              {indexNumber && (
                <TableCell align="center" width={10}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {indexNumberHeader}
                  </Box>
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "center"}
                  width={column.width || "auto"}
                  // padding={column.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, column.id)}
                    >
                      {column.icon ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {column.icon}
                        </Box>
                      ) : (
                        column.label
                      )}
                    </TableSortLabel>
                  ) : column.icon ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {column.icon}
                    </Box>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="right" width={80}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id || index}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      "&.MuiTableRow-root:hover": {
                        background: alpha(theme.palette.secondary.main, 0.2),
                      },
                      "&.Mui-selected": {
                        background: alpha(theme.palette.secondary.main, 0.35),
                      },
                      "&.Mui-selected:hover": {
                        background: alpha(theme.palette.secondary.main, 0.25),
                      },

                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {selectabledRows && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          color="third"
                          sx={{
                            padding: 0,
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        />
                      </TableCell>
                    )}
                    {indexNumber && (
                      <TableCell align="center" width={10}>
                        {index + 1}
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || "center"}
                          width={column.width || "auto"}
                          // sx={{
                          // 	maxHeight: dense ? 33 : 53,
                          // 	paddingTop: column.disabledPadding ? 0 : 2,
                          // 	paddingBottom: column.disabledPadding ? 0 : 2,
                          // }}
                        >
                          {column.type === "text" && value}
                          {column.type === "date" && value}
                          {column.type === "number" && value}
                          {column.type === "boolean" &&
                            (value ? (
                              <Box color={theme.palette.success.main}>
                                <Done />
                              </Box>
                            ) : (
                              <Box color={theme.palette.error.main}>
                                <Clear />
                              </Box>
                            ))}
                          {column.type === "avatar" && (
                            <Avatar
                              src={value}
                              sx={{
                                borderRadius:
                                  column.borderRadious ||
                                  theme.shape.borderRadius,
                                bgcolor: isItemSelected
                                  ? theme.palette.secondary.main
                                  : theme.palette.grey[700],
                                color: theme.palette.secondary.contrastText,
                              }}
                            >
                              {value || column.default}
                            </Avatar>
                          )}
                        </TableCell>
                      );
                    })}
                    {(onEdit || onDelete) && (
                      <>
                        <TableCell align="right" width={100}>
                          {onEdit && (
                            <Tooltip title="Edit">
                              <IconButton
                                // edge="end"
                                aria-label="edit"
                                onClick={(event) => handleEdit(event, row)}
                                // sx={{ marginRight: 0.25 }}
                                color="third"
                                sx={{
                                  padding: 0,
                                  marginRight: 1,
                                  "&:hover": { backgroundColor: "transparent" },
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onDelete && (
                            <Tooltip title="Delete">
                              <IconButton
                                // edge="end"
                                aria-label="delete"
                                onClick={(event) => handleDelete(event, row)}
                                // sx={{ marginRight: 0 }}
                                color="error"
                                sx={{
                                  padding: 0,
                                  "&:hover": { backgroundColor: "transparent" },
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <CardFooter justifyContent="flex-end" border> */}
      {/* TablePagination right */}
      {/* <TablePagination
					rowsPerPageOptions={defaultRowsPerPageOptions}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
				/>
				</CardFooter> */}
    </>
  );
}
