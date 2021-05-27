import React, { useEffect, useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';
import Notifier from "react-desktop-notifications";

const StatusComponent = ({protoSean}) => {

    const [listening, setListening] = useState(false);
    const [currentDateTime] = useState(new Date());
    const [appointment, setAppointment] = useState(protoSean);
    const [visitor, setVisitor] = useState(protoSean.visitor);
    const [notified, setNotified] = useState(false);

    let eventSource = undefined;

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource('http://localhost:8081/event/arrived');
            eventSource.onmessage = (event) => {
                var entity = JSON.parse(event.data);
                if(appointment.id === entity.id ){
                    setAppointment(JSON.parse(event.data));
                }
            }
            eventSource.onerror = (err) => {
                console.error('EventSource failed:', err);
                eventSource.close();
            }
            setListening(true)
        }
        return () => {
                eventSource.close();
                console.log('event closed')
        }

    }, [])



    // if(protoSean.arrived === 1){
    //     return ( <Tooltip title="Arrived" placement="left" arrow>
    //     <CheckCircleIcon style={{ color: "green" }} />
    //     </Tooltip>);
    // }
    // else if (protoSean.arrived === 0){
    //         if (protoSean.expectedAt < currentDateTime) {
    //             return ( <Tooltip title="Late" placement="left" arrow> 
    //             <ErrorIcon color="error" /> 
    //             </Tooltip> )
    //         }
    //         else if (protoSean.expectedAt > currentDateTime) {
    //             return( <Tooltip title="Expected" placement="left" arrow>
    //             <InfoIcon style={{ color: "orange" }} /> 
    //             </Tooltip>);
    //         }
    // }

    const showNewNotification = (visitor) =>{
        Notifier.start("A visitor has arrived!",visitor + " has just arrived","www.google.com", "/SiouxLogo.png");
    }

    const renderStatus = (expectedAtValue, arrivedCheck) => {

        var expectedAtDateTime = new Date(expectedAtValue);
        
        if(arrivedCheck === 1){
            
            if(!notified){
                showNewNotification(visitor);
                setNotified(true);
            }
            
            return ( <Tooltip title="Arrived" placement="left" arrow>
            <CheckCircleIcon style={{ color: "green" }} />
            </Tooltip>);
        }
        else if (arrivedCheck === 0){
              if (expectedAtDateTime < currentDateTime) {
                    return ( <Tooltip title="Late" placement="left" arrow> 
                    <ErrorIcon color="error" /> 
                    </Tooltip> )
              }
              else if (expectedAtDateTime > currentDateTime) {
                    return( <Tooltip title="Expected" placement="left" arrow>
                    <InfoIcon style={{ color: "orange" }} /> 
                    </Tooltip>);
              }
        }
    }

    return renderStatus(appointment.expectedAt, appointment.arrived);

}

export default StatusComponent