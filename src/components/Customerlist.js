import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist(){
    
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const columns = [
        {headerName: 'Firstname', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Lastname', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Post Code', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {   
            headerName:'', 
            field: 'links[0].href',
            cellRendererFramework: params => <Button 
                                                color="secondary"
                                                size="small"
                                                onClick={() => deleteCustomer(params.data.links[0].href)}>
                                                Delete</Button>
        },
        {   
            headerName:'', 
            field: 'links[0].href',
            cellRendererFramework: params => <AddTraining 
                                                addTraining={addTraining} params={params.data.links[0].href}></AddTraining>
        }
    ]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))

    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure ?')){
            fetch(link,{
                method: 'DELETE'
            })
            .then(_=> getCustomers())
            .then(_ => {
                setMsg('Customer was deleted successfully');
                setOpen(true)})
            .catch (err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer was added successfully');
            setOpen(true)})
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('New Training Added');
                setOpen(true)})
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{height:'700px', width:'100%', margin:'auto'}}>
            <AgGridReact
            ref={gridRef}
            onGridRead={params => {
                gridRef.current = params.api
                params.api.sizeColumnToFit();
            }}
            columnDefs={columns}
            suppressCellSelection={true}
            rowData={customers}
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
export default Customerlist;