import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components /FormElement/FormElement";
import FileInput from "../../components /FormElement/FileInput";
import Button from "@material-ui/core/Button";
import {getTags, newPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

class NewPost extends Component {
    state = {
        text: '',
        image: '',
        tags: '',
    };

    componentDidMount() {
        this.props.getTags()
    }

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.newPost(formData);
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

    tagsChangeHandler = (e, tags) => {
        this.setState({tags: JSON.stringify(tags)})
    };
    render() {
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={12} lg={6}>
                    <Box pt={2} pb={2}>
                      <Typography variant='h4'>Создание поста</Typography>
                    </Box>
                    <form onSubmit={this.submitFormHandler}>
                        <Grid direction='column' container spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName='text'
                                    title='Текст'
                                    value={this.state.text}
                                    onChange={this.inputChangeHandler}
                                    error={this.getFieldError('text')}
                                    autoComplete='new-text'
                                    required={true}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs>
                                <FileInput name='image' label='Картинка' onChange={this.fileChangeHandler}/>
                            </Grid>
                            <Grid item xs>
                                <Autocomplete
                                    multiple
                                    options={this.props.tags}
                                    freeSolo
                                    onChange={this.tagsChangeHandler}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant='outlined' label={option} {...getTagProps({index})}/>
                                        ))
                                    }
                                    style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField eld="true" {...params} label="tags" variant="outlined"/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs>
                                <Button color='primary' type='submit' variant='contained'>
                                    Создать Пост
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                </Grid>
            </>
        );
    }
}
const mapStateToProps = state => ({
   tags: state.posts.tags
});
const mapDispatchToProps = dispatch => ({
    newPost: postData => dispatch(newPost(postData)),
    getTags: () => dispatch(getTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);