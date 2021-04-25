import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

class UpdateRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      visitor: "",
      numberPlate: "",
<<<<<<< Updated upstream
      phnNumber: "",
=======
      phnNumber: ""
>>>>>>> Stashed changes
    };
    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
<<<<<<< Updated upstream
    this.updateRecords = this.updateRecords.bind(this);
=======
    this.updateRecord = this.updateRecord.bind(this);
>>>>>>> Stashed changes
  }

  componentDidMount() {
    ProtoSeanService.getRecordById(this.state.id).then((res) => {
      let protoSean = res.data;
      this.setState({
        visitor: protoSean.visitor,
        numberPlate: protoSean.numberPlate,
        phnNumber: protoSean.phnNumber,
      });
    });
  }

  updateRecords = (e) => {
    e.preventDefault();
    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
    };
    console.log("protoSean =>" + JSON.stringify(protoSean));
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

  cancel() {
    this.props.history.push("/records");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 ">
            <h2 className="text-center">Add records</h2>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Visitor:</label>
                  <input
                    name="visitor"
                    className="form-control"
                    value={this.state.visitor}
                    onChange={this.changeVisitorHandeler}
                  />
                </div>

                <div className="form-group">
                  <label>License Plate:</label>
                  <input
                    name="License Plate"
                    className="form-control"
                    value={this.state.numberPlate}
                    onChange={this.changeNumberPlateHandeler}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    name="phnNumber"
                    className="form-control"
                    value={this.state.phnNumber}
                    onChange={this.changePhnNumberHandeler}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={this.updateRecords}
                >
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  ></button>
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

export default UpdateRecordsComponent;
