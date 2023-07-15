import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelectorCart } from "../redux/store";
import { usersService } from "../config/service-config";

const Home: React.FC = () => {
    const dispatch = useDispatch<any>()
    const cart = useSelectorCart()

    console.log(cart);
    
    return (
        <div>
            <div>
                <label>{cart.length}</label>
            </div>
            <div>
                <button onClick={() => dispatch(cartActions.incrementQuantity({id: 1, quantity: 1, name: 'Book'}))}>+</button>
                <button onClick={() => dispatch(cartActions.decrementQuantity({id: 1, quantity: 1, name: 'Book'}))}>-</button>
                <button onClick={() => dispatch(cartActions.addToCart({id: 1, quantity: 1, name: 'Book'}))}>add</button>
                <button onClick={() => dispatch(cartActions.removeFromCart({id: 1, quantity: 1, name: 'Book'}))}>remove</button>
                <button onClick={() => dispatch(cartActions.clearCart())}>clear</button>
                {/* <button onClick={() => usersService.getUser('68T3sYQPk8M8ncRk48XE6lZZIxS2')}>test</button> */}
            </div>
        </div>
    );
}

export default Home