import { useLocation, useNavigate } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function SidebarListItem(props) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.navigationRoute, { replace: false })
    }

    return (
        <ListItem button sx={{ borderRight: props.navigationRoute === pathname ? 5 : 0, borderColor: props.isActive && 'primary.main' }} onClick={handleClick}>
            <ListItemIcon>
                {props.children}
            </ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItem>
    );
}

export default SidebarListItem;
