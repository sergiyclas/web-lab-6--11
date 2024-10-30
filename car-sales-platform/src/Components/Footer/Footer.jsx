import "./Styles/Footer.css"
import {Box, Grid2, Typography, Link} from "@mui/material";

import logo from "../../assets/SVG/logoDark.svg"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <Box width="100%" component="footer" className="Footer"
             padding={{
                 xs: "25px",
                 md: "25px 125px"
             }}
             display="flex" flexDirection="column" gap="50px" alignItems="center" justifyContent="space-between"
        >
            <Grid2 container width="100%" className="Footer__credentials" alignContent="stretch" justifyContent="space-between"
                   columns={{
                       xs: 1,
                       md: 3
                   }}
                   spacing={1}
            >
                <Grid2 size={1}>
                    <Typography component="h2" variant="h2">
                        Branding stuff
                    </Typography>
                    <Typography component="p" variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti error, est laboriosam magnam minus nisi.
                    </Typography>
                </Grid2>
                <Grid2 size={1} display="flex" alignContent={{
                    xs: "flex-start",
                    md: "center"
                }} justifyContent={{
                    xs: "flex-start",
                    md: "center"
                }}>
                    <img src={logo} alt="logo" height="50" width="50" className="Footer__logo"/>
                </Grid2>
                <Grid2 size={1} display="flex" alignContent="center" justifyContent={{
                    xs: "flex-start",
                    md: "flex-end"
                }}>
                    <Link href="#">
                        <InstagramIcon fontSize="large" color="info" />
                    </Link>
                    <Link href="#">
                        <FacebookIcon fontSize="large" color="info" />
                    </Link>
                    <Link href="#">
                        <TwitterIcon fontSize="large" color="info" />
                    </Link>
                    <Link href="#">
                        <LinkedInIcon fontSize="large" color="info" />
                    </Link>
                </Grid2>
            </Grid2>
            <Box display="flex" alignItems="center" justifyContent="center" className="Footer__copy">
                <Typography component="p" variant="body2">
                    {new Date().getFullYear()} &copy; Copyright all rights reserved
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer