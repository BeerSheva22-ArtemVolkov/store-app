import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignOut: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.reset())
        navigate('/')
    }, [])

    return <></>
}

export default SignOut;