import "normalize.css";
import css from "../css/main.css";
import loader from "../css/loader.css";
import nav from "../css/nav.css"
import graphics from "../css/graphics.css"
import animations from "../css/animations.css"
import icons from "font-awesome/css/font-awesome.css"
import jason from "../img/jason.jpeg"

import React from "react";

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavMenu />
        <div className={nav.container} id={nav.c1} >
          <div className={nav.container} id={nav.c2} >
            <div className={nav.container} id={nav.c3} >
              <HomePage />
              <WorkPage />
              <PortfolioPage />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export class HomePage extends React.Component {
  render() {
    return (
      <Page pageNum="1" pageTitle="Home">
        <DesignCodeDeployGraphic />
        <Footer />
      </Page>
    )
  }
}

export class WorkPage extends React.Component {
  render() {
    return (
      <Page pageNum="2" pageTitle="Work" subNavItems={["skills", "experience", "education", "résumé"]}>
        <SkillsGraphic />
        <WorkCardContainer subject="Experience" />
        <WorkCardContainer subject="Education" />
      </Page>
    )
  }
}

export class PortfolioPage extends React.Component {
  render() {
    return (
      <Page pageNum="3" pageTitle="Portfolio" subNavItems={["projects", "articles", "code snippets"]}>
      <ProjectCardContainer />
      <CodeSnippetContainer />
      <ArticleContainer />
      </Page>
    )
  }
}

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true
    };

  }

  hideHeader() {
    this.setState({
      showHeader: false
    });
  }

  showHeader() {
    this.setState({
      showHeader: true
    });
  }

  render() {
    return (
      <div className={this.props.pageTitle === "Home" ? nav.page : [nav.page, nav.shiftedRight].join(' ')} id={nav[`p${this.props.pageNum}`]}>
        <Header h1={this.props.pageTitle === "Home" ? "Jason Brazeal" : this.props.pageTitle} visible={this.state.showHeader}>
          {this.props.pageTitle === "Home" && <Typewriter words={['Software', 'Eng']} />}
        </Header>
        <section>
          {this.props.children}
        </section>
        {this.props.pageTitle === "Home" || <SubNavMenu items={this.props.subNavItems} pageNum={this.props.pageNum} pageCallback={this.state.showHeader ? () => this.hideHeader() : () => this.hideHeader()} />}
      </div>
    );
  }
}

export class NavMenu extends React.Component {
  handleClick(e, id) {
    e.preventDefault();
    if (id == nav.uno) {
      document.getElementById(nav.p2).classList.remove(nav.pageIn);
      document.getElementById(nav.p3).classList.remove(nav.pageIn);
      document.getElementById(nav.p1).classList.remove(nav.pageFaded);
      document.getElementById(nav.p1).classList.remove(nav.blurry);
    } else if (id == nav.dos) {
      document.getElementById(nav.p2).classList.add(nav.pageIn);
      document.getElementById(nav.p3).classList.remove(nav.pageIn);
      document.getElementById(nav.p1).classList.add(nav.pageFaded);
      document.getElementById(nav.p1).classList.add(nav.blurry);
    } else if (id == nav.tres) {
      document.getElementById(nav.p2).classList.remove(nav.pageIn);
      document.getElementById(nav.p3).classList.add(nav.pageIn);
      document.getElementById(nav.p1).classList.add(nav.pageFaded);
      document.getElementById(nav.p1).classList.add(nav.blurry);
    }
  }

  render() {
    return (
      <ul className={nav.menu}>
        <a href="" onClick={(e) => this.handleClick(e, nav.uno)}><li id={nav.uno} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-home"]].join(" ")}></li></a>
        <a href="" onClick={(e) => this.handleClick(e, nav.dos)}><li id={nav.dos} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-suitcase"]].join(" ")}></li></a>
        <a href="" onClick={(e) => this.handleClick(e, nav.tres)}><li id={nav.tres} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-laptop"]].join(" ")}></li></a>
      </ul>
    );
  }
}

export class SubNavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'open',
      classList: [nav.subNav, animations.fadeIn]
    };
  }

  handleClick(e, item) {
    if (this.state.status == 'open') {
      this.setState({
        status: 'closed',
        classList: [nav.subNav, animations.fadeOut]
      });
    } else if (this.state.status == 'closed') {
      this.setState({
        status: 'open',
        classList: [nav.subNav, animations.fadeIn]
      });
    }
    this.props.pageCallback();
  }

  render() {
    return (
      <section className={this.state.classList.join(' ')}>
        <ul className={nav.subNavList}>
          {this.props.items.map((item, i) => {
            return <li key={i} onClick={(e) => this.handleClick(e, item)}>{item}</li>
          })}
        </ul>
      </section>
    );
  }
}

export class Header extends React.Component {
  render() {
    return (
      <header className={this.props.visible ? '' : animations.fadeOut}>
        <h1>{this.props.h1}</h1>
        {this.props.children}
      </header>
    )
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <footer className={this.props.className}>
        <Contact />
        <RoundThumbnail className={nav.footerImage} src={jason} alt="photo of jason" />
        <Copyright />
      </footer>
    )
   }
}

export class Contact extends React.Component {
   render() {
    return(
      <div>
        <a href="https://www.github.com/jsonbrazeal">
            <span className={[icons.fa, icons["fa-github"]].join(" ")}></span>
        </a>
        <a href="https://www.twitter.com/jsonbrazeal">
            <span className={[icons.fa, icons["fa-twitter"]].join(" ")}></span>
        </a>
        <a href="https://www.linkedin.com/in/jsonbrazeal">
            <span className={[icons.fa, icons["fa-linkedin"]].join(" ")}></span>
        </a>
        <a href="mailto:hello@jasonbrazeal.com">
            <span className={[icons.fa, icons["fa-envelope"]].join(" ")}></span>
        </a>
      </div>
    )
  }
}

export class Copyright extends React.Component {
   render() {
    return(
      <div>
        <span className={[icons.fa, icons["fa-copyright"]].join(" ")}></span>
        2017 Jason Brazeal
      </div>
    )
  }
}

export class RoundThumbnail extends React.Component {
   render() {
    return(
      <div className={this.props.className} src={this.props.src} alt={this.props.alt}></div>
    )
  }
}

export class Typewriter extends React.Component {
   render() {
    return(
      <h2>{this.props.words.join(" ")}</h2>
    )
  }
}

export class DesignCodeDeployGraphic extends React.Component {
   render() {
    return(
      <div>
        <div className={graphics.bubble}>design</div>
        <div className={graphics.bubble}>code</div>
        <div className={graphics.bubble}>deploy</div>
        <hr />
      </div>
    )
  }
}

export class SkillsGraphic extends React.Component {
   render() {
    return(
      <div className={graphics.container}>
        <div className={graphics.bubble}>skills</div>
        <hr />
      </div>
    )
  }
}

export class WorkCardContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.workCardContainer].join(' ')}>
        <div>{this.props.subject}</div>
      </div>
    )
  }
}

export class ProjectCardContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.projectCardContainer].join(' ')}>
        <div>pcards</div>
      </div>
    )
  }
}

export class CodeSnippetContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.snippetContainer].join(' ')}>
        <div className={graphics.snippet}>snip1</div>
        <div className={graphics.snippet}>snip2</div>
        <div className={graphics.snippet}>snip3</div>
      </div>
    )
  }
}

export class ArticleContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.articleContainer].join(' ')}>
        <div className={graphics.article}>article1</div>
        <div className={graphics.article}>article2</div>
        <div className={graphics.article}>article3</div>
      </div>
    )
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
//       searchString: "",
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
//         "Accept": "application/json",
//         "Cache-Control": "no-cache"
//       }}).then((response) => {
//       if(response.ok) {
//         return response.json();
//       }
//       throw new Error("response status: " + response.status);
//     }).then((data) => { // if you use a regular function call instead of the arrow,
//       this.setState({ // "this" won"t work correctly
//         notes: data["notes"],
//         matches: data["notes"],
//         pathLinks: data["path_links"]
//       });
//     }).catch((error) => {
//       console.log(error)
//     });
//   }

//   // path_links = {}
//   //   for i, d in enumerate(relpath.split("/")):
//   //       path_links[d] = "".join([f"/{folder}" for folder in relpath.split("/")[:(i + 1)]])

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
//           { window.location.pathname.replace(/(^\/)|(\/$)/g, "").split("/").map((dir, i) => {
//               if (dir == "notes") {
//                 return null
//               } else {
//                 return (
//                   <span key={ i }>/<a href={ `/notes${this.state.pathLinks[dir]}` }>{ dir }</a></span>
//                 )
//               }
//           }) }
//         </h2>
//           <input id="search" value={this.state.searchString} onChange={this.handleChange} type="search" placeholder="Search" autoComplete="off" />
//           <ul id="files" className={styles["view-tiles"]}>
//             { this.state.matches.map((note, i) => {
//               return (
//                 <li key={ i }>
//                   <a href={ `${this.state.url}${note.name}` } title={ `${note.name}` } className={ note.type == "dir" && styles["bg-info"] }>
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
