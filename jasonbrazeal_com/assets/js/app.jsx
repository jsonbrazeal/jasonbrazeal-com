import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// //// import 1
// // import { App } from './app.jsx'; - in main.js
// class App extends React.Component {
//    render() {
//       return (
//          <h1>Hello, World from app.jsx!</h1>
//       );
//    }
// }

// module.exports = { App };

// //// import 2
// // import App from './app.jsx'; - in main.js
// export class App extends React.Component {
//    render() {
//       return (
//          <h1>Hello, World from app.jsx!</h1>
//       );
//    }
// }
//  export var test = 'test';

// export class DynamicSearch extends React.Component {

//   constructor() {
//     super();
//     // set up "this" for the handle change function
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       searchString: ''
//     };
//   }

//   // sets state, triggers render method
//   handleChange(event){
//     // grab value form input box
//     this.setState({searchString:event.target.value});
//     console.log("scope updated!");
//   }

//   render() {
//     var countries = this.props.items;
//     var searchString = this.state.searchString.trim().toLowerCase();

//     // filter countries list by value from input box
//     if(searchString.length > 0){
//       countries = countries.filter(function(country){
//         return country.name.toLowerCase().match(searchString);
//       });
//     }

//     return (
//       <div>
//         <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search!" />
//         <ul>
//           { countries.map(function(country, i){
//             return <li key={i}>{country.name}</li>
//           }) }
//         </ul>
//       </div>
//     )
//   }

// };

// // list of countries, defined with JavaScript object literals
// export var countries = [
//   {"name": "Sweden"}, {"name": "China"}, {"name": "Peru"}, {"name": "Czech Republic"},
//   {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
//   {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
//   {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
//   {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
//   {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
//   {"name": "Spain"}, {"name": "Poland"}, {"name": "Haiti"}
// ];


export class NoteSearch extends React.Component {

  constructor(props) {
    super(props);
    // set up "this" for the handle change function
    this.handleChange = this.handleChange.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      searchString: '',
      notes: [],
      matches: [],
      url: window.location.pathname
    };
  }

   componentWillMount() {
    this.fetchNotes();
   }

  // componentDidMount() {
  // }

  // componentWillReceiveProps: function(nextProps){
  // }

   // componentWillUnmount() {
   // }

  fetchNotes() {
    fetch(this.state.url, {
      headers:  {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }}).then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('response status: ' + response.status);
    }).then((data) => { // if you use a regular function call instead of the arrow,
      this.setState({ // "this" won't work correctly
        notes: data['notes'],
        matches: data['notes'],
        pathLinks: data['path_links']
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  // path_links = {}
  //   for i, d in enumerate(relpath.split('/')):
  //       path_links[d] = ''.join([f'/{folder}' for folder in relpath.split('/')[:(i + 1)]])

  // sets state, triggers render method
  handleChange(event){
    var searchString = event.target.value.trim().toLowerCase();
    // grab value from input box
    this.setState({
      searchString: searchString,
    });
    // filter notes list by value from input box
    if(searchString.length > 0){
      var matches = this.state.notes.filter((note) => {
        return note.name.toLowerCase().match(searchString);
      });
      this.setState({
        matches: matches
      });
    } else {
      this.setState({
        matches: this.state.notes
      });
    }
  }

  render() {
    if (!this.state.notes.length) {
      return null
    } else {
      return (
        <ReactCSSTransitionGroup
          transitionName='transition'
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={true}
          transitionEnterTimeout={1000}
          transitionLeave={true}
          transitionLeaveTimeout={1000}>
        <div>
        <h2>
          <a href="/notes">notes</a>
          { window.location.pathname.replace(/(^\/)|(\/$)/g, "").split('/').map((dir, i) => {
              if (dir == 'notes') {
                return null
              } else {
                return (
                  <span key={ i }>/<a href={ `/notes${this.state.pathLinks[dir]}` }>{ dir }</a></span>
                )
              }
          }) }
        </h2>
          <input id="search" value={this.state.searchString} onChange={this.handleChange} type="search" placeholder="Search" autoComplete="off" />
          <ul id="files" className="view-tiles">
            { this.state.matches.map((note, i) => {
              return (
                <li key={ i }>
                  <a href={ `${this.state.url}${note.name}` } title={ `${note.name}` } className={ note.type == 'dir' && "bg-info" }>
                    <span className="name">{ note.name }</span>
                  </a>
                </li>
              );
            }) }
          </ul>
        </div>
        </ReactCSSTransitionGroup>
      )
    }
  }

};
