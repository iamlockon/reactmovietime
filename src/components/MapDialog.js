import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import {map} from '../configs/config';
import classNames from 'classnames';
//Add Gmap
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { DialogContent } from '@material-ui/core';

const styles = {
  paper: {
    height: "100%"
  },
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: null,
        lng: null,
      },
    }
  }
  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          position: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
        //Add current position marker, theater markers.

      });
    } else {
      alert("您的瀏覽器不支援Geolocation功能，無法定位成功..");
    }
  }
  render() {
    return (
      <Map google={this.props.google} centerAroundCurrentLocation={true} zoom={14}>
        <Marker
          title={'Theater1'}
          name={'1'}
          position={this.state.position} />
      </Map>
    );
  }
}
 
const MapContainerWrapper = GoogleApiWrapper({
  apiKey: map.apiKey,
})(MapContainer);

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, className, selectedValue, ...other } = this.props;
    
    return (
      <Dialog maxWidth={false} fullWidth={true} onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} classes={{paper: classes.paper}}>
        <DialogTitle id="simple-dialog-title">附近電影場次地圖</DialogTitle>
        <DialogContent >
          <MapContainerWrapper  />
        </DialogContent>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

function MapDialog(props) {
    return <SimpleDialogWrapped 
          selectedValue={props.selectedPoster}
          open={props.open}
          onClose={props.handleClose}
        />;
}

export default MapDialog;