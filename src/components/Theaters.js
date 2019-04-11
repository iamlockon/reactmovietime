import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {},
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function CustomLink(props) {
  const aStyle = {
      padding: '25px',
  }
  return <th align="right"><a style={aStyle} href={`https://www.google.com/maps/search/?api=1&query=${props.title}`}>LINK</a></th>;
}

class CustomizedTable extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          data : [],
      }
  }
  componentDidMount() {
    //fetch data.
    let lat, lng, dist = 5;
    const options = {
        timeout: 2000,
    }
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos)=>{
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            fetch(`http://localhost:3001/theaters?lat=${lat}&lng=${lng}&dist=${dist}`)
                .then(async (res) => {                    
                    const da = await res.json();
                    this.setState((state,props)=>{return {data: da}});
                })
                .catch((e) => console.error("Failed to fetch theaters:", e));

        }, (e) => {
            console.error("Get geolocation failed: ", e);
        }, options);
    }
      }
  render() {
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>影院（由近至遠排序）</CustomTableCell>
                <CustomTableCell>地址</CustomTableCell>
                <CustomTableCell align="right">地圖連結</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {row.theaterInfo[1]}
                  </CustomTableCell>
                  <CustomTableCell
                    component={CustomLink}
                    title={row.name}
                 />       
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
  }
  
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
