import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

class AddRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visitor: "",
      numberPlate: "",
      phnNumber: "",
    };
    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.saveRecords = this.saveRecords.bind(this);
  }

  saveRecords = (e) => {
    e.preventDefault();
    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
    };
    console.log("protoSean =>" + JSON.stringify(protoSean));

    ProtoSeanService.addRecords(protoSean);
    this.setState({
      visitor: "",
      numberPlate: "",
      phnNumber: "",
    });
    window.location.reload(false);
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
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Add records</h2>
        <div className="row">
          <div className="col-md-11 offset-md-1 offset-md-1 ">
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
                    name="phnNumber"
                    className="form-control textbox"
                    value={this.state.phnNumber}
                    onChange={this.changePhnNumberHandeler}
                  />
                </div>

                <button className="btn btn-success" onClick={this.saveRecords}>
                  Add Record
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecordsComponent;
