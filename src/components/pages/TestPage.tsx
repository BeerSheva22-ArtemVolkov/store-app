import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

type pageProps = {
    name: string
}

const TestPage: React.FC<pageProps> = ({ name }) => {
    return <>
        <Typography>{name}</Typography>
        <Outlet></Outlet>
    </>
}

export default TestPage;