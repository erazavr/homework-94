import React, {useState} from 'react';

import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {apiURL} from "../../../constans";
const UserMenu = ({user, logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton  color='inherit' onClick={handleClick}>
                <AccountCircleIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <ListItem disabled>Hello {user.firstName || user.username}!</ListItem>
                {user.avatar ? <ListItem disabled><img style={{width: '100px'}} src={`${apiURL}/uploads/${user.avatar}`} alt={user.firstName || user.username}/></ListItem>: null}

                <Divider/>
                <MenuItem onClick={handleClose} component={NavLink} to='/profile'>Профиль</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/newPost'>Новый пост</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to='/sub'>Подписка</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};
export default UserMenu;