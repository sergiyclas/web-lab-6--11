import "./Styles/CardWithImage.css"

import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";

import generateCardGradient from "../../../utils/generateRandomGradient.js";

function CardWithImage({imageURL, caption, name, backgroundColor="#ffffff", children}) {
    return (
        <Card sx={{
            maxWidth: 345,
            width: "100%",
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
                    className={"CardWithImage__image"}
                />
                <CardContent>
                    <Typography color="#FFFFFF" gutterBottom variant="h4" component="div" textAlign="center">
                        {name}
                    </Typography>
                    <Typography marginBlockEnd="20px" color="#FFFFFFAA" noWrap variant="body2" textAlign="center">
                        {caption}
                    </Typography>
                    {children || ""}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

CardWithImage.propTypes = {
    imageURL: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
}

export default CardWithImage;