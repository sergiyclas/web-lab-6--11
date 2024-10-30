import "./Styles/BestGoods.scss"

import {Box, Grid2} from "@mui/material";
import BestGoodsCard from "../BestGoodsCard/BestGoodsCard.jsx";
import mustang from "./Images/mustang_wiki.jpg";
import camaro from "./Images/camaro.jpg";
import charger from "./Images/charger.jpg";

const cars = [
    { id: 1, name: "Ford Mustang", image_url: mustang, backgroundColor: '#7C5840'},
    { id: 2, name: "Chevrolet Camaro", image_url: camaro, backgroundColor: '#7C5840' },
    { id: 3, name: "Dodge Charger", image_url: charger, backgroundColor: '#7C5840' }
];

function BestGoods() {
    return (
        <Box component="section" className="BestGoods"
             // padding={{xs: "100px", md: "25px 125px"}}
            paddingLeft={50}
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center"
             // gap="200px"
        >
            <Grid2 container className="BestGoods__cards" columns={{xs: 1, sm: 2, lg: 4}} alignContent="center" spacing="35px">
                {
                    cars.map((item, index) =>
                        <Grid2 key={`car-container-${index}`} size={1} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <BestGoodsCard imageURL={item.image_url}
                                           id={item.id}
                                           name={item.name}
                                           backgroundColor={item.backgroundColor}
                            />
                        </Grid2>
                    )
                }
            </Grid2>
        </Box>
    )
}

export default BestGoods