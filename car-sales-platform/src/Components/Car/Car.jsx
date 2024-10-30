import "./Styles/Car.css"

import {useNavigate, useParams} from "react-router-dom";
import getCarById from "../../lib/getItemById.js";

import {
    Box,
    Button,
    ButtonGroup,
    Chip,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid2,
    InputLabel,
    MenuItem,
    Select, TextField,
    Typography
} from "@mui/material";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import {useEffect, useState} from "react";
import {ArrowBackIosNew, ShoppingCart} from "@mui/icons-material";

function Car() {
    let {id} = useParams();
    if (!id) return (<NotFoundPage>This page does not exist</NotFoundPage>)

    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [error, setError] = useState(null);
    let [pending, setPending] = useState(true);
    let [countOfGoods, setCountOfGoods] = useState(1);

    useEffect(() => {
        setPending(true);
        getCarById(id)
            .then(({data}) => {
                console.log(data)
                switch (data.status) {
                    case 200:
                        setData(data.body)
                        break;
                    default:
                        setError({
                            header: "Server error",
                            message: data.message
                        })
                        break;
                }
            })
            .catch(e => {
                setError({
                    header: "Service error",
                    message: String(e)
                })
                console.error(e)
            })
            .finally(() => {
                setPending(false);
            })
    }, []);

    if (pending) {
        return (
            <Box minHeight="100vh" className="Car" padding={{
                xs: "100px 25px 25px 25px",
                md: "100px 150px 25px 150px"
            }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <CircularProgress size={100}/>
            </Box>
        )
    }

    if (error?.message) {
        return <Box minHeight="100vh" className="Car" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <h2>{error?.header}</h2>
            <p>{error?.message}</p>
        </Box>
    }

    return (
        <Box minHeight="100vh" className="Car" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="25px">
            <Grid2 container width="100%" columns={{
                xs: 1, md: 10
            }}>
                <Grid2 size={{xs: 1, md: 4}} display="flex" alignItems="center" justifyContent="center">
                    <img height={300} src={`${import.meta.env.VITE_SERVER_LINK}${data.imageLink}`} alt=""
                         className="Car__image"/>
                </Grid2>
                <Grid2 size={{xs: 1, md: 6}} padding="25px 5px"
                       display="flex" gap={"25px"} flexDirection="column">
                    <Box component="div" display="flex" alignItems="center" gap="15px">
                        <Chip label={`${data.weightInGram} gr`} color="success"/>
                        <Chip label={`${data.speedInMetersPerHour} m/h`} color="primary"/>
                    </Box>
                    <Box component="div">
                        <Typography component="h2" variant="h2">{data.name}</Typography>
                        <Typography component="p" variant="body1">{data.description}</Typography>
                    </Box>
                    <Box>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel>Count</InputLabel>
                            <Select
                                value={countOfGoods}
                                label="Count"
                                variant="outlined"
                                onChange={(e) => setCountOfGoods(e.target.value)}
                            >
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8].map(item =>
                                        <MenuItem value={item}
                                                  key={`option-${item}`}>
                                            {item}</MenuItem>
                                    )
                                }
                            </Select>
                            <FormHelperText>Enter count of goods to buy</FormHelperText>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <TextField label="Comment" variant="outlined" />
                            <FormHelperText>Enter comment</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid2>
            </Grid2>
            <Box component="div" display="flex" alignItems="center" justifyContent="space-between" gap="25px"
                 width="100%">
                <Typography component="p" variant="body1">
                    <Typography component="b" variant="body1"
                                fontWeight="bold">Price:</Typography> {countOfGoods > 1 && `${data.price.value} x ${countOfGoods} = `} {data.price.value * countOfGoods}{data.price.currency}
                </Typography>
                <ButtonGroup variant="contained" aria-label="actions">
                    <Button startIcon={<ShoppingCart/>}>Add to cart</Button>
                    <Button startIcon={<ArrowBackIosNew/>} variant="outlined" onClick={() => navigate("/catalog")}>Go
                        back</Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default Car;