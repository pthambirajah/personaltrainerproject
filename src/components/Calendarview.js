import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from "moment";


function CalendarView(){
    const [finalGymEvent, setFinalGymEvent] = useState([]);
    
    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            return setFinalGymEvent(
                data.map((data,index) => ({
                    id:index,
                    title: data.activity,
                    date: moment(data.date).format('YYYY-MM-DD')
                }))
            )
            })
        .catch(err => console.error(err))
    }    

    return(
        <div>
            <FullCalendar 
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin ]} 
            events={finalGymEvent}
            />
        </div>
    );
    
}

export default CalendarView;

