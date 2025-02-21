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

// Function to create product data
function createProductData(
  name: string,
  category: string,
  price: number,
  stock: number,
  addedOn: string
) {
  return { name, category, price, stock, addedOn };
}

// Sample product data
const products = [
  createProductData("Dumbbell Set", "Fitness", 79.99, 20, "2024-02-19"),
  createProductData("Resistance Bands", "Accessories", 19.99, 50, "2024-02-18"),
  createProductData("Protein Powder", "Supplements", 49.99, 30, "2024-02-17"),
  createProductData("Treadmill", "Cardio", 599.99, 5, "2024-02-16"),
  createProductData("Yoga Mat", "Accessories", 25.99, 40, "2024-02-15"),
];

export default function ProductTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="product table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Price ($)</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Added On</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.name}>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {product.category}
              </StyledTableCell>
              <StyledTableCell align="center">
                ${product.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">{product.stock}</StyledTableCell>
              <StyledTableCell align="center">
                {product.addedOn}
              </StyledTableCell>
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
