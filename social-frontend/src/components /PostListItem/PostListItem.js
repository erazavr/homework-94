import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {apiURL} from "../../constans";

const PostListItem = props => {
    return (
        <Grid item xs={12}>
            <Card>
                {/*<CardMedia image={`${apiURL}/uploads/${props.image}`}/>*/}
                {props.image ? <img src={`${apiURL}/uploads/${props.image}`} alt="" style={{width: '100px'}}/>: null}
                <CardContent>
                    <strong>
                        {props.text}
                    </strong>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PostListItem;