import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/usersAction";
import Button from "@material-ui/core/Button";
import FacebookIcon from '@material-ui/icons/Facebook';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        console.log('INFO FROM FACEBOOK: ' , facebookData);
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
            console.log('YES')
        } else {
            console.log('NO')
        }
    };
    return (
        <FacebookLoginButton
            appId="258324881869138"
            fields="name, email, picture"
            callback={callback}
            render={renderProps => (
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<FacebookIcon/>}
                    onClick={renderProps.onClick}>
                    Login with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;