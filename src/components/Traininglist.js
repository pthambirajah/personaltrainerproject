import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from "moment";

function Traininglist(){
    
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []);

    const columns = [
        {headerName: 'Date', field: 'date', cellRenderer: (data) => {
            return moment(data.value).format('MM/DD/YYYY HH:mm')
        }, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'customer.lastname', sortable: true, filter: true},
        {   
            headerName:'', 
            field: 'id',
            cellRendererFramework: params => <Button 
                                                color="secondary"
                                                size="small"
                                                onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/'+params.data.id)}>
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

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <div className="ag-theme-material" style={{height:'700px', width:'100%', margin:'auto'}}>
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