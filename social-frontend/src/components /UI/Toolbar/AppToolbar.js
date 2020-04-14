import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import {logoutUser} from "../../../store/actions/usersAction";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    }
}));

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const classes = useStyles();
  return (
      <AppBar position="static">
          <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit">
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                  <Link to='/' className={classes.mainLink}>Social</Link>
              </Typography>
              {user ? (<UserMenu user={user} logout={() => dispatch(logoutUser())}/>): (<AnonymousMenu/>)}
          </Toolbar>
      </AppBar>
  );
};

export default AppToolbar;