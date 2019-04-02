import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from '../tileData';
import MapDialog from './MapDialog';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 400,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class AdvancedGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      selectedPoster: null,
    }
  };


  handleClickOpen = (title) => {
    this.setState({
      isDialogOpen: true,
      selectedPoster: title,
    });
  };

  handleClose = value => {
    this.setState({ selectedPoster: value, isDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={450} spacing={3} className={classes.gridList}>
          {tileData.map(tile => (
            <GridListTile button="true" onClick={() => { this.handleClickOpen(tile.title) }} key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
              <img className={classes.img} src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
        <MapDialog handleClose={this.handleClose} selectedValue={this.state.selectedPoster} open={this.state.isDialogOpen} />
      </div>
    );
  }

}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvancedGridList);
