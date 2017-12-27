import React from 'react';
import { render } from 'react-dom';
import { App } from './app.jsx'

render(
  <App />,
  document.getElementById('app')
);

//////////////////// other module example
var mod = require('./mod.js');
//////////////////// now use all the exports from mod

console.log(mod());
