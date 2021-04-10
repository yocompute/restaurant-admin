import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";

function UserDialog({ user, opened, onClose, onSubmit }) {
  const { register, handleSubmit } = useForm();
  // const [model, setModel] = useState(data);
  const handleClose = () => {
    onClose(false);
  };

  const handleOk = (d) => {
    onSubmit(d, user._id);
    onClose(false);
  };


  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
      {user && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a user, please enter the email, name and tmporary password
              here.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email"
              type="email"
              defaultValue={user.email}
              fullWidth
              inputRef={register}
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              defaultValue={user.phone}
              label="Phone Number"
              type="phone"
              // value={model.phone}
              fullWidth
              inputRef={register}
            />
            <TextField
              autoFocus
              margin="dense"
              name="username"
              defaultValue={user.username}
              label="Username"
              type="text"
              // value={model.username}
              fullWidth
              inputRef={register}
            />
            <TextField
              autoFocus
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              inputRef={register}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}

UserDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any,
  user: PropTypes.shape({
    _id: PropTypes.any,
    email: PropTypes.any,
    phone: PropTypes.any,
    username: PropTypes.any
  })
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(UserDialog);