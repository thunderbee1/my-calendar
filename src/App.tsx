import React from 'react';
import './App.css';
import Schedule from './Schedule';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import DatePicker from './DatePicker';
import { useState } from 'react';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Schedule></Schedule>
      </div>
    </Provider>
  );
}

export default App;
