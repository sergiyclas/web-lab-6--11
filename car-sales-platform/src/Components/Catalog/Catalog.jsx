import "./Styles/Catalog.css"

import {useEffect, useState} from "react";
import getCatalogItems from "../../lib/getCatalogItems.js";

import CatalogData from "../CatalogData/CatalogData.jsx";
import {Box, Button, Grid2, Slider, TextField, Typography} from "@mui/material";
import {FilterAlt} from "@mui/icons-material";
import {Route, Routes} from "react-router-dom";

import Car from "../Car/Car.jsx";
// import mustang from "../BestGoods/Images/mustang_wiki.jpg";
// import camaro from "../BestGoods/Images/camaro.jpg";
// import charger from "../BestGoods/Images/charger.jpg";
// { desc: "Super puper car", name: "Ford Mustang", image_url: mustang, backgroundColor: '#7C5840'},
// { desc: "Really good car", name: "Chevrolet Camaro", image_url: camaro, backgroundColor: '#7C5840' },
// { desc: "Recommend it, nice car", name: "Dodge Charger", image_url: charger, backgroundColor: '#7C5840' }



function Catalog() {
    let [page, setPage] = useState(1);
    let [filterValue, setFilterValue] = useState({
        name: "",
        priceRange: [0, 100],
        speedRange: [0, 10]
    });
    let [filter, setFilter] = useState({})
    let [data, setData] = useState([]);
    let [error, setError] = useState(null);
    let [pending, setPending] = useState(false);
    let [totalPages, setTotalPages] = useState(0);
    let [maxPrice, setMaxPrice] = useState(0);
    let [maxSpeed, setMaxSpeed] = useState(0);

    useEffect(() => {
        setPending(true);
        getCatalogItems(filter, page)
            .then(data => {
                console.log(data)
                switch (data.status) {
                    case 200:
                        setTotalPages(data.data.totalPages)
                        setData(data.data.body)
                        setMaxPrice(data.data.maxPrice)
                        setMaxSpeed(data.data.maxSpeed)
                        break;
                    default:
                        setError({
                            header: "Server error",
                            message: data.data.message
                        })
                        break;
                }
            })
            .catch(e => {
                setError({
                    header: "Service error",
                    message: String(e)
                })
            })
            .finally(() => {
                setPending(false);
            })
    }, [page, filter]);

    let handlePriceEnter = (e, value) => {
        setFilterValue({...filterValue, priceRange: value})
    }

    let handleSpeedEnter = (e, value) => {
        setFilterValue({...filterValue, speedRange: value})
    }

    let applyFilters = () => {
        console.log(filterValue)
        setFilter({
            ...filter,
            ...filterValue
        })
    }

    return (
        <Box component="section" className="Catalog" minHeight="100vh" padding={{
            xs: "100px 25px 25px 25px",
            md: "100px 150px 25px 150px"
        }}>
            <Grid2 width="100%" container columns={{xs: 1, md: 4}} spacing={4}>
                <Grid2 size={1}>
                    <TextField value={filterValue.name}
                               onChange={(e) => setFilterValue({...filterValue, name: e.target.value})}
                               disabled={pending}
                               fullWidth
                               label="Name"
                               variant="outlined"/>
                </Grid2>
                <Grid2 size={1} display="flex" justifyContent="center" flexDirection="column">
                    <Typography component="p" variant="body2">Price ($)</Typography>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={filterValue.priceRange}
                        onChange={handlePriceEnter}
                        valueLabelDisplay="auto"
                        max={maxPrice}
                        disabled={pending}
                        disableSwap
                    />
                </Grid2>
                <Grid2 size={1} display="flex" justifyContent="center" flexDirection="column">
                    <Typography component="p" variant="body2">Speed (m/h)</Typography>
                    <Slider
                        getAriaLabel={() => 'Speed range'}
                        value={filterValue.speedRange}
                        onChange={handleSpeedEnter}
                        valueLabelDisplay="auto"
                        max={maxSpeed}
                        disabled={pending}
                        step={0.5}
                        disableSwap
                    />
                </Grid2>
                <Grid2 size={1}>
                    <Button fullWidth sx={{height: "100%"}} variant="contained"
                            startIcon={<FilterAlt/>}
                            disabled={pending}
                            onClick={applyFilters}
                    >
                        Apply
                    </Button>
                </Grid2>
            </Grid2>
            <CatalogData data={data} totalPages={totalPages}
                         error={error} pending={pending}
                         page={page} setPage={setPage}/>
        </Box>
    )
}

export default function CatalogRouter() {
    return (
        <Routes>
            <Route path="/" element={<Catalog/>}/>
            <Route path="/:id" element={<Car/>}/>
        </Routes>
    )
}
