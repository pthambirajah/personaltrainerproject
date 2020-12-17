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
        activity:'',
        customer: props.params
    });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training); 
        console.log(training)
        handleClose();
    }

    const trainingInputChanged = (event) =>{
        setTraining({...training, [event.target.name]: event.target.value})
        console.log(props.params);
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
                        name="date"
                        value={training.date}
                        type="date"
                        onChange={trainingInputChanged}
                        margin="dense"
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={trainingInputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={trainingInputChanged}
                        margin="dense"
                        label="Activity"
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