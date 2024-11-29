import "./Styles/Header.css";
import { Badge, Box, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import whiteLogo from "../../assets/SVG/logoWhite.svg";
import darkLogo from "../../assets/SVG/logoDark.svg";
import { ShoppingCart } from "@mui/icons-material";
import { useMemo, useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_CART} from "../../features/cart/cartReducer.js";

function Header() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser.id && parsedUser.email) {
                        setUser(parsedUser);
                    } else {
                        setUser(null);
                    }
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const count = useMemo(
        () => cart.reduce((acc, current) => acc + current.count, 0),
        [cart]
    );

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const textColor = useMemo(() => (isHomePage ? "#FFFFFF" : "#171717"), [isHomePage]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        dispatch({ type: CLEAR_CART });
        navigate("/login");
    };

    return (
        <Box
            component="header"
            className="Header"
            height="75px"
            width="100%"
            padding={{ xs: "10px 25px", md: "10px 125px" }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            top="0"
            left="0"
        >
            <img
                height={35}
                width={35}
                src={textColor === "#FFFFFF" ? whiteLogo : darkLogo}
                alt="Logo"
                className="Header__logo"
            />

            <Box
                component="nav"
                className="Header__nav"
                columnGap="25px"
                display="flex"
                alignItems="center"
            >
                <Link to="/">
                    <Typography underline="none" color={textColor} fontFamily="Roboto" variant="body1">
                        Home
                    </Typography>
                </Link>
                <Link to="/catalog">
                    <Typography underline="none" color={textColor} fontFamily="Roboto" variant="body1">
                        Catalog
                    </Typography>
                </Link>
            </Box>

            <Box
                component="div"
                className="Header__actions"
                columnGap="15px"
                display="flex"
                alignItems="center"
            >
                <Badge
                    color="primary"
                    badgeContent={count}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <Button
                        startIcon={<ShoppingCart color={textColor} />}
                        className="Header__cart-btn"
                        variant="text"
                        onClick={() => navigate("/cart")}
                        sx={{ color: textColor }}
                    >
                        My cart
                    </Button>
                </Badge>

                {user ? (
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ color: textColor }}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => navigate("/login")}
                            sx={{ color: textColor }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Header;
