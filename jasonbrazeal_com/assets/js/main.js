// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.css';
import '../css/main.css';
// import '../css/pygments.css';
import { render } from 'react-dom';
import React from 'react';

//////////////////// react example 1
//// import 1
// import { App, test } from './app.jsx';
// this version requires in jsx:
// class App extends React.Component {...
// module.exports = { App };
// or:
// export class App extends React.Component {...

//// import 2 - use default to export a single value or to have a fallback value for our module
//// default can't be used with var, let or const, and there can only be one per script
// import App from './app.jsx';
// this version requires in jsx:
// export default class App extends React.Component {...


// render(
//   <App />,
//   document.getElementById('main')
// );
//////////////////// react example 2
// import { DynamicSearch, countries } from './app.jsx'
// render(
//   <DynamicSearch items={ countries } />,
//   document.getElementById('main')
// );

//////////////////// react example 3
import { NoteSearch } from './app.jsx'

render(
  <NoteSearch />,
  document.getElementById('content')
);

// render(
// <NoteSearch />,
// document.getElementById('wrapper')
// );

//////////////////// other module example

var mod = require('./mod.js');
// // now use all the exports from mod

console.log(mod());
