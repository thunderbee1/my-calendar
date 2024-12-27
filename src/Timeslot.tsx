import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
import EventModal from './EventModal';
import { timeList } from './lib';
import RemoveModal from './RemoveModal';
import dayjs from 'dayjs';
import { Event, State } from './interface';

type Props = {
    time: string;
    idx: number;
    startTime: number;
    endTime: number;
    selectedDay: number;
    startDate: string;
    events: Record<string, Event[]>;
}

function Timeslot({ time, idx, startTime, endTime, selectedDay, startDate, events }: Props) {
    const dispatch = useDispatch();
    const select = useSelector((state: State) => state.select);
    const start = (day: number) => {
        console.log('down')
        console.log(time, idx)
        dispatch({
            type: "SETSTART",
            payload: {start: idx, day}
        })
    };
    const move = () => {
        if (select) {
            console.log('move')
            console.log(time, idx)
            dispatch({
                type: "SETMOVE",
                payload: {end: idx}
            })
        }
    }
    const end = () => {
        if (startTime === null) return;
        console.log('up')
        console.log(time, idx)
        console.log(startTime, endTime)
        dispatch({
            type: "SETEND",
            payload: {end: idx}
        })
        handleShow();
    }

    const dummyEvent = {
        id: "",
        name: "",
        startTime: -1,
        endTime: -1,
    }
    const [selectedEvent, setSelectedEvent] = useState(dummyEvent);

    const handleClick = (day: number) => {
        console.log(getEvent(day))
        setSelectedEvent(getEvent(day) ?? dummyEvent)
        setRemoveDay(day);
        handleShowRemove();
    }

    const days = [0,1,2,3,4,5,6]; // 일월화수목금토


    const getClassName = (day: number) => {
        let s = -1;
        let e = -1;
        if (day === selectedDay) {
            s = startTime;
            e = endTime;
            if (s == idx && e == idx) {
                return 'col start end'
            }
            if (s == idx && idx < e) {
                return 'col start'
            }
            if (s < idx && e == idx) {
                return 'col end'
            }
            if (s < idx && idx < e) {
                return 'col select'
            }
        }
        // const date = `${year}/${month}/${startDate+day}`
        const date = dayjs(startDate).add(day, 'day').format("YYYY/MM/DD")
        if (date in events) {
            for(const event of events[date]) {
                s = event.startTime;
                e = event.endTime;
                if (s == idx && e == idx) {
                    return 'col start end'
                }
                if (s == idx && idx < e) {
                    return 'col start'
                }
                if (s < idx && e == idx) {
                    return 'col end'
                }
                if (s < idx && idx < e) {
                    return 'col select'
                }
            }
        }

        return 'col border'
    }
    const getEventRange = (day: number) => {
        if (day === selectedDay && startTime == idx) {
            return `${timeList[startTime]} ~ ${timeList[endTime]}`
        }
        // const date = `${year}/${month}/${startDate+day}`
        const date = dayjs(startDate).add(day, 'day').format("YYYY/MM/DD")
        if (date in events) {
            for(const event of events[date]) {
                const s = event.startTime;
                const e = event.endTime;
                if (s == idx) {
                    return `${timeList[s]} ~ ${timeList[e]}`
                }
            }
        }
    }

    const getEventName = (day: number) => {
        // const date = `${year}/${month}/${startDate+day}`
        const date = dayjs(startDate).add(day, 'day').format("YYYY/MM/DD")
        if (date in events) {
            for(const event of events[date]) {
                const s = event.startTime;
                const e = event.endTime;
                const name = event.name;
                if (s == idx) {
                    return name;
                }
            }
        }
    }

    const getEventId = (day: number) => {
        // const date = `${year}/${month}/${startDate+day}`
        const date = dayjs(startDate).add(day, 'day').format("YYYY/MM/DD")
        if (date in events) {
            for(const event of events[date]) {
                const s = event.startTime;
                const e = event.endTime;
                const id = event.id;
                if (s <= idx && idx <= e) {
                    return id;
                }
            }
        }
    }

    const getEvent = (day: number) => {
        // const date = `${year}/${month}/${startDate+day}`
        const date = dayjs(startDate).add(day, 'day').format("YYYY/MM/DD")
        if (date in events) {
            for(const event of events[date]) {
                const s = event.startTime;
                const e = event.endTime;
                if (s <= idx && idx <= e) {
                    return event;
                }
            }
        }
    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        dispatch({
            type: "INITIALIZE"
        })
    };
    const handleSave = () => {
        // const date = `${year}/${month}/${startDate+selectedDay}`
        console.log(startDate)
        const date = dayjs(startDate).add(selectedDay, 'day').format("YYYY/MM/DD")
        const id = uuidv4();
        dispatch({
            type: "ADD",
            payload: {
                id,
                name,
                date,
                startTime,
                endTime
            }
        })
        handleClose();
    }
    const handleShow = () => setShow(true);

    const [showRemove, setShowRemove] = useState(false);
    const handleShowRemove = () => setShowRemove(true);
    const handleRemoveClose = () => setShowRemove(false);

    const [removeDay, setRemoveDay] = useState(0);

    const handleRemove = () => {
        const id = getEventId(removeDay)
        // const date = `${year}/${month}/${startDate+removeDay}`
        const date = dayjs(startDate).add(removeDay, 'day').format("YYYY/MM/DD")
        console.log(date)
        dispatch({
            type: "REMOVE",
            payload: {
                id,
                date,
            }
        })
        handleRemoveClose();
    }

    const [name, setName] = useState('')
    const handleChange = (e: any) => {
        setName(e.target.value)
        console.log(name)
    }

    return(
        <div className="container text-center">
            <div className="row">
                <div className="col timeslot">
                    {time}
                </div>
                {days.map((day) => 
                    getClassName(day) === 'col border' ?
                        (<div className={getClassName(day)} onMouseDown={() => start(day)} onMouseUp={end} onMouseMove={() => move()}>
                            <div className='event-name'>{getEventName(day)}</div>
                            <div className='event-name'>{getEventRange(day)}</div>
                        </div>)
                    : (<div className={getClassName(day)} onMouseDown={() => handleClick(day)} onMouseUp={end}>
                        <div className='event-name'>{getEventName(day)}</div>
                        <div className='event-name'>{getEventRange(day)}</div>
                    </div>)
                )}
            </div>
            <EventModal show={show} handleClose={handleClose} handleSave={handleSave} handleChange={handleChange} startTime={startTime} endTime={endTime} d={selectedDay}></EventModal>
            <RemoveModal show={showRemove} handleClose={handleRemoveClose} handleRemove={handleRemove} event={selectedEvent} d={removeDay}></RemoveModal>
        </div>
    )
}

export default Timeslot;