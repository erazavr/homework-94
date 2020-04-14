import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import PostListItem from "../../components /PostListItem/PostListItem";
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import Typography from "@material-ui/core/Typography";
import {Redirect} from "react-router-dom";

class MainPage extends Component {
    componentDidMount() {
        this.props.getPosts()
    }
    render() {
        return (
            <>
              <Grid container justify='center'>
                  <Grid item xs={12} lg={6}>
                      <Grid item container spacing={1}>
                          { this.props.user ?
                            <>
                                {this.props.posts[0] && this.props.posts ?
                                    this.props.posts.map(post => (
                                        <PostListItem key={post._id} text={post.text} image={post.image}/>
                                    )): <Typography variant='h2'>Здесь пока ничего нет</Typography>
                                }
                            </>:<Redirect from='/' to='login'/>
                          }

                      </Grid>
                  </Grid>
              </Grid>
            </>
        );
    }
}
const mapStateToProps = state => ({
  user: state.users.user,
  posts: state.posts.posts
});
const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);