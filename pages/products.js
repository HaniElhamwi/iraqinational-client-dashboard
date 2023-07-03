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
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddProductDialog from "../components/add-products-dialog";
import useUpdateProduct from "../hooks/products/update";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import EditProductsDialog from "../components/add-products-dialog";
import Product from "../components/product";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const { updateProduct } = useUpdateProduct();

  const addProductsToDataBase = async (product) => {
    console.log("its saving  to data bvase");
    await updateProduct([...products, product]);
    setProducts([...products, product]);
    setOpenDialog(false);
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "products", "products");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log(docSnap.data().products);
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
            {products.map((product, index) => (
              <Product setProducts={setProducts} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
