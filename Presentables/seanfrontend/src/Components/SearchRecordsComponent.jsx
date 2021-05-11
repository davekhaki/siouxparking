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
      <div className="record-search-wrapper">
        <TextField
          className="record-search-input"
          label="Search"
          value={this.props.keyword}
          onInput={this.props.changeRecordInputHandler}
        />
        <FormControl className="record-search-select">
          <InputLabel> </InputLabel>
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
    );
  }
}

export default SearchRecordsComponent;
