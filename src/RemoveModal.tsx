import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { timeList } from './lib';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import React from 'react';
import {Event, State} from './interface'
import dayjs from 'dayjs';


type Props = {
    show: boolean;
    handleClose: () => void;
    handleRemove: () => void;
    event: Event;
    d: number;
}

function RemoveModal ({ show, handleClose, handleRemove, event, d }: Props) {
    // const year = useSelector(state => state.year);
    // const month = useSelector(state => state.month);
    const startDate = useSelector((state: State) => state.startDate);
    const date = dayjs(startDate).add(d, 'day').format('YYYY년 MM월 DD일');
    const name = event.name;
    const startTime = event.startTime;
    const endTime = event.endTime;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                {name}
            </Modal.Header>
            <Modal.Body>{date} {timeList[startTime]} ~ {timeList[endTime]}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleRemove}>
                Remove
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveModal