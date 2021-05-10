import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelectorComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
    }
  }, [selectedDate]);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        filterDate={(date) => date.getDay() != 6 && date.getDay() != 0}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}

export default DateSelectorComponent;
