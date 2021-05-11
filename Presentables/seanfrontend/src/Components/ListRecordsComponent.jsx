import React, { Component, useCallback, useState } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

import TextField from "@material-ui/core/TextField";
import SearchRecordsComponent from "./SearchRecordsComponent";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import DateSelectorComponent from "./DateSelectorComponent";

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
      arrived: "",
      currentDateTime: new Date(),
      isAscending: false,
      keyword: "",
      type: 1,
      hasMore: false,
      isRecord: false,
      selectedDate: "",
      hasWhatsApp: 0,
      // currentPage: 1,
      // recordsPerPage: 10,
    };

    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.changeHostEmailHandeler = this.changeHostEmailHandeler.bind(this);
    this.changeExpectedAtHandeler = this.changeExpectedAtHandeler.bind(this);
    this.changeRecordInputHandler = this.changeRecordInputHandler.bind(this);
    this.changeRecordSelectHandler = this.changeRecordSelectHandler.bind(this);
    this.changeHasWhatsAppHandler = this.changeHasWhatsAppHandler.bind(this);
    this.saveRecords = this.saveRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.dateSelectorReceive = this.dateSelectorReceive.bind(this);
    //this.changeDateSelection = this.changeDateSelection.bind(this);
  }

  validateEmail(email) {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      console.log("good email");
      this.setState({ hostEmail: email });
      return true;
    } else {
      console.log("bad email");
      alert("Email must have an @ and a .");
      return false;
    }
  }

  validatePhoneNumber(number) {
    const pattern = /^\d+$/;
    const result = pattern.test(number);
    if (result === true) {
      console.log("good phone");
      this.setState({ phnNumber: number });
      return true;
    } else {
      console.log("bad phone");
      alert("Phone number must only be numbers");
      return false;
    }
  }

  saveRecords = (e) => {
    e.preventDefault();

    if (!this.validateEmail(this.state.hostEmail)) return;
    if (!this.validatePhoneNumber(this.state.phnNumber)) return;

    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
      hostEmail: this.state.hostEmail,
      expectedAt:
        this.state.expectedAt.split("T")[0] +
        " " +
        this.state.expectedAt.split("T")[1],
      hasWhatsApp: this.state.hasWhatsApp,
    };

    ProtoSeanService.addRecords(protoSean);
    this.setState({
      visitor: "",
      numberPlate: "",
      phnNumber: "",
      hostEmail: "",
      expectedAt: "",
      hasWhatsApp: 0,
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

  changeHasWhatsAppHandler = (event) => {
    if (event.target.checked) {
      this.setState({
        hasWhatsApp: 1,
      });
    } else {
      this.setState({
        hasWhatsApp: 0,
      });
    }
  };

  changeRecordInputHandler = (event) => {
    this.setState({ keyword: event.target.value }, () => {
      this.getAllRecords();
    });
  };

  changeRecordSelectHandler = (event) => {
    this.setState({ type: event.target.value }, () => {
      this.getAllRecords();
    });
  };

  //changeDateSelection = (event) => {
  //this.setState({ selectedDate: event.target.value }, () => {});
  //};

  componentDidMount() {
    this.getAllRecords();
  }

  getAllRecords = () => {
    //if selectedDate is 0, else return selected date records, gotta add into API
    const { keyword, type, selectedDate } = this.state;
    this.setState({ isRecord: false });
    ProtoSeanService.getRecords(keyword, type, selectedDate).then((res) => {
      this.setState({ records: res.data });
      console.log(this.state.records);
      this.setState({ isRecord: true });
    });
  };

  addRecord() {
    this.props.history.push("/add-record");
  }

  sortBy(key) {
    var variable = this.state.records.sort();
    console.log(variable);

    if (this.state.isAscending) {
      this.setState({
        records: this.state.records.sort((a, b) => (a[key] < b[key] ? 1 : -1)),
      });
      this.setState({
        isAscending: false,
      });
    } else {
      this.setState({
        records: this.state.records.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
      });
      this.setState({
        isAscending: true,
      });
    }
  }

  dateSelectorReceive(date) {
    console.log(date);
    this.setState({selectedDate: date});
  }

  render() {
    return (
      <div>
        <div className="row list-row records-table">
          <SearchRecordsComponent
            keyword={this.state.keyword}
            type={this.state.type}
            changeRecordInputHandler={this.changeRecordInputHandler}
            changeRecordSelectHandler={this.changeRecordSelectHandler}
          />
          <h3>Records</h3>
          <DateSelectorComponent passDate = {this.dateSelectorReceive}/>
          <table className="table table-striped table-borderless list-item-1">
            <thead>
              <tr>
                <th> Status </th>
                <th
                  onClick={() => {
                    this.sortBy("visitor");
                  }}
                >
                  {" "}
                  Visitor{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("numberPlate");
                  }}
                >
                  {" "}
                  License Plate{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("phnNumber");
                  }}
                >
                  {" "}
                  Phone Number{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("hostEmail");
                  }}
                >
                  Host Email{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("expectedAt");
                  }}
                >
                  {" "}
                  Expected At{" "}
                </th>
                <th> Actions </th>
              </tr>
            </thead>

            <tbody>
              {this.state.isRecord && (
                <InfiniteScrollComponent
                  records={this.state.records}
                  currentDateTime={this.state.currentDateTime}
                />
              )}
            </tbody>
          </table>
          <div className="list-item-2">
            <h3 className="text-center">Add Record</h3>
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
                    <input
                      type="email"
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
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="hasWhatsApp"
                      value={this.state.hasWhatsApp}
                      onChange={this.changeHasWhatsAppHandler}
                    />{" "}
                    Has WhatsApp? (Check the box, if the visitor has a WhatsApp)
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
