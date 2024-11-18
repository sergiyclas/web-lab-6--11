import "./Styles/CartItem.css"
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {DeleteRounded} from "@mui/icons-material";

function CartItem({_id, name, count, imageLink, price}) {
    let dispatch = useDispatch();

    let handleIncrementClick = () => {
        dispatch({
            type: "cart/incrementItem",
            payload: {
                _id: _id
            }
        })
    }

    let handleDecrementClick = () => {
        dispatch({
            type: "cart/decrementItem",
            payload: {
                _id: _id
            }
        })
    }

    let handleCountInput = (e) => {
        dispatch({
            type: "cart/setCount",
            payload: {
                _id: _id,
                count: Number(e.target.value.replaceAll(/\D/gi, ""))
            }
        })
    }

    let handleDeleteClick = () => {
        dispatch({
            type: "cart/deleteItem",
            payload: {
                _id: _id
            }
        })
    }


    return (
        <Box className="CartItem" width="100%" display="flex" flexDirection="row" alignItems="center"
             justifyContent="space-between" gap="25px" border="1px solid #CECECE" borderRadius="5px" padding={"15px"}>
            <Box display="flex" flexDirection="row" alignItems="center" gap="25px">
                <img src={`${import.meta.env.VITE_SERVER_LINK}${imageLink}`} height={50} width={50} alt={name}
                     className="CartItem__image"/>
                <Typography component="h5" variant="h6" color="info">{name}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" gap="25px">
                <Box display="flex" flexDirection="row" alignItems="center" gap="25px">
                    <Button onClick={handleDecrementClick} variant="outlined">
                        -
                    </Button>
                    <TextField onInput={handleCountInput} size="small" className="CartItem__input" variant="outlined"
                               color="primary" value={count}/>
                    <Button onClick={handleIncrementClick} variant="outlined">
                        +
                    </Button>
                </Box>
                <Typography width={"150px"} component="span" textAlign="right" variant="body2" fontWeight="bold">
                    {price.value * count} {price.currency}
                </Typography>
                <IconButton color="error" onClick={handleDeleteClick}>
                    <DeleteRounded/>
                </IconButton>
            </Box>
        </Box>
    )
}

export default CartItem;