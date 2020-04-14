import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components /FormElement/FormElement";
import {connect} from "react-redux";
import {subToUser} from "../../store/actions/usersAction";
import Button from "@material-ui/core/Button";

class Subscription extends Component {
    state = {
        subscriptions: ''
    };
    inputChangeHandler = event => {
        this.setState({
            subscriptions: event.target.value
        })
    };
    submitFormHandler = e => {
        e.preventDefault();

        this.props.subToUser(this.state)

    };
    render() {
        return (
            <>
                <Grid container justify='center'>
                    <form onSubmit={this.submitFormHandler}>
                        <Grid item container direction='column' spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName='username'
                                    title='Имя пользователя'
                                    onChange={this.inputChangeHandler}
                                    placeholder='Ваше имя'
                                    autoComplete='new-username'
                                    required={true}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs>
                                <Button color='primary' type='submit' variant='contained'>
                                    Подписка
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Grid>
            </>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    subToUser: subData => dispatch(subToUser(subData))
});
export default connect(null, mapDispatchToProps)(Subscription);