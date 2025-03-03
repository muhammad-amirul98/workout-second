import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { useEffect } from "react";
import { fetchProducts } from "../../state/admin/productSlice";
import { Product } from "../../types/ProductTypes";

// Styled components for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f766e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductsTable() {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // Get JWT inside the useEffect
    if (jwt) {
      dispatch(fetchProducts(jwt));
    }
  }, []); // Empty dependency array makes it run only once when the component mounts

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="product table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Brand</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.products.map((row: Product) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-1">
                  {row.images.map((image) => (
                    <img src={image} className="w-20 rounded-md" />
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">{row.brand}</StyledTableCell>

              <StyledTableCell align="center">
                ${row.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">{row.stock}</StyledTableCell>

              <StyledTableCell align="center">
                <IconButton>
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
