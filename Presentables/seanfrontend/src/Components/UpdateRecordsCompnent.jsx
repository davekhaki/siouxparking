import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

class UpdateRecordsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      visitor: "",
      numberPlate: "",
      phnNumber: ""
    };
    this.changeVisitorHandler = this.changeVisitorHandler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
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

  updateRecord = (e) => {
    e.preventDefault();
    let record = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
    };
    console.log("record =>" + JSON.stringify(record));

    ProtoSeanService.updateRecord(record, this.state.id).then((res) =>{
      this.props.history.push('/records')
    })
  };

  changeVisitorHandler = (event) => {
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
            <h2 className="text-center">Update record</h2>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Visitor:</label>
                  <input
                    name="visitor"
                    className="form-control"
                    value={this.state.visitor}
                    onChange={this.changeVisitorHandler}
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
                  onClick={this.updateRecord}
                >
                  Save
                </button>

                <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
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
