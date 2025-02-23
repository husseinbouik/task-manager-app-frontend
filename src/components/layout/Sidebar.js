import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Box,
    Typography,
    IconButton,
    Divider,
    Tooltip,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import authService from '../../services/authService';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const DrawerComponent = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SidebarComponent() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [userName, setUserName] = React.useState('');
    const userAvatar = null;

    React.useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await authService.getUserInfo(token);
                setUserName(response.data.user.name);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                setUserName('Guest User');
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDashboard = () => {
        navigate('/');
    };

    const handleAddTask = () => {
        navigate('/add-task');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerComponent variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {userAvatar ? (
                        <Avatar alt={userName} src={userAvatar} sx={{ width: 50, height: 50, mb: 1 }} />
                    ) : (
                        <Avatar sx={{ width: 50, height: 50, mb: 1 }}>
                            <AccountCircle />
                        </Avatar>
                    )}
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                        {userName}
                    </Typography>
                </Box>
                <List>
                    <Tooltip title="Dashboard" placement="right">
                        <ListItem button key="Dashboard" onClick={handleDashboard} sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Add Task" placement="right">
                        <ListItem button key="Add Task" onClick={handleAddTask} sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}>
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Task" />
                        </ListItem>
                    </Tooltip>
                </List>
                <Divider />
                <List>
                    <Tooltip title="Logout" placement="right">
                        <ListItem button key="Logout" onClick={handleLogout} sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Tooltip>
                </List>
            </DrawerComponent>
        </Box>
    );
}

export default SidebarComponent;