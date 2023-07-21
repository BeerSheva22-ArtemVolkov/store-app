import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useDispatchCode, useSelectorProducts } from "../hooks/hooks";
import ProductType from "../model/ProductType";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ProductsTable from "../components/ProductsTable";
import ProductForm from "../components/ProductForm";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { productsService } from "../config/service-config";

const Products: React.FC = () => {

    const products: ProductType[] = useSelectorProducts();

    console.log(products);

    const dispatchCode = useDispatchCode();

    const [productChangeDialog, setProductChangeDialog] = useState<boolean>(false)
    const [productDeleteDialog, setProductDeleteDialog] = useState<boolean>(false)
    const [product, setProduct] = useState<ProductType | undefined>()

    const productChangeClose = () => {
        setProduct(undefined)
        setProductChangeDialog(false)
    }

    const productChangeOpen = () => {
        setProductChangeDialog(true)
    }

    const productDeleteClose = () => {
        setProduct(undefined)
        setProductDeleteDialog(false)
    }

    const productDeleteOpen = () => {
        setProductDeleteDialog(true)
    }

    const openEdit = (productID: string) => {
        productChangeOpen()
        const selectedProduct = products.find(product => product.id == productID)
        setProduct(selectedProduct)
    }

    const openDelete = (productID: string) => {
        productDeleteOpen()
        const selectedProduct = products.find(product => product.id == productID)
        setProduct(selectedProduct)
    }

    async function updateFn(product: ProductType, image: File | undefined) {
        let errorMessage = '';
        const successMessage = 'Product was edited'
        try {
            const res = productsService.updateProduct(product, image)
            productChangeClose()
        } catch (error: any) {
            errorMessage = error.message
        }
        dispatchCode(successMessage, errorMessage)
    }

    async function addFn(product: ProductType, image: File | undefined) {
        let errorMessage = '';
        const successMessage = 'Product was added'
        try {
            const res = productsService.addProduct(product, image)
            productChangeClose()
        } catch (error: any) {
            errorMessage = error.message
        }
        
        dispatchCode(successMessage, errorMessage)
    }

    async function deleteFn() {
        let errorMessage = '';
        const successMessage = 'Product was deleted'
        try {
            productsService.deleteProduct(product!.id)
            productDeleteClose()
        } catch (error: any) {
            errorMessage = error.message
        }
        console.log(successMessage, errorMessage);
        //TODO
        dispatchCode(successMessage, errorMessage)
    }

    return <Box>

        <ProductsTable openEdit={openEdit} openDelete={openDelete}></ProductsTable>

        <Dialog
            open={productChangeDialog}
            keepMounted
            onClose={productChangeClose}
        >
            <DialogTitle>{product ? "Product" : "Add new product"}</DialogTitle>
            <DialogContent>
                <ProductForm product={product ? product : undefined} submitFn={product ? updateFn : addFn}></ProductForm>
            </DialogContent>
        </Dialog>

        <Dialog open={productDeleteDialog} onClose={productDeleteClose} fullWidth maxWidth={"xs"}>
            <DialogTitle>Delete product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you want to delete product {product?.id}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={productDeleteClose}>
                    Close
                </Button>
                <Button onClick={deleteFn} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>

        <Fab color="primary"
            aria-label="add"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
            onClick={productChangeOpen}
        >
            <AddIcon />
        </Fab>

    </Box>
}

export default Products