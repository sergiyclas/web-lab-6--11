import {Box, Button, Typography} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function Success() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/catalog")
        } else {
            dispatch({
                type: "cart/clean"
            })
        }
    }, []);

    return (
        <Box component="section" className="Success"  minHeight="100vh" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" gap="25px" width="100%">
            <TaskAltIcon sx={{fontSize: "200px"}} color="success"/>
            <Typography component="h2" variant="h2">Success!</Typography>
            <Typography component="p" variant="body1" textAlign="center">
                Your order was sent to proceeding. <br/>
                Check your email box for further information.
            </Typography>
            <Button onClick={() => navigate("/catalog")} variant="contained">
                Go to catalog
            </Button>
        </Box>
    )
}


export default Success;