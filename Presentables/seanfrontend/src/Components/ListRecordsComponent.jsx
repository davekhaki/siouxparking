import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";
import TextField from "@material-ui/core/TextField";

import ErrorIcon from "@material-ui/icons/Error";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

class ListRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      expectedAt: "",
      hostEmail: "",
      currentDateTime: new Date(),
      isAscending: false,
    };

    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.changeHostEmailHandeler = this.changeHostEmailHandeler.bind(this);
    this.changeExpectedAtHandeler = this.changeExpectedAtHandeler.bind(this);
    this.saveRecords = this.saveRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);

    this.sortBy = this.sortBy.bind(this);
  }

  saveRecords = (e) => {
    e.preventDefault();
    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
      hostEmail: this.state.hostEmail,
      expectedAt:
        this.state.expectedAt.split("T")[0] +
        " " +
        this.state.expectedAt.split("T")[1],
    };

    ProtoSeanService.addRecords(protoSean);
    this.setState({
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      hostEmail: "",
      expectedAt: ""
    });
    window.location.reload(true);
  };

  changeVisitorHandeler = (event) => {
    this.setState({ visitor: event.target.value });
  };

  changeNumberPlateHandeler = (event) => {
    this.setState({ numberPlate: event.target.value });
  };

  changePhnNumberHandeler = (event) => {
    this.setState({ phnNumber: event.target.value });
  };

  changeHostEmailHandeler = (event) => {
    this.setState({ hostEmail: event.target.value });
  };

  changeExpectedAtHandeler = (event) => {
    this.setState({ expectedAt: event.target.value });
  };

  deleteRecord(id) {
    ProtoSeanService.deleteRecord(id).then((res) => {
      this.setState({
        records: this.state.records.filter((protoSean) => protoSean.id !== id),
      });
    });
  }

  componentDidMount() {
    ProtoSeanService.getRecords().then((res) => {
      this.setState({ records: res.data });
    });
  }

  renderStatus(expectedAtValue) {
    var expectedAtDateTime = new Date(expectedAtValue);
    if (expectedAtDateTime < this.state.currentDateTime) {
      return <ErrorIcon color="error" />;
    }
    return <FiberManualRecordIcon style={{ color: "orange" }} />;
    /* <CheckCircleIcon style={{ color: "green" }} /> */
  }

  editRecord(id) {
    this.props.history.push(`/update-record/${id}`);
  }

  addRecord() {
    this.props.history.push("/add-record");
  }

  sortBy(key) {

    var variable = this.state.records.sort();
    console.log(variable);

    if(this.state.isAscending){
      this.setState({
        records: this.state.records.sort((a,b) => a[key] < b[key] ? 1 : -1)
      })
      this.setState({
        isAscending: false
      })
    }
    else{
      this.setState({
        records: this.state.records.sort((a,b) => a[key] > b[key] ? 1 : -1) 
      })
      this.setState({
        isAscending: true
      })
    }

  }

  render() {
    return (
      <div>
        <div className="row list-row">
          <h3>Records</h3>
          <table className="table table-striped table-borderless list-item-1">
            <thead>
              <tr>
                <th> Status </th>
                <th onClick={() => {this.sortBy('visitor')}}> Visitor </th>
                <th onClick={() => {this.sortBy('numberPlate')}}> License Plate </th>
                <th onClick={() => {this.sortBy('phnNumber')}}> Phone Number </th>
                <th onClick={() => {this.sortBy('hostEmail')}}> Host Email </th>
                <th onClick={() => {this.sortBy('expectedAt')}}> Expected At </th>
                <th > Actions </th>
              </tr>
            </thead>

            <tbody>
              {this.state.records.map((protoSean) => (
                <tr key={protoSean.id}>
                  <td>{this.renderStatus(protoSean.expectedAt)}</td>
                  <td>{protoSean.visitor}</td>
                  <td>{protoSean.numberPlate}</td>
                  <td>{protoSean.phnNumber}</td>
                  <td>{protoSean.hostEmail}</td>
                  <td>{protoSean.expectedAt}</td>
                  <td className="action-column">
                    <button style={{width:"50px" }}
                      onClick={() => this.editRecord(protoSean.id)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>

                    <button
                      style={{ marginLeft: "10px",
                      width:"80px" }}
                      onClick={() => this.deleteRecord(protoSean.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="list-item-2">
            <h3 className="text-center">Add record</h3>
            <div className="row">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Visitor:</label>
                    <input
                      name="visitor"
                      className="form-control textbox"
                      value={this.state.visitor}
                      onChange={this.changeVisitorHandeler}
                    />
                  </div>

                  <div className="form-group">
                    <label>License Plate:</label>
                    <input
                      name="License Plate"
                      className="form-control textbox"
                      value={this.state.numberPlate}
                      onChange={this.changeNumberPlateHandeler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="phone"
                      name="phnNumber"
                      className="form-control textbox"
                      value={this.state.phnNumber}
                      onChange={this.changePhnNumberHandeler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Host Email:</label>
                    <input type="email"
                      name="hostEmail"
                      className="form-control textbox"
                      value={this.state.hostEmail}
                      onChange={this.changeHostEmailHandeler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Expected At:</label>
                    <TextField
                      id="expectedAtDateTime"
                      type="datetime-local"
                      value={this.state.expectedAt}
                      onChange={this.changeExpectedAtHandeler}
                      className={"form-control textbox"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {/* <input
                    name="expectedAt"
                    className="form-control textbox"
                    value={this.state.expectedAt}
                    onChange={this.changeExpectedAtHandeler}
                  /> */}
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveRecords}
                  >
                    Add Record
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListRecordsComponent;
