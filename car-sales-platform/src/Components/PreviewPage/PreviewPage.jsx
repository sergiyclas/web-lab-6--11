import "./Styles/PreviewPage.scss";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PreviewPage() {
    const navigate = useNavigate();

    return (
        <Box maxWidth="xl" component="section" className="PreviewPage">
            <Box component="div" className="PreviewPage__content">
                <Typography textTransform="uppercase" component="h1" variant="h2">
                    <Typography component="span" variant="h2" fontWeight="800">
                        Best cars
                    </Typography>{" "}
                    in the market!
                </Typography>
                <Typography component="p" variant="body1">
                    Explore our exclusive collection of premium cars!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => navigate("/catalog")}
                >
                    View Catalog
                </Button>
            </Box>
        </Box>
    );
}

export default PreviewPage;
