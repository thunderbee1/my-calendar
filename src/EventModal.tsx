import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { timeList } from './lib';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';
import { State } from './interface';
import Select from './Select';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleSave: () => void;
    handleChange: (e:any) => void;
    d: number;
    startTime: number;
    endTime: number;
}

function EventModal ({ show, handleClose, handleSave, handleChange, d, startTime, endTime }: Props) {
    // const year = useSelector(state => state.year);
    // const month = useSelector(state => state.month)
    const startDate = useSelector((state: State) => state.startDate);
    const getDate = (d: number) => {
        return dayjs(startDate).add(d, 'day')
    }
    const year = getDate(d).year()
    const month = getDate(d).month()
    const date = getDate(d).date()

    const dispatch = useDispatch();
    const start = useSelector((state: State)=>state.start);
    const end = useSelector((state: State)=>state.end);

    const handleChangeStart = (e: any) => {
        console.log("change start")
        console.log(e.target.value)
        dispatch({
            type: "SETSTART",
            payload: {start: Number(e.target.value), day: d}
        })
        dispatch({
            type: "SETEND",
            payload: {end: Number(e.target.value)}
        })
    }

    const handleChangeEnd = (e: any) => {
        console.log("change end")
        console.log(e.target.value)
        dispatch({
            type: "SETEND",
            payload: {end: Number(e.target.value)}
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Form.Control size="lg" type="text" placeholder="제목 추가" onChange={handleChange}/>
            </Modal.Header>
            <Modal.Body>
                {year}년 {month}월 {date}일
                <Select value={startTime} handleChangeTime={handleChangeStart}></Select>~
                <Select value={endTime} handleChangeTime={handleChangeEnd}></Select>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal