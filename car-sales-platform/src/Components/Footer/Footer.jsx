import "./Styles/Footer.scss";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
    return (
        <Box component="footer" className="Footer">
            <Typography variant="body2" component="p" marginBottom="10px">
                © 2024 Car Sales Platform. All rights reserved.
            </Typography>
            <Box className="Footer__links">
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/catalog" color="inherit" underline="hover">Catalog</Link>
                <Link href="/about" color="inherit" underline="hover">About Us</Link>
                <Link href="/contact" color="inherit" underline="hover">Contact</Link>
            </Box>
        </Box>
    );
}

export default Footer;
