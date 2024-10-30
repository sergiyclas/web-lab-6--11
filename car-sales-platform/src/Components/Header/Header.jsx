import "./Styles/Header.scss";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// import whiteLogo from "../../assets/SVG/logoWhite.svg";
import cartIcon from "./SVG/car.svg";

function Header() {
    const go = useNavigate();

    return (
        <Box
            component="header"
            className="Header"
            height="75px"
            width="50%"
            paddingLeft={50}
            // padding={{
            //     // xs: "10px 25px",
            //     // md: "10px 125px"
            // }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            top="0"
            left="0"
        >
            <img height={35} width={35} src={cartIcon} alt="Logo" className="Header__logo" />
            <Box component="nav" className="Header__nav" columnGap="25px" display="flex" alignItems="center">
                <Link to="/">
                    <Typography underline="none" color="#ffffff" fontFamily="Roboto" variant="inherit">
                        Home
                    </Typography>
                </Link>
                <Link to="/">
                    <Typography underline="none" color="#ffffff" fontFamily="Roboto" variant="inherit">
                        Catalog
                    </Typography>
                </Link>
            </Box>
                {/*<Box component="div" className="Header__nav" columnGap="5px" display="flex" alignItems="center">*/}
                {/*    <Button*/}
                {/*        startIcon={<img height={25} width={25} className="Header__cart-img" src={cartIcon} alt="cart" />}*/}
                {/*        className="Header__cart-btn"*/}
                {/*        variant="text"*/}
                {/*        onClick={() => go("/cart")}*/}
                {/*    >*/}
                {/*        My cart*/}
                {/*    </Button>*/}
                {/*</Box>*/}
        </Box>
    );
}

export default Header;
