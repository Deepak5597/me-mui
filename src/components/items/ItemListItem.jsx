import { useState } from 'react';
import { Box, ListItemText, Menu, MenuItem, Paper, styled, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';

const Item = styled(Paper)({
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    width: "100%"
})

function ItemListItem({ data, changeSelectedItem, isActive }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCardClick = () => {
        changeSelectedItem(data);
    }
    return (
        <Item sx={[{ borderLeft: 5, borderRadius: 0, borderColor: "transparent" }, isActive && { borderColor: "primary.main", backgroundColor: "grey.200" }, { '&:hover': { backgroundColor: "grey.100" } }]}>
            <Box onClick={handleCardClick}>
                <Typography variant="subtitle1">{data.shortName}</Typography>
                <Typography variant="subtitle2" sx={{ color: "grey.700" }}>{data.company} | {data.stock.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0)}</Typography>
                {/* <Typography variant="subtitle2" sx={{ color: "grey.700" }}>{data.partyType} | {data.currentBalance}</Typography> */}
            </Box>
            <IconButton aria-label="action" component="span" onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined} aria-expanded={open ? 'true' : undefined}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Item>
    )
}

export default ItemListItem;
