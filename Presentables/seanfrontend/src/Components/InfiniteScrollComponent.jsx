import React, { useRef, useCallback, useState, useEffect } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ProtoSeanService from "../Services/ProtoSeanService";
import { useHistory } from "react-router-dom";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_M2a200P72UriRnwy71LC6");

export default function InfiniteScrollComponent({ records, currentDateTime }) {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(9);
  const [modifiedRecords, setModifiedRecords] = useState(records);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Visible");
          setCurrentPage((previousPageNumber) => previousPageNumber + 1);
          console.log(currentPage);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      console.log(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    if (currentPage === 1) {
      setModifiedRecords(records.slice(indexOfFirstRecord, indexOfLastRecord));
    } else {
      setModifiedRecords(
        modifiedRecords.concat(
          records.slice(indexOfFirstRecord, indexOfLastRecord)
        )
      );
      console.log(currentPage);
    }
  }, [currentPage]);

  // const [records, setRecords] = useState(records);

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      ProtoSeanService.deleteRecord(id).then((res) => {
        records.filter((protoSean) => protoSean.id !== id);
        window.location.reload(true);
      });
    }
  };

  const editRecord = (id) => {
    history.push(`/update-record/${id}`);
  };

  const sendEmail = (visitorName, email) => {
    emailjs.send("service_sioux", "template_bl2vryd", {
      message: `${visitorName} has arrived!`,
      to_email: `${email}`,
    });
  };

  const renderStatus = (expectedAtValue) => {
    var expectedAtDateTime = new Date(expectedAtValue);
    if (expectedAtDateTime < currentDateTime) {
      return <ErrorIcon color="error" />;
    }
    return <FiberManualRecordIcon style={{ color: "orange" }} />;
    /* <CheckCircleIcon style={{ color: "green" }} /> */
  };

  const tableGenerate = (protoSean, index) => {
    if (modifiedRecords.length === index + 1) {
      return (
        <tr key={protoSean.id} ref={lastBookElementRef}>
          <td>{renderStatus(protoSean.expectedAt)}</td>
          <td>{protoSean.visitor}</td>
          <td>{protoSean.numberPlate}</td>
          <td>{protoSean.phnNumber}</td>
          <td>{protoSean.hostEmail}</td>
          <td>{protoSean.expectedAt}</td>
          <td className="action-column">
            <button
              style={{ width: "50px" }}
              onClick={() => editRecord(protoSean.id)}
              className="btn btn-info"
            >
              Edit
            </button>

            <button
              style={{ width: "80px" }}
              onClick={() => deleteRecord(protoSean.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              style={{ width: "80px" }}
              onClick={() => sendEmail(protoSean.visitor, protoSean.hostEmail)}
              className="btn btn-info"
            >
              Arrived
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={protoSean.id}>
          <td>{renderStatus(protoSean.expectedAt)}</td>
          <td>{protoSean.visitor}</td>
          <td>{protoSean.numberPlate}</td>
          <td>{protoSean.phnNumber}</td>
          <td>{protoSean.hostEmail}</td>
          <td>{protoSean.expectedAt}</td>
          <td className="action-column">
            <button
              style={{ width: "50px" }}
              onClick={() => editRecord(protoSean.id)}
              className="btn btn-info"
            >
              Edit
            </button>

            <button
              style={{
                width: "80px",
              }}
              onClick={() => deleteRecord(protoSean.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              style={{ width: "80px" }}
              onClick={() => sendEmail(protoSean.visitor, protoSean.hostEmail)}
              className="btn btn-info"
            >
              Arrived
            </button>
          </td>
        </tr>
      );
    }
  };

  return modifiedRecords.map((protoSean, index) =>
    tableGenerate(protoSean, index)
  );
}
