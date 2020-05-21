import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import io from "socket.io-client";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

const styles = (theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100vh",
  },
  main: {
    backgroundColor: "#3949ab",
    textAlign: "center",
  },
  secondary: {
    backgroundColor: "#3f51b5",
    textAlign: "center",
  },
  third: {
    backgroundColor: "#5c6bc0",
    color: "#ffffff",
    textAlign: "center",
  },
  columnFirst: {
    width: "20vw",
    backgroundColor: "#5c6bc0",
  },
  columnSecond: {
    width: "80vw",
    backgroundColor: "#e8eaf6",
  },
  messageBox: {
    height: "83vh",
    maxHeight: "83vh",
    overflowY: "scroll",
    padding: "15px",
  },
  sendMessage: {
    boxShadow: "0px -5px 10px 0px rgba(250, 250, 250,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "17vh",
    backgroundColor: "#fafafa",
  },
  inputMessage: {
    width: "70%",
    marginRight: "30px",
  },
  time: {
    justifyContent: "flex-end",
    display: "flex",
    color: "#c5cae9",
  },
  message: {
    width: "min-content",
    minWidth: "14vw",
    maxWidth: "23vw",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    height: "min-content",
    marginBottom: "10px",
  },
  username: {
    color: "#e8eaf6",
  },
});

let socket;
if (!socket) {
  socket = io('/');
}

class ChatS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      users: [],
      messages: [],
    };

    const username = props.match.params.username;
    const room = props.match.params.room;

    if (["General", "Tech", "Spam"].includes(room)) {
      socket.emit("joinRoom", { username, room });
      socket.off("roomUsers").on("roomUsers", ({ room, users }) => {
        outputRoomName(room);
        this.setState({
          users: users,
        });
      });
    } else {
      window.location.href = "/";
    }

    socket.off("message").on("message", (message) => {
      this.setState({
        messages: [...this.state.messages, message],
      });
      const chatMessages = document.querySelector("#messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

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
    const msg = this.state.message;
    socket.emit("chatMessage", msg);

    event.target.elements.message.value = "";
    event.target.elements.msg.focus();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.row}>
        <div className={`${classes.column} ${classes.columnFirst}`}>
          <Box className={classes.main} color="secondary.contrastText" p={2}>
            <Typography variant="h4" component="h4">
              TheyChat
            </Typography>
          </Box>
          <Box
            className={classes.secondary}
            color="secondary.contrastText"
            p={2}
          >
            <Typography id="room-name" variant="h5" component="h5"></Typography>
          </Box>
          <List className={classes.third}>
            {this.state.users.map((user, i) => (
              <ListItem key={i}>
                <Typography variant="h6" component="h6">
                  {user.username}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={`${classes.column} ${classes.columnSecond}`}>
          <div id="messages" className={classes.messageBox}>
            {this.state.messages.map((message) => (
              <Box className={`${classes.column} ${classes.message}`}>
                <Typography
                  className={classes.username}
                  variant="body1"
                  gutterBottom
                >
                  {message.username}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {message.text}
                </Typography>
                <Typography
                  className={classes.time}
                  variant="body2"
                  gutterBottom
                >
                  {message.time}
                </Typography>
              </Box>
            ))}
          </div>
          <form className={classes.sendMessage} onSubmit={this.handleSubmit}>
            <TextField
              className={classes.inputMessage}
              name="message"
              id="msg"
              required
              autoComplete="off"
              onChange={this.handleInputChange}
              label="Your message"
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

ChatS.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function outputRoomName(room) {
  document.querySelector("#room-name").innerText = room;
}

export default withStyles(styles)(ChatS);
