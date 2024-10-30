import "./Styles/PreviewPage.css"
import {Box, Button, Typography} from "@mui/material";

function PreviewPage() {
    return (
        <Box maxWidth="xl" component="section" className="PreviewPage">
            <Box component="div" className="PreviewPage__content">
                <Typography textTransform="uppercase" component="h1" variant="h1">
                    <Typography component="span" variant="h1" fontWeight="800">
                        Best cars
                    </Typography> on <br/> the wild west!
                </Typography>
                <Typography component="p" variant="subtitle1">
                    Buy one of best cars in one click!
                </Typography>
                <Button variant="contained" color="primary">
                    Catalog
                </Button>
            </Box>
        </Box>
    )
}

export default PreviewPage;