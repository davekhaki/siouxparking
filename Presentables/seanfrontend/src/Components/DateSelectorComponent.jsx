import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelectorComponent({passDate}) {
  const [selectedDate, setSelectedDate] = useState();
  

  useEffect(() => {
    if(selectedDate != null) {
      console.log("date changed")
      console.log(selectedDate)
    }
  }, [selectedDate]);

  function monthFormatter(currentMonth){
    if(currentMonth >= 10) {
      return currentMonth;
    }
    else {
     return "0" + currentMonth;
    }
  }

  function dayFormatter(currentDay){
    if(currentDay >= 10) {
      return currentDay;
    }
    else {
     return "0" + currentDay;
    }
  }

  

  return (
    <div>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={selectedDate}
        onChange={date => {
          setSelectedDate(date);
          passDate(date.getFullYear() + "-" + monthFormatter(date.getMonth()) + "-" + dayFormatter(date.getDate()))
        } }
        filterDate={date => date.getDay() != 6 && date.getDay() != 0}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}

export default DateSelectorComponent;
