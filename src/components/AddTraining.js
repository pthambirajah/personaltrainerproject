import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date:'',
        duration:'',
        activity:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training); 
        handleClose();
    }



    const inputChanged = (event) =>{
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New training</DialogTitle>
                <DialogContent>
               
                <TextField
                    autoFocus
                    name="firstname"
                    value={training.date}
                    onChange={inputChanged}
                    margin="dense"
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    name="lastname"
                    value={training.duration}
                    onChange={inputChanged}
                    margin="dense"
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    name="streetaddress"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    name="postcode"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Post Code"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default AddTraining;