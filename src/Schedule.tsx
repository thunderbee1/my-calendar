import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Timeslot from './Timeslot';
import { useDispatch, useSelector } from 'react-redux';
import { timeList } from './lib';
import DatePicker from './DatePicker';
import dayjs from 'dayjs';
import { State } from './interface';


function Schedule() {
    const startDate = useSelector((state: State)=>state.startDate);
    const startTime = useSelector((state: State) => state.start);
    const endTime = useSelector((state: State) => state.end);
    const selectedDay = useSelector((state: State) => state.day);
    // const year = useSelector(state => state.year);
    // const month = useSelector(state => state.month);
    const events = useSelector((state: State) => state.events);

    const getDate = (d: number) => {
        return dayjs(startDate).add(d, 'day')
    }

    // const month = dayjs(startDate).toDate();
    const [month, setMonth] = useState(dayjs(startDate).toDate());

    const [selected, setSelected] = useState(new Date());
    const dispatch = useDispatch();
    const getSunday = (dt: any) => {
      const d = new Date(dt);
      const day = d.getDay()
      return new Date(d.setDate(d.getDate() - day))
    }
    const handleSelect = (e: any) => {
      console.log(e)
      setSelected(e)
      const startDate = dayjs(getSunday(e)).format("YYYY/MM/DD")
      dispatch({
        type: "SETSTARTDATE",
        payload: {
          startDate
        },
      })
    }

    return(
        <>
            <DatePicker selected={selected} handleSelect={handleSelect} month={month} setMonth={setMonth}></DatePicker>
            <Header startDate={startDate} setSelected={setSelected} setMonth={setMonth}></Header>
            <div className="box">
              {timeList.map((item, i) => (
                  <Timeslot
                      time={item}
                      idx={i}
                      startTime={startTime}
                      endTime={endTime}
                      selectedDay={selectedDay}
                      startDate={startDate}
                      events={events}
                  ></Timeslot>
              ))}
            </div>
        </>

    )
}

export default Schedule;