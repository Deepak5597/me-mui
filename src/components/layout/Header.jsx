import { useState, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

import ProfilePic from '../../images/pp.png';
import useAuth from '../../hooks/useAuth';
import useConfig from '../../hooks/useConfig';

const drawerWidth = 240;
export default function Header({ position, open, handleDrawerOpen }) {
    const { user, isLoggedIn, logout } = useAuth();
    const { defaultUser, defaultRole } = useConfig();
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        setLoginStatus(isLoggedIn);
    }, [isLoggedIn])

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position={position} open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: "medium" }}>
                    Mahajan Electricals
                </Typography>
                {
                    loginStatus && (
                        <Box sx={{ display: "flex", gap: 2, flexGrow: 0, flexDirection: "row" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>

                                <Typography variant="span" noWrap component="span" sx={{ fontSize: "small" }}>
                                    {user?.name ? user.name : defaultUser}
                                </Typography>
                                <Typography variant="span" noWrap component="span" sx={{ fontSize: "small" }}>
                                    {user?.role ? user.role : defaultRole}
                                </Typography>
                            </Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Profile Pic" src={ProfilePic} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '40px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={() => { handleCloseUserMenu(); logout() }}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )
                }
            </Toolbar>
        </AppBar >
    );
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));