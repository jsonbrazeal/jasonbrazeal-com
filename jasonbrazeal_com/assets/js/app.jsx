import 'normalize.css';
import css from '../css/main.css';
import loader from '../css/loader.css';
import nav from '../css/nav.css'
import icons from 'font-awesome/css/font-awesome.css'

import React from 'react';

// # TODO

// * design/code/deploy bubbles graphic

// * submenu (work)
// * skills graphic
// * experience/education graphic (same component, different state/props?)

// * submenu (same as work, portfolio state/props)
// * projects container (6 of 'em)
// * project
// * articles container (maybe combine with snippets)
// * article
// * snippets container
// * snippets

export class App extends React.Component {
   render() {
      return (
        <React.Fragment>
          <NavMenu />
          <div className={nav.container} id={nav.c1} >
            <div className={nav.container} id={nav.c2} >
              <div className={nav.container} id={nav.c3} >
                <Page pageNum="1" pageTitle="Home" pageIcon={icons["fa-home"]} />
                <Page pageNum="2" pageTitle="Work" pageIcon={icons["fa-suitcase"]} />
                <Page pageNum="3" pageTitle="Portfolio" pageIcon={icons["fa-laptop"]} />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
   }
}

export class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subnavItems: []
      }
      if (this.props.pageTitle === 'Work') {
        this.state.subnavItems = ['Skills', 'Experience', 'Education'];
       } else if (this.props.pageTitle === 'Portfolio') {
        this.state.subnavItems = ['Projects', 'Articles', 'Code Snippets'];
       }
    }

    render() {
      return (
        <div className={nav.page} id={nav[`p${this.props.pageNum}`]}>
          <Header className={this.state.subnavItems.length == 0 ? '' : nav.shiftedRight} />
          <section className={nav.icon}>
            <span className={[nav.title, icons.fa, this.props.pageIcon].join(" ")}>{this.props.pageTitle}</span>
            {this.state.subnavItems.length > 0 && <SubNavMenu items={this.state.subnavItems} />}
          </section>
          {this.state.subnavItems.length == 0 && <Footer />}
        </div>
      );
   }
}

export class NavMenu extends React.Component {
   render() {
      return (
        <ul className={nav.menu}>
          <a href=""><li id={nav.uno} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-home"]].join(" ")}></li></a>
          <a href=""><li id={nav.dos} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-suitcase"]].join(" ")}></li></a>
          <a href=""><li id={nav.tres} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-laptop"]].join(" ")}></li></a>
        </ul>
      );
   }
}

export class SubNavMenu extends React.Component {
   render() {
      if (this.props.items) {
        return (
          <section className={nav.subnav}>
            <ul className={nav.subnavList}>
              {this.props.items.map(function(item, i){
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </section>
        );
      } else {
        return;
      }
   }
}

export class Header extends React.Component {
   render() {
    return <header className={this.props.className}>header</header>
   }
}

export class Footer extends React.Component {
   render() {
    return <footer className={this.props.className}>footer</footer>
   }
}

// for reference:

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


// export class NoteSearch extends React.Component {

//   constructor(props) {
//     super(props);
//     // set up "this" for the handle change function
//     this.handleChange = this.handleChange.bind(this);
//     // this.componentDidMount = this.componentDidMount.bind(this);
//     this.state = {
//       searchString: '',
//       notes: [],
//       matches: [],
//       url: window.location.pathname
//     };
//   }

//    componentWillMount() {
//     this.fetchNotes();
//    }

//   // componentDidMount() {
//   // }

//   // componentWillReceiveProps: function(nextProps){
//   // }

//    // componentWillUnmount() {
//    // }

//   fetchNotes() {
//     fetch(this.state.url, {
//       headers:  {
//         'Accept': 'application/json',
//         'Cache-Control': 'no-cache'
//       }}).then((response) => {
//       if(response.ok) {
//         return response.json();
//       }
//       throw new Error('response status: ' + response.status);
//     }).then((data) => { // if you use a regular function call instead of the arrow,
//       this.setState({ // "this" won't work correctly
//         notes: data['notes'],
//         matches: data['notes'],
//         pathLinks: data['path_links']
//       });
//     }).catch((error) => {
//       console.log(error)
//     });
//   }

//   // path_links = {}
//   //   for i, d in enumerate(relpath.split('/')):
//   //       path_links[d] = ''.join([f'/{folder}' for folder in relpath.split('/')[:(i + 1)]])

//   // sets state, triggers render method
//   handleChange(event){
//     var searchString = event.target.value.trim().toLowerCase();
//     // grab value from input box
//     this.setState({
//       searchString: searchString,
//     });
//     // filter notes list by value from input box
//     if(searchString.length > 0){
//       var matches = this.state.notes.filter((note) => {
//         return note.name.toLowerCase().match(searchString);
//       });
//       this.setState({
//         matches: matches
//       });
//     } else {
//       this.setState({
//         matches: this.state.notes
//       });
//     }
//   }

//   render() {
//     if (!this.state.notes.length) {
//       return null
//     } else {
//       return (
//         <div>
//         <h2>
//           <a href="/notes">notes</a>
//           { window.location.pathname.replace(/(^\/)|(\/$)/g, "").split('/').map((dir, i) => {
//               if (dir == 'notes') {
//                 return null
//               } else {
//                 return (
//                   <span key={ i }>/<a href={ `/notes${this.state.pathLinks[dir]}` }>{ dir }</a></span>
//                 )
//               }
//           }) }
//         </h2>
//           <input id="search" value={this.state.searchString} onChange={this.handleChange} type="search" placeholder="Search" autoComplete="off" />
//           <ul id="files" className={styles['view-tiles']}>
//             { this.state.matches.map((note, i) => {
//               return (
//                 <li key={ i }>
//                   <a href={ `${this.state.url}${note.name}` } title={ `${note.name}` } className={ note.type == 'dir' && styles['bg-info'] }>
//                     <span className={styles.name}>{ note.name }</span>
//                   </a>
//                 </li>
//               );
//             }) }
//           </ul>
//         </div>
//       )
//     }
//   }

// };
