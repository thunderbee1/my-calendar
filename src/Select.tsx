import { createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { timeList } from './lib';

type Props = {
    value: number;
    handleChangeTime: any;
}

function Select({value, handleChangeTime}: Props) {
  return (
    <Form.Select
      value={value}
      style={{
        width:"30%",
        display: "inline"
      }}
      onChange={handleChangeTime}
    >
      {timeList.map((item, i) =>
        (<option value={i}>{item}</option>)
      )}
    </Form.Select>
  );
}

export default Select;