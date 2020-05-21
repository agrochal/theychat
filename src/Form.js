import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
  form: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  formElement: {
    margin: "20px",
    width: "400px",
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      room: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username && this.state.room) {
      this.setState({
        redirect: `/chat/${this.state.room}/${this.state.username}`,
      });
    }
  }

  state = { redirect: null };
  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          name="username"
          className={classes.formElement}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        <FormControl className={classes.formElement} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Room</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Room"
            onChange={this.handleInputChange}
            name="room"
          >
            <MenuItem value={"General"}>General</MenuItem>
            <MenuItem value={"Tech"}>Tech</MenuItem>
            <MenuItem value={"Spam"}>Spam</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.formElement}
          type="submit"
          variant="contained"
          color="primary"
        >
          Join Chat
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
