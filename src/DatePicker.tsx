import React from "react";
import dayjs from "dayjs";
import { useState } from "react";

import { DateRange, DayPicker, OnSelectHandler } from "react-day-picker";
import "react-day-picker/style.css";
import { useSelector } from "react-redux";
import { State } from "./interface";

type Props = {
  selected: Date,
  handleSelect: (a: Date) => void;
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
}

function DatePicker({selected, handleSelect, month, setMonth}: Props) {
  const events = useSelector((state: State) => state.events);
  const bookedDays = Object.keys(events).map(dt=>dayjs(dt).toDate());

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      modifiers={{
        booked: bookedDays
      }}
      modifiersClassNames={{
        booked: "booked"
      }}
      required
      month={month}
      onMonthChange={setMonth}
    />
  );
}

export default DatePicker;