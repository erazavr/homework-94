import React from 'react';
import {Route, Switch} from "react-router-dom";

import {ToastContainer} from "react-toastify";
import {Container} from "reactstrap";
import MainPage from "./containers /MainPage/MainPage";
import AppToolbar from "./components /UI/Toolbar/AppToolbar";
import {CssBaseline} from "@material-ui/core";
import Register from "./containers /Register/Register";
import Login from "./containers /Login/Login";
import NewPost from "./containers /NewPost/NewPost";
import Profile from "./containers /Profile/Profile";
import Subscription from "./containers /Subscription/Subscription";

const App = () => {
    return (
        <>
            <CssBaseline/>
            <ToastContainer autoClose={2000}/>
            <header>
                <AppToolbar/>
            </header>
            <Container className='mt-5'>
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/newPost' exact component={NewPost}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/sub' exact component={Subscription}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                </Switch>
            </Container>
        </>
    );
};

export default App;