import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditProductsDialog from "./add-products-dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Product({ setProducts, product }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <TableRow>
      <EditProductsDialog
        openDialog={openEditDialog}
        setOpenDialog={setOpenEditDialog}
        setProducts={setProducts}
        productData={product}
      />
      <TableCell>
        <Typography>{product.type}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.price}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.packaging}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.validity}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.image}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <IconButton>
            <DeleteIcon sx={{ color: "red !important" }} />
          </IconButton>
          <IconButton>
            <EditIcon
              sx={{ color: "rgb(249 115 22) !important" }}
              onClick={() => setOpenEditDialog(true)}
            />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default Product;
