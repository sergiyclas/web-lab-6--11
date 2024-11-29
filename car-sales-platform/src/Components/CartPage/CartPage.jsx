import "./Styles/CartPage.css"
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CartItem from "../CartItem/CartItem.jsx";
import {ShoppingCartRounded} from "@mui/icons-material";

function CartPage() {
    let navigate = useNavigate();

    let cart = useSelector(state => state.cart);

    return (
        <Box minHeight="100vh" className="Car" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" gap="25px">
            <Typography component="h2" variant="h2">Shopping cart</Typography>
            {
                cart.length > 0 ? <>
                    <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="25px">
                        {
                            cart.map((item) =>
                                <CartItem key={`cart-item-${item._id}`} {...{...item}} />
                            )
                        }
                    </Box>
                    <Typography width="100%" variant="h4" textAlign="right">
                        Total price: {cart.reduce((acc, item) => acc + (item.count * item.price.value), 0)} $
                    </Typography>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap="25px">
                        <Button variant="outlined" onClick={() => navigate("/catalog")}>
                            Back to catalog
                        </Button>
                        <Button disabled={cart.length === 0} onClick={() => navigate("/checkout")} variant="contained">
                            Continue
                        </Button>
                    </Box>
                </> : <Typography component="h3" variant="h3">
                    <ShoppingCartRounded /> Cart is empty
                </Typography>
            }
        </Box>
    )
}

export default CartPage;