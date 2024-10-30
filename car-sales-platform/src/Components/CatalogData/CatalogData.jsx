import "./Styles/CatalogData.css";
import {Button, CircularProgress, Grid2, Pagination, Typography} from "@mui/material";
import CardWithImage from "../UI/CardWithImage/CardWithImage.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import {useNavigate} from "react-router-dom";

function CatalogData({pending, error, data, totalPages, page, setPage}) {
    let navigate = useNavigate();

    if (pending) {
        return <CircularProgress size={100}/>
    }

    if (error?.message) {
        return <>
            <h2>{error?.header}</h2>
            <p>{error?.message}</p>
        </>
    }

    if (data.length === 0) {
        return <NotFoundPage>No content here yet. Turn back later</NotFoundPage>
    }

    return <>
        <Grid2 container className="CatalogData" columns={{
            xs: 1, sm: 2, lg: 3, xl: 4
        }} spacing={4} sx={{width: "100%"}}>
            {
                data.map((item) =>
                    <Grid2 key={`catalog-item-container-${item._id}`} size={1}
                           className="Catalog__card-container">
                        <CardWithImage
                            imageURL={`${import.meta.env.VITE_SERVER_LINK}${item.imageLink}`}
                            caption={item.description}
                            backgroundColor={item.cardColor}
                            name={item.name}
                        >
                            <Grid2 container columns={1} spacing={2}>
                                <Grid2 size={1}>
                                    <Typography variant="body1" color="#FFFFFF">
                                        <Typography component="b" variant="body1"
                                                    fontWeight="800">Price:</Typography> {item.price.value} {item.price.currency}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={1}>
                                    <Button onClick={()=>navigate(`/catalog/${item._id}`)} fullWidth sx={{height: "100%"}} variant="contained">
                                        Details
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </CardWithImage>
                    </Grid2>
                )
            }
        </Grid2>
        <Pagination count={totalPages} color="primary" variant="outlined"
                    page={page} onChange={(e, value) => setPage(value)}/>
    </>
}

export default CatalogData