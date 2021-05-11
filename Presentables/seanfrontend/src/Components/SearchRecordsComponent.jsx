import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

class SearchRecordsComponent extends Component {
  render() {
    return (
      <div className="container record-search-wrapper list-item-1">
        <div className="row">
          <TextField
            className="record-search-input"
            label="Record keyword"
            value={this.props.keyword}
            onInput={this.props.changeRecordInputHandler}
          />
          <FormControl className="record-search-select">
            <InputLabel>Type</InputLabel>
            <Select
              value={this.props.type}
              onChange={this.props.changeRecordSelectHandler}
            >
              <MenuItem value={1}>Visitor</MenuItem>
              <MenuItem value={2}>License Plate</MenuItem>
              <MenuItem value={3}>Phone Number</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default SearchRecordsComponent;
