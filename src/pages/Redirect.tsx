import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import UserDataType from "../model/UserDataType"
import { authService } from "../config/service-config"
import { authActions } from "../redux/slices/authSlice"

const Redirect: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function setUserData(email: string, link: string) {
        const res: UserDataType | string = await authService.loginByLink(email, link);
        typeof res == 'object' && dispatch(authActions.set(res));
    }

    useEffect(() => {
        const url_string = window.location.toString();
        const url = new URL(url_string);
        const email = url.searchParams.get("email");
        console.log(email);
        if (email) {
            setUserData(email, url_string)
        }
        navigate('/')
    }, [])

    return <>aaa</>
}

export default Redirect