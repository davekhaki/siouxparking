import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelectorComponent({passDate}) {
  const [selectedDate, setSelectedDate] = useState();
  

  useEffect(() => {
    if(selectedDate != null) {
      console.log("date changed")
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
          console.log(date)
          if(date == null) {
            passDate("");
          } else {
            passDate(date.getFullYear() + "-" + monthFormatter(date.getMonth() + 1) + "-" + dayFormatter(date.getDate()));
          }


          

        } }
        filterDate={date => date.getDay() != 6 && date.getDay() != 0}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}

export default DateSelectorComponent;
