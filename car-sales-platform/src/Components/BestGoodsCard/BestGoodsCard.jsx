import "./Styles/BestGoodsCard.scss"

import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";

import generateCardGradient from "../../utils/generateRandomGradient.js";

function BestGoodsCard({imageURL, id, name, backgroundColor}) {
    return (
        <Card sx={{
            maxWidth: 345,
            background: generateCardGradient(backgroundColor),
            boxShadow: "0 20px 15px -10px #17171740",
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="220"
                    image={imageURL}
                    alt="green iguana"
                    sx={{
                        objectFit: "contain", objectPosition: "center", margin: "45px 0",
                    }}
                    className={"BestGoodsCard__image"}
                />
                <CardContent>
                    <Typography color="#FFFFFF" gutterBottom variant="h5" component="div" textAlign="center">
                        {name}
                    </Typography>
                    <Typography marginBlockEnd="20px" color="#FFFFFFAA" noWrap variant="body2" textAlign="center">
                        {id}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

BestGoodsCard.propTypes = {
    imageURL: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
}

export default BestGoodsCard;