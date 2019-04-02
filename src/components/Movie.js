import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShowtimeList from './ShowtimeList';
const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  media: {
      height: 0,
      paddingTop: '56.25%',
  }
});
/**
 * 
 * Movie Function Component. The movie item 
 * should include title, koremitai counts, length, poster, 
 * teaser embed url
 */


class Movie extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        expanded: false ,
        ikoremitai: this.props.ikoremitai,
      }
  }
  
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  handleFavIconClick = () => {
    this.setState({ ikoremitai: !this.state.ikoremitai });
    //TODO: PUT /movie/filmID/koremitai
  }
  render() {
    const { classes, title, koremitai, length, poster_uri, teaser_uri } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={`片長:${length}`}
        />
        <CardMedia
          image={poster_uri}
          className={classes.media}
        />
        <CardContent>
        
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleFavIconClick}>
            {this.state.ikoremitai ? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <div>{koremitai}</div>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <CardMedia
            src={teaser_uri}
            component={'iframe'}
            width={560} 
            height={315} 
            frameBorder={0} 
            allow={"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}
            allowFullScreen={true}
        />
            <ShowtimeList />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movie);