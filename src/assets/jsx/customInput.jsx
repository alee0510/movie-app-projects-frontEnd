import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color : theme.palette.common.white,
  },
  underline: {
		color: theme.palette.common.white,
		borderBottom: theme.palette.common.white,
		'&:after': {
			borderBottom: `2px solid ${theme.palette.common.white}`,			
		},				
		'&:focused::after': {
			borderBottom: `2px solid ${theme.palette.common.white}`,
		},		
		'&:before': {
			borderBottom: `1px solid ${theme.palette.common.white}`,			
		},
		'&:hover:not($disabled):not($focused):not($error):before': {
			borderBottom: '2px solid rgb(255, 255, 255) !important',
		},
		'&$disabled:before': {
			borderBottom: `1px dotted ${theme.palette.common.white}`,
		},
	},
});

class InputAdornments extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>      
        <FormControl >
          <InputLabel htmlFor="adornment-amount">Username</InputLabel>
          <Input
            id="adornment-amount"
            classes={{underline: classes.underline}}
          />
        </FormControl>        
      </div>
    );
  }
}

export default withStyles(styles)(InputAdornments);