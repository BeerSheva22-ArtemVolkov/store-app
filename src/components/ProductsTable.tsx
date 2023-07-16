import { Delete } from "@mui/icons-material";
import { Box } from "@mui/material";
import { GridColDef, GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import { useSelectorProducts } from "../hooks/hooks";
import ProductType from "../model/ProductType";
import EditIcon from '@mui/icons-material/Edit';

type productsTableprops = {
    openEdit(productID: string): void
    openDelete(productID: string): void
}

const ProductsTable: React.FC<productsTableprops> = ({ openEdit, openDelete }) => {
    const products: ProductType[] = useSelectorProducts();

    const columnsAdmin: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'name', headerName: 'Name', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'price', headerName: 'Price', flex: 0.3, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'quantity', headerName: 'Quantity', flex: 0.3, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'description', headerName: 'Description', flex: 0.7, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'image', headerName: 'Image path', flex: 0.7, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'actions', type: "actions", flex: 0.7, getActions: (params) => {
                const row: ProductType = params.row
                //     const disableButton: boolean = row.status == "Deleted" || row.status == "Done"
                return [
                    <GridActionsCellItem label="edit" icon={<EditIcon />} onClick={openEdit.bind(undefined, row.id)} />,
                    <GridActionsCellItem label="remove" icon={<Delete />} onClick={openDelete.bind(undefined, row.id)}/>,
                ];
            }
        }
    ]

    return (
        <Box>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                {/* TODO */}
                <DataGrid columns={columnsAdmin} rows={products} getRowId={row => row.id} />
            </Box>
        </Box>
    )
}

export default ProductsTable