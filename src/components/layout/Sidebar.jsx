import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SidebarListItem from './SidebarListItem';

import useAuth from '../../hooks/useAuth';

export default function Sidebar() {
    const { logout, isLoggedIn } = useAuth();
    return (
        <>
            <List>
                <SidebarListItem text="Dashboard" navigationRoute="/dashboard">
                    <DashboardIcon />
                </SidebarListItem>
                <SidebarListItem text="Items" navigationRoute="/items">
                    <CategoryIcon />
                </SidebarListItem>
                <SidebarListItem text="Parties" navigationRoute="/parties">
                    <GroupAddIcon />
                </SidebarListItem>
                <SidebarListItem text="Sales" navigationRoute="/sales">
                    <MonetizationOnIcon />
                </SidebarListItem>
                {isLoggedIn && (
                    <>
                        <Divider />
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                )
                }
            </List>

        </>
    )
}
