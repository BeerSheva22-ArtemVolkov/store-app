import { Delete } from "@mui/icons-material";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { GridColDef, GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import { useSelectorProducts } from "../hooks/hooks";
import ProductType from "../model/ProductType";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useMemo } from "react";

type productsTableprops = {
    openEdit(productID: string): void
    openDelete(productID: string): void
}

const ProductsTable: React.FC<productsTableprops> = ({ openEdit, openDelete }) => {

    const products: ProductType[] = useSelectorProducts();
    const theme = useTheme();
    const isSM = useMediaQuery(theme.breakpoints.down('sm'));
    const isMD = useMediaQuery(theme.breakpoints.down('md'));
    const isLG = useMediaQuery(theme.breakpoints.down('lg'));

    const startColumns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'name', headerName: 'Name', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const smColumns: GridColDef[] = [
        {
            field: 'price', headerName: 'Price', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'quantity', headerName: 'Quantity', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const mdColumns: GridColDef[] = [
        {
            field: 'image', headerName: 'Image', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'left', renderCell: (params) => <img src={params.value.url} height='50px'></img>
        }
    ]

    const lgColumns: GridColDef[] = [
        {
            field: 'description', headerName: 'Description', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const actionsColumns: GridColDef[] = [
        {
            field: 'actions', type: "actions", flex: 0.2, getActions: (params) => {
                const row: ProductType = params.row
                //     const disableButton: boolean = row.status == "Deleted" || row.status == "Done"
                return [
                    // <GridActionsCellItem label="details" icon={<InfoIcon />} onClick={openInfo.bind(undefined, row.id)} />,
                    <GridActionsCellItem label="edit" icon={<InfoIcon />} onClick={openEdit.bind(undefined, row.id)} />,
                    <GridActionsCellItem label="remove" icon={<Delete />} onClick={openDelete.bind(undefined, row.id)} />,
                ];
            }
        }
    ]

    function getColumns(): GridColDef[] {
        let res: GridColDef[] = startColumns;
        if (!isSM) {
            res = res.concat(smColumns);
        }
        if (!isMD) {
            res = res.concat(mdColumns);
        }
        if (!isLG) {
            res = res.concat(lgColumns);
        }

        res = res.concat(actionsColumns);
        return res;
    }

    const columns = useMemo(() => getColumns(), [products, isSM, isMD, isLG]);

    return (
        <Box>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                {/* TODO */}
                <DataGrid columns={columns} rows={products} getRowId={row => row.id} />
            </Box>
        </Box>
    )
}

export default ProductsTable