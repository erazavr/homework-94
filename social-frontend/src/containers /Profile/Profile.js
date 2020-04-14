import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormElement from "../../components /FormElement/FormElement";
import FileInput from "../../components /FormElement/FileInput";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {editUserProfile} from "../../store/actions/usersAction";
import {apiURL} from "../../constans";

class Profile extends Component {
    state = {
        username: '',
        password: '',
        avatar: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.editUserProfile(formData);
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message
        } catch (error) {
            return undefined
        }
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        console.log(this.props.user)
        return (
            <>
             <Grid container justify='center'>
                 <Grid item xs={12} lg={6}>
                     <Box pt={2} pb={2}>
                         <Typography variant='h4'>Редактирование профиля</Typography>
                         <form onSubmit={this.submitFormHandler}>
                             <Grid container direction='column' spacing={2}>
                             <Grid item xs>
                                 <FormElement
                                     propertyName='username'
                                     title='Имя пользователя'
                                     value={this.state.user}
                                     onChange={this.inputChangeHandler}
                                     error={this.getFieldError('username')}
                                     autoComplete='new-username'
                                     required={true}
                                     type='text'
                                 />
                             </Grid>
                             <Grid item xs>
                                 <FormElement
                                     propertyName='password'
                                     title='Ваш пароль'
                                     value={this.state.password}
                                     onChange={this.inputChangeHandler}
                                     error={this.getFieldError('password')}
                                     autoComplete='new-password'
                                     required={true}
                                     type='password'
                                 />
                             </Grid>
                                 <Grid item xs>
                                     <FileInput name='avatar' label='Avatar' onChange={this.fileChangeHandler}/>
                                 </Grid>
                                 {this.props.user.avatar ?
                                    <div>
                                        <h3>Текущий аватар</h3>
                                        <img src={apiURL + '/uploads/' + this.props.user.avatar} alt={this.props.user.username} style={{width: '100px'}}/>
                                    </div>: <h3>Нет аватарки</h3>
                                 }
                                 <Grid item xs>
                                     <Button color='primary' type='submit' variant='contained'>
                                        Изменить
                                     </Button>
                                 </Grid>
                             </Grid>
                         </form>
                     </Box>
                 </Grid>
             </Grid>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    editUserProfile: profileData => dispatch(editUserProfile(profileData))
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);