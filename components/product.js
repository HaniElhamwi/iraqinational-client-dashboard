import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditProductsDialog from "./edit-product-dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Product({ setProducts, product, addProductsToDataBase }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <TableRow>
      {openEditDialog && (
        <EditProductsDialog
          openDialog={openEditDialog}
          setOpenDialog={setOpenEditDialog}
          setProducts={setProducts}
          productData={product}
          addProductsToDataBase={addProductsToDataBase}
        />
      )}
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
        <Typography>{product.deliveryTerms}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.validity}</Typography>
      </TableCell>
      <TableCell>
        <img
          src={product.image}
          style={{ width: 150, height: 100, objectFit: "cover" }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => addProductsToDataBase(product, "delete")}>
            <DeleteIcon sx={{ color: "red !important" }} />
          </IconButton>
          <IconButton onClick={() => setOpenEditDialog(true)}>
            <EditIcon sx={{ color: "rgb(249 115 22) !important" }} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default Product;
