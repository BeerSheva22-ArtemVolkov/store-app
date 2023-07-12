import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

const Home: React.FC = () => {
    const dispatch = useDispatch<any>()
    const cartSize = useSelector<any, number>(state => state.cartState.cartSize)

    return (
        <div>
            <div>
                <label>{cartSize}</label>
            </div>
            <div>
                <button onClick={() => dispatch(cartActions.addToCart())}>add</button>
                <button onClick={() => dispatch(cartActions.removeFromCart())}>remove</button>
                <button onClick={() => dispatch(cartActions.clearCart())}>clear</button>
            </div>
        </div>
    );
}

export default Home