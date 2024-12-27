import { configureStore } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { act } from 'react';
import { Action, State } from './interface';

const initialState = {
    events: {},
    startDate: dayjs(getSunday(new Date())).format("YYYY/MM/DD"),
    start: -1,
    end: -1,
    day: -1,
    select: false
} as State

function getSunday(dt: Date) {
    const d = new Date(dt);
    const day = d.getDay()
    return new Date(d.setDate(d.getDate() - day))
  }

function addEvent(state: State, action: Action) {
    const id = action.payload.id;
    const name = action.payload.name;
    const date = action.payload.date;
    const startTime = action.payload.startTime;
    const endTime = action.payload.endTime;
    const newEvents = {...state.events};
    if (date in newEvents) {
        newEvents[date] = [...newEvents[date], {id, name, startTime, endTime}]
    } else {
        newEvents[date] = [{id, name, startTime, endTime}]
    }
    return newEvents
}

function removeEvent (state: State, action: Action) {
    const id = action.payload.id;
    const date = action.payload.date;
    const newEvents = {...state.events};
    newEvents[date] = newEvents[date].filter(event => event.id !== id);
    if (newEvents[date].length === 0) delete newEvents[date];
    return newEvents
}

function reducer(state: State = initialState, action: Action) {
    console.log(action.payload)
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                events: addEvent(state, action)
            }
        case 'REMOVE':
            return {
                ...state,
                events: removeEvent(state, action)
            }
        case 'SETSTARTDATE':
            return {
                ...state,
                startDate: action.payload.startDate
            }
        case 'SETSTART':
            return {
                ...state,
                start: action.payload.start,
                end: -1,
                day: action.payload.day,
                select: true
            }
        case 'SETMOVE':
            return {
                ...state,
                end: action.payload.end,
                select: true
            }
        case 'SETEND':
            return {
                ...state,
                end: action.payload.end,
                select: false
            }
        case 'INITIALIZE': 
            return {
                ...initialState,
                events: state.events,
                startDate: state.startDate,
            };
        default:
            return state;
    }
}

// Redux 저장소
let store = configureStore({reducer});

store.subscribe(() => console.log(store.getState()))

export default store