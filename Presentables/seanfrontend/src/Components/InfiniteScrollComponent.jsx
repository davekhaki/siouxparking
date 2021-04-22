import React, { useRef, useCallback, useState} from 'react'
import ErrorIcon from "@material-ui/icons/Error";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ProtoSeanService from "../Services/ProtoSeanService";
import { useHistory } from "react-router-dom";

export default function InfiniteScrollComponent({records, currentDateTime}) {

      let history = useHistory();

      const observer = useRef();
      const lastBookElementRef = useCallback();

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

      return (
            
            records.map((protoSean, index) => (
                
                  // (this.state.records.length === index + 1) ? 
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
                  ))
      )
}
