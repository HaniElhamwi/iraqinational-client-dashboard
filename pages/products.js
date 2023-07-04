import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddProductDialog from "../components/add-products-dialog";
import useUpdateProduct from "../hooks/products/update";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Product from "../components/product";
import useUploadImage from "../hooks/useUploadImage";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const { updateProduct } = useUpdateProduct();
  const { uploadFile } = useUploadImage();

  const addProductsToDataBase = async (product, status) => {
    if (status === "add") {
      const dataUrl = await uploadFile({ file: product.image });

      await updateProduct([...products, { ...product, image: dataUrl.image }]);
      setProducts([...products, { ...product, image: dataUrl.image }]);
      setOpenDialog(false);
    } else if (status === "edit") {
      let dataUrl;
      if (product.image.name) {
        dataUrl = await uploadFile({ file: product.image });
      }
      const newProducts = products.map((item) => {
        if (item.id === product.id) {
          return { ...product, image: dataUrl ? dataUrl.image : item.image };
        } else {
          return item;
        }
      });
      await updateProduct(newProducts);
      setProducts(newProducts);
    } else {
      const newProducts = products.filter((item) => item.id !== product.id);
      await updateProduct(newProducts);
      setProducts(newProducts);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "products", "products");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().products) {
          setProducts(docSnap.data().products);
        }
      } else {
        console.log("No such document!");
      }
    };
    getData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <AddProductDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setProducts={setProducts}
          addProductsToDataBase={addProductsToDataBase}
        />
        <Box sx={{ padding: 4, borderBottom: "1px solid #eee" }}>
          <Typography variant="h5">Products List</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "",
            justifyContent: "space-between",
          }}>
          <Box></Box>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            color="warning"
            sx={{ m: 2, background: "rgb(249 115 22) !important" }}
            startIcon={<AddIcon />}>
            Add Row
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Packaging</TableCell>
              <TableCell>Price Validity</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Product
                setProducts={setProducts}
                product={product}
                key={product.id}
                addProductsToDataBase={addProductsToDataBase}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
