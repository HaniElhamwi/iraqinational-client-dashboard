import React, { useState } from "react";
import generateRandomId from "../utils";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

function EditProductsDialog(props) {
  const { openDialog, setOpenDialog, setProducts, addProductsToDataBase } =
    props;
  const [product, setProduct] = useState({
    type: "",
    price: "",
    packaging: "",
    validity: "",
    deliveryTerms: "",
    image: "",
    id: generateRandomId(),
  });
  const [imageUrl, setImageUrl] = useState("");

  function handleFileChange(event) {
    const file = event.target.files[0];
    setProduct({ ...product, image: event.target.files[0] });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <Box sx={{ padding: 1 }}>
        <Box sx={{ direction: "rtl" }}>
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}>
            <ClearIcon sx={{ color: "#666" }} />
          </IconButton>
        </Box>
        <DialogContent>
          <Box>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Edit Product
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              size="small"
              placeholder="Type"
              value={product.type}
              onChange={(e) => {
                setProduct({ ...product, type: e.target.value });
              }}
            />
            <Box sx={{ display: "flex", gap: 2, my: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={product.price}
                placeholder="price"
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
              />
              <TextField
                fullWidth
                size="small"
                value={product.packaging}
                placeholder="packaging"
                onChange={(e) => {
                  setProduct({ ...product, packaging: e.target.value });
                }}
              />
            </Box>
            <TextField
              fullWidth
              size="small"
              value={product.deliveryTerms}
              placeholder="delivery terms"
              onChange={(e) => {
                setProduct({ ...product, deliveryTerms: e.target.value });
              }}
            />
            <Box>
              <Typography variant="subtitle2">price validity</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Price Validity"
                type="date"
                value={product.validity}
                onChange={(e) => {
                  setProduct({ ...product, validity: e.target.value });
                }}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2">product image</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="image"
                type="file"
                onChange={handleFileChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <img
                  src={imageUrl}
                  alt="User-provided image"
                  style={{ with: 100, height: 100, textAlign: "center" }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={async () => {
                addProductsToDataBase(product, "add");
                setProduct({
                  type: "",
                  price: "",
                  packaging: "",
                  validity: "",
                  deliveryTerms: "",
                  image: "",
                  id: generateRandomId(),
                });
              }}
              sx={{
                backgroundColor: "rgb(249 115 22) !important",
                mt: 1,
              }}>
              SUBMIT
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default EditProductsDialog;
