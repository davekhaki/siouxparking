import React, { Component } from "react";
import ProtoSeanService from "../Services/ProtoSeanService";

class ListRecordsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      protoSean: [],
    };
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  editRecord(id) {
    this.props.history.push(`/update-record/${id}`);
  }

  deleteRecord(id) {
    ProtoSeanService.deleteRecord(id).then((res) => {
      this.setState({
        protoSean: this.state.protoSean.filter(
          (protoSean) => protoSean.id !== id
        ),
      });
    });
  }

  componentDidMount() {
    ProtoSeanService.getRecords().then((res) => {
      this.setState({ protoSean: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Records</h2>
        <div className="row">
          <table className="table table-striped   table-borderless ">
            <thead>
              <tr>
                <th> Visitor </th>
                <th> License Plate </th>
                <th> Phone Number </th>
                <th> Actions </th>
              </tr>
            </thead>

            <tbody>
              {this.state.protoSean.map((protoSean) => (
                <tr key={protoSean.id}>
                  <td>{protoSean.visitor}</td>
                  <td>{protoSean.numberPlate}</td>
                  <td>{protoSean.phnNumber}</td>
                  <td>
                    {/*<button
                      onClick={() => this.editRecord(protoSean.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>*/}
                    <button
                      onClick={() => this.deleteRecord(protoSean.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListRecordsComponent;
