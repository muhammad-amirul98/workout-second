import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { orderStatuses } from "../data/orderStatuses";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../state/admin/adminOrderSlice";
import { dateFormat } from "../../user/pages/Util/dateFormat";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React from "react";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const adminorder = useAppSelector((store) => store.adminorder);
  const [openRows, setOpenRows] = useState<Record<number, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<Record<number, HTMLElement | null>>(
    {}
  );

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number
  ) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  const handleUpdateStatusOrder = (orderId: number, orderStatus: string) => {
    handleClose(orderId);
    if (jwt) {
      dispatch(updateOrderStatus({ jwt, orderId, orderStatus }));
    }
  };

  const handleToggle = (index: number) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (jwt) {
      dispatch(fetchAllOrders(jwt));
    }
  }, []);

  useEffect(() => {
    console.log(adminorder.orders);
  }, []);

  const [orderStatus, setOrderStatus] = useState(
    orderStatuses.find((status) => status.status === "ACTIVE")
  );

  const handleChange = (event: SelectChangeEvent) => {
    const selectedStatus = event.target.value;

    const statusObject = orderStatuses.find(
      (status) => status.status === selectedStatus
    );
    setOrderStatus(statusObject);
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderStatus?.status}
            label="Order Status"
            onChange={handleChange}
          >
            {orderStatuses.map((item, index) => (
              <MenuItem value={item.status} key={index}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>

              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell align="center">Delivery Date</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>

              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminorder.orders.map((order, index) => (
              <React.Fragment key={index}>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {order.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleToggle(index)}
                    >
                      {openRows[index] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="max-w-30"
                  >
                    {dateFormat(order.orderDate)}
                  </StyledTableCell>
                  <StyledTableCell className="max-w-30">
                    {dateFormat(order.deliverDate)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.totalPrice}
                  </StyledTableCell>

                  <StyledTableCell>
                    <div className="max-w-50 text-center space-y-2">
                      <p>Country: {order.shippingAddress.country}</p>
                      <p>Street: {order.shippingAddress.street}</p>
                      <p>Zip: {order.shippingAddress.zip}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p
                      className="p-2 border rounded-full
                  border-teal-700 text-teal-700"
                    >
                      {order.orderStatus}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, order.id)}
                      >
                        Change Status
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl[order.id]}
                        open={Boolean(anchorEl[order.id])}
                        onClose={() => handleClose(order.id)}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {orderStatuses.map((item) => (
                          <MenuItem
                            key={item.status}
                            onClick={() =>
                              handleUpdateStatusOrder(order.id, item.status)
                            }
                          >
                            {item.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>

                {/* collapsible row */}
                {openRows[index] &&
                  order.orderItems.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell colSpan={1} align="center">
                        <div className="max-w-30">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="rounded-md"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell colSpan={3} className="space-y-1">
                        <p className="font-bold">{item.product.brand}</p>
                        <p>{item.product.name}</p>
                        <p>${item.product.price}</p>
                        <p>{item.product.description}</p>
                        <p>Quantity: {item.quantity}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminOrders;
