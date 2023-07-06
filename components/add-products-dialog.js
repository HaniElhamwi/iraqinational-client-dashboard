import React, { useState } from "react";
import generateRandomId from "../utils";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  CircularProgress,
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
    Type: "",
    Price: "",
    Packaging: "",
    Validity: "",
    DeliveryTerms: "",
    Image: "",
    id: generateRandomId(),
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];
    setProduct({ ...product, Image: event.target.files[0] });
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
            }}
          >
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
              value={product.Type}
              onChange={(e) => {
                setProduct({ ...product, Type: e.target.value });
              }}
            />
            <Box sx={{ display: "flex", gap: 2, my: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={product.Price}
                placeholder="price"
                onChange={(e) => {
                  setProduct({ ...product, Price: e.target.value });
                }}
              />
              <TextField
                fullWidth
                size="small"
                value={product.Packaging}
                placeholder="packaging"
                onChange={(e) => {
                  setProduct({ ...product, Packaging: e.target.value });
                }}
              />
            </Box>
            <TextField
              fullWidth
              size="small"
              value={product.DeliveryTerms}
              placeholder="delivery terms"
              onChange={(e) => {
                setProduct({ ...product, DeliveryTerms: e.target.value });
              }}
            />
            <Box>
              <Typography variant="subtitle2">price validity</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Price Validity"
                type="date"
                value={product.Validity}
                onChange={(e) => {
                  setProduct({ ...product, Validity: e.target.value });
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
                setLoading(true);
                await addProductsToDataBase(product, "add");
                setProduct({
                  Type: "",
                  Price: "",
                  Packaging: "",
                  Validity: "",
                  DeliveryTerms: "",
                  Image: "",
                  id: generateRandomId(),
                });
                setLoading(false);
              }}
              sx={{
                backgroundColor: "rgb(249 115 22) !important",
                mt: 1,
              }}
            >
              {!loading ? (
                "SUBMIT"
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default EditProductsDialog;
