import React, { useRef, useCallback, useState, useEffect } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import InfoIcon from '@material-ui/icons/Info';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import ProtoSeanService from "../Services/ProtoSeanService";
import { useHistory } from "react-router-dom";
import Notifier from "react-desktop-notifications";


export default function InfiniteScrollComponent({records, currentDateTime}) {

      let history = useHistory();
      const [isLoading, setIsLoading] = useState(false);
      const [hasMore, setHasMore] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [recordsPerPage, setRecordsPerPage] = useState(9);
      const [modifiedRecords, setModifiedRecords] = useState(records);  

      const observer = useRef();
      const lastBookElementRef = useCallback(node => {
            if(isLoading) {
                  return      
            }
            if(observer.current) {
                  observer.current.disconnect();
            }
            observer.current = new IntersectionObserver(entries => {
                  if(entries[0].isIntersecting) {
                        console.log("Visible");
                        setCurrentPage(previousPageNumber => previousPageNumber + 1);
                  }
            })
            if(node) {
                  observer.current.observe(node);
            }
      }, [isLoading, hasMore]);

      useEffect(() => {

      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      if(currentPage === 1){
            setModifiedRecords(records.slice(indexOfFirstRecord, indexOfLastRecord));

      }
      else {
            setModifiedRecords(modifiedRecords.concat(records.slice(indexOfFirstRecord, indexOfLastRecord)) );
            console.log("Page: " + currentPage);
      }


}, [currentPage])

// const [records, setRecords] = useState(records);

const deleteRecord = (id) => {
      ProtoSeanService.deleteRecord(id).then((res) => {

            records.filter((protoSean) => protoSean.id !== id)
            window.location.reload(true);
      });
}

const gotNewNotification = (visitor) =>{
      Notifier.start("A visitor has arrived!",visitor + " has just arrived","localhost:3000/records", "/SiouxLogo.png");
}
  
    
const editRecord = (id) => {
      history.push(`/update-record/${id}`);
}

const renderStatus = (expectedAtValue, arrivedCheck) => {

      var expectedAtDateTime = new Date(expectedAtValue);
      
      if(arrivedCheck === 1){
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

      
      

      /* <CheckCircleIcon style={{ color: "green" }} /> */
}

const tableGenerate = (protoSean, index) => {

      if(modifiedRecords.length === index + 1) {
            
            return(
                  <tr key={protoSean.id} ref={lastBookElementRef}>
                  <td>{renderStatus(protoSean.expectedAt, protoSean.arrived)}</td>
                  <td>{protoSean.visitor}</td>
                  <td>{protoSean.numberPlate}</td>
                  <td>{protoSean.phnNumber}</td>
                  <td>{protoSean.hostEmail}</td>
                  <td>{protoSean.expectedAt}</td>
                  <td className="action-column">

                        <button style={{width:"80px" }}
                        onClick={() => editRecord(protoSean.id)}
                        className="btn btn-info"
                        >
                        <EditTwoToneIcon  
                              style={{ color: "white", width: "25px", height: "25px", marginRight: "2px" }} />
                        Edit
                        </button>

                        <button
                        style={{ 
                              width: "100px",
                              marginLeft: "10px"}}
                        onClick={() => deleteRecord(protoSean.id)}
                        className="btn btn-danger"
                        >
                        <DeleteTwoToneIcon  
                                  style={{ color: "white", width: "25px", height: "25px", marginRight: "2px" }} />
                        Delete
                        </button>

                        <button onClick = {()=> gotNewNotification(protoSean.visitor)}></button>
                        
                  </td>
                  </tr>
            )
      }
      else {
            return (
                  <tr key={protoSean.id}>
                  <td>{renderStatus(protoSean.expectedAt, protoSean.arrived)}</td>
                  <td>{protoSean.visitor}</td>
                  <td>{protoSean.numberPlate}</td>
                  <td>{protoSean.phnNumber}</td>
                  <td>{protoSean.hostEmail}</td>
                  <td>{protoSean.expectedAt}</td>
                  <td className="action-column">
                        <button style={{width:"80px" }}
                        onClick={() => editRecord(protoSean.id)}
                        className="btn btn-info"
                        >
                        <EditTwoToneIcon  
                              style={{ color: "white", width: "25px", height: "25px", marginRight: "2px" }} />
                        Edit
                        </button>

                        <button
                        style={{ 
                              width: "100px",
                              marginLeft: "10px"}}
                        onClick={() => deleteRecord(protoSean.id)}
                        className="btn btn-danger"
                        >
                        <DeleteTwoToneIcon  
                                  style={{ color: "white", width: "25px", height: "25px", marginRight: "2px" }} />
                        Delete
                        </button>
                  </td>
                  </tr>
            )
      }
  };

  return modifiedRecords.map((protoSean, index) =>
    tableGenerate(protoSean, index)
  );
}
