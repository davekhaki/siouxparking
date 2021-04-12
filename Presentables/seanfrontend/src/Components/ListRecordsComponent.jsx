import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

class ListRecordsComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      records: [],
      visitor: "",
      numberPlate: "",
      phnNumber: ""
    }

    this.changeVisitorHandeler = this.changeVisitorHandeler.bind(this);
    this.changeNumberPlateHandeler = this.changeNumberPlateHandeler.bind(this);
    this.changePhnNumberHandeler = this.changePhnNumberHandeler.bind(this);
    this.saveRecords = this.saveRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  saveRecords = (e) => {
    e.preventDefault();
    let protoSean = {
      visitor: this.state.visitor,
      numberPlate: this.state.numberPlate,
      phnNumber: this.state.phnNumber,
    };
    // console.log("protoSean =>" + JSON.stringify(protoSean));

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

  deleteRecord(id) {
    ProtoSeanService.deleteRecord(id).then((res) => {
      this.setState({
        records: this.state.records.filter(
          (protoSean) => protoSean.id !== id
        ),
      });
    });
  }

  componentDidMount() {
    ProtoSeanService.getRecords().then((res) => {
      this.setState({ records: res.data });
      
    });
  }

  editRecord(id){
    this.props.history.push(`/update-record/${id}`);

  }

  addRecord(){
    this.props.history.push('/add-record')
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Records</h2>
        <div className="row list-row">
          <table className="table table-striped table-borderless list-item-1">
            <thead>
              <tr>
                <th> Visitor </th>
                <th> License Plate </th>
                <th> Phone Number </th>
                <th> Actions </th>
              </tr>
            </thead>

            <tbody>
              {this.state.records.map((protoSean) => (
                <tr key={protoSean.id}>
                  <td>{protoSean.visitor}</td>
                  <td>{protoSean.numberPlate}</td>
                  <td>{protoSean.phnNumber}</td>
                  <td>
                    <button
                      onClick={() => this.editRecord(protoSean.id)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>
                    
                    <button
                      style={{marginLeft: "10px"}}
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

                  <button className="btn btn-success" onClick={this.saveRecords}>
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
