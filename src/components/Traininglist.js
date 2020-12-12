import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist(){
    
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []);

    const columns = [
        {headerName: 'Date', field: 'date', sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {   
            headerName:'', 
            field: 'id',
            cellRendererFramework: params => <Button 
                                                color="secondary"
                                                size="small"
                                                onClick={() => deleteTraining(params.value)}>
                                                Delete</Button>
        }

    ]

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))

    }

    const deleteTraining = (link) => {
        if(window.confirm('Are you sure ?')){
            fetch(link,{
                method: 'DELETE'
            })
            .then(_=> getTrainings())
            .then(_ => {
                setMsg('Training was deleted successfully');
                setOpen(true)})
            .catch (err => console.error(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('Customer was added successfully');
            setOpen(true)})
        .then(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <AddTraining addTraining={addTraining}/>
            <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
            <AgGridReact
            ref={gridRef}
            onGridRead={params => {
                gridRef.current = params.api
                params.api.sizeColumnToFit();
            }}
            columnDefs={columns}
            suppressCellSelection={true}
            rowData={trainings}
            pagination={true}
            paginationPageSize={10}
            >
            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
            >
            </Snackbar>
            </div>
        </div>
    );

}
export default Traininglist;