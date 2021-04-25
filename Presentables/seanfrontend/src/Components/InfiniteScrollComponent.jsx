import React, { useRef, useCallback, useState, useEffect} from 'react'
import ErrorIcon from "@material-ui/icons/Error";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ProtoSeanService from "../Services/ProtoSeanService";
import { useHistory } from "react-router-dom";

export default function InfiniteScrollComponent({records, currentDateTime}) {

      let history = useHistory();
      const [isLoading, setIsLoading] = useState(false);
      const [hasMore, setHasMore] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [recordsPerPage, setRecordsPerPage] = useState(7);

      const observer = useRef();
      const lastBookElementRef = useCallback(node => {
            if(isLoading) {
                  return      
            }
            if(observer.current) {
                  observer.current.disconnect();
                  observer.current = new IntersectionObserver(entries => {
                        if(entries[0].isIntersecting) {
                              console.log("Visible");
                        }
                  })
            }
            if(node) {
                  observer.current.observe(node);
            }
            console.log(node);
      }, [isLoading, hasMore]);

      // const [records, setRecords] = useState(records);

      const deleteRecord = (id) => {
            ProtoSeanService.deleteRecord(id).then((res) => {

                  records.filter((protoSean) => protoSean.id !== id)
                  window.location.reload(true);
            });
      }
        
          
      const editRecord = (id) => {
            history.push(`/update-record/${id}`);
      }

      const renderStatus = (expectedAtValue) => {
            var expectedAtDateTime = new Date(expectedAtValue);
            if (expectedAtDateTime < currentDateTime) {
              return <ErrorIcon color="error" />;
            }
            return <FiberManualRecordIcon style={{ color: "orange" }} />;
            /* <CheckCircleIcon style={{ color: "green" }} /> */
      }



      const tableGenerate = (protoSean, index) => {

            if(records.length === index + 1) {
                  return(
                        <tr key={protoSean.id} ref={lastBookElementRef}>
                        <td>{renderStatus(protoSean.expectedAt)}</td>
                        <td>{protoSean.visitor}</td>
                        <td>{protoSean.numberPlate}</td>
                        <td>{protoSean.phnNumber}</td>
                        <td>{protoSean.expectedAt}</td>
                        <td className="action-column">
                              <button style={{width:"50px" }}
                              onClick={() => editRecord(protoSean.id)}
                              className="btn btn-info"
                              >
                              Edit
                              </button>

                              <button
                              style={{ marginLeft: "10px",
                              width:"80px" }}
                              onClick={() => deleteRecord(protoSean.id)}
                              className="btn btn-danger"
                              >
                              Delete
                              </button>
                        </td>
                        </tr>
                  )
            }
            else {
                  return (
                        <tr key={protoSean.id}>
                        <td>{renderStatus(protoSean.expectedAt)}</td>
                        <td>{protoSean.visitor}</td>
                        <td>{protoSean.numberPlate}</td>
                        <td>{protoSean.phnNumber}</td>
                        <td>{protoSean.expectedAt}</td>
                        <td className="action-column">
                              <button style={{width:"50px" }}
                              onClick={() => editRecord(protoSean.id)}
                              className="btn btn-info"
                              >
                              Edit
                              </button>

                              <button
                              style={{ marginLeft: "10px",
                              width:"80px" }}
                              onClick={() => deleteRecord(protoSean.id)}
                              className="btn btn-danger"
                              >
                              Delete
                              </button>
                        </td>
                        </tr>
                  )
            }
      }

      return (
            
            records.map((protoSean, index) => (
                  

                  tableGenerate(protoSean, index)


                  ))
      )
}
