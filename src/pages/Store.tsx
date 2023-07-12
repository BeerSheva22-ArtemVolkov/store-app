import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";


const Store: React.FC = () => {

    const theme = useTheme()

    return (
        <Box sx={{ height: '80vh', width: '95vw' }}>
            <DataGrid columns={[]} rows={[]} />
        </Box>
    )
}

export default Store