import "./Styles/Checkout.css";
import {Box, Button, Grid2, Stack, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import * as Yup from "yup";
import {useFormik} from "formik";
import CheckoutError from "../CheckoutError/CheckoutError.jsx";
import {useEffect, useState} from "react";


const phoneNumberRegex = /^380\d{9}$|^\+?38\(0\d{2}\)\d{3}-\d{2}-\d{2}$|^\+?38\(0\d{2}\)\d{7}$|^\+?380\d{9}$/gi
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name can't be shorter than 2 symbols")
        .required("Name is required"),
    surname: Yup.string()
        .min(2, "Surname can't be shorter than 2 symbols")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phone: Yup.string()
        .matches(phoneNumberRegex, "Phone number is invalid. Valid formats +380XXXXXXXXX, 380XXXXXXXXX, +38(0XX)XXX-XX-XX, 38(0XX)XXXXXXX")
        .required("Phone is required"),
    address: Yup.string()
        .min(2, "Your address must be 10 symbols or more")
        .max(150, "Too long address")
        .required("Address is required"),
})


function NothingToCheckout() {
    let navigate = useNavigate();

    return (
        <Box component='section' className="Checkout" minHeight="100vh" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" gap="25px">
            <NotFoundPage>
                <Typography textAlign="center" component="p" variant="body1">Cart is empty! Nothing to checkout. Go back
                    to catalog</Typography>
                <br/>
                <Button variant="outlined" onClick={() => navigate("/catalog")}>
                    Back to catalog
                </Button>
            </NotFoundPage>
        </Box>
    )
}


function Checkout() {
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();
    let [errorVisible, setErrorVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            navigate("/success")
        },
    });

    useEffect(() => {
        let x;
        if (formik.isSubmitting && !formik.isValid) {
            setErrorVisible(true)
            x = setTimeout(() => {
                console.log("TIMEOUT")
                setErrorVisible(false)
                clearTimeout(x)
            }, 5000)
        }
    }, [formik.isSubmitting, formik.isValid]);


    if (cart.length === 0) {
        return <NothingToCheckout/>
    }

    return (
        <Box component='section' className="Checkout" minHeight="100vh" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" gap="50px" width="100%">
            <Typography component="h2" variant="h2" textAlign="center">Checkout</Typography>
            <Box component="form" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start"
                 gap="25px" onSubmit={formik.handleSubmit} width="100%">
                <Grid2 width="100%" container spacing={2} columns={{
                    md: 2,
                    xs: 1
                }}>
                    <Grid2 size={2}>
                        {
                            errorVisible && <CheckoutError />
                        }
                    </Grid2>
                    <Grid2 size={1}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid2>
                    <Grid2 size={1}>
                        <TextField
                            fullWidth
                            id="surname"
                            name="surname"
                            label="Surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.surname && Boolean(formik.errors.surname)}
                            helperText={formik.touched.surname && formik.errors.surname}
                        />
                    </Grid2>
                    <Grid2 size={1}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid2>
                    <Grid2 size={1}>
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid2>
                </Grid2>
                <Stack width="100%" direction={{xs: "column", md: "row"}} justifyContent="space-between" spacing={3}>
                    <Button type="button" onClick={() => history.back()} color="primary" variant="outlined" fullWidth>
                        Go back
                    </Button>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Continue
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}


export default Checkout;