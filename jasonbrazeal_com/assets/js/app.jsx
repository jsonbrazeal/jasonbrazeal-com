import "normalize.css";
import css from "../css/main.css";
import loader from "../css/loader.css";
import nav from "../css/nav.css"
import graphics from "../css/graphics.css"
import animations from "../css/animations.css"
import icons from "font-awesome/css/font-awesome.css"
import jason from "../img/jason.jpeg"

import utils from "./utils.js"
import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home"
    };
  }

  handleNav(newPage) {
    if (newPage.match('uno')) {
      var page = "Home"
    } else if (newPage.match('dos')) {
      var page = "Work"
    } else if (newPage.match('tres')) {
      var page = "Portfolio"
    }
    this.setState({
      currentPage: page
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavMenu onChangePage={(e, newPage) => {this.handleNav(e, newPage)}} />
        <div className={nav.container} id={nav.c1} >
          <div className={nav.container} id={nav.c2} >
            <div className={nav.container} id={nav.c3} >
              <HomePage active={this.state.currentPage === "Home"} />
              <WorkPage active={this.state.currentPage === "Work"} />
              <PortfolioPage active={this.state.currentPage === "Portfolio"} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubPage: null,
    };
  }

  handleSubPageNav(newHeader) {
    this.setState({
      activeSubPage: newHeader
    });
  }

  render() {
    return (
      <Page pageNum="1" pageTitle="Home" active={this.props.active} pageParentCallback={(e, newHeader) => this.handleSubPageNav(e, newHeader)} >
        <DesignCodeDeployGraphic />
        <Footer />
      </Page>
    )
  }
}

export class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubPage: null,
    };
  }

  handleSubPageNav(newHeader) {
    this.setState({
      activeSubPage: newHeader
    });
  }

  render() {
    return (
      <Page pageNum="3" pageTitle="Portfolio" active={this.props.active} pageParentCallback={(e, newHeader) => this.handleSubPageNav(e, newHeader)} subNavnewHeaders={["projects", "articles", "code snippets"]}>
        <ProjectCardContainer active={true} />
        <CodeSnippetContainer active={false} />
        <ArticleContainer active={false} />
      </Page>
    )
  }
}


export class WorkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubPage: null,
    };
  }

  handleSubPageNav(newHeader) {
    console.log('handleSubPageNav('+newHeader+')')
    this.setState({
      activeSubPage: newHeader.toLowerCase()
    });
  }

  render() {
    console.log('rendering WorkPage');
    return (
      <Page pageNum="2" pageTitle="Work" active={this.props.active} pageParentCallback={(e, newHeader) => this.handleSubPageNav(e, newHeader)} subNavnewHeaders={["skills", "experience", "education", "résumé"]}>
        <SkillsGraphic active={this.state.activeSubPage === "skills"} />
        <WorkCardContainer active={this.state.activeSubPage === "experience"} subject="Experience" />
        <WorkCardContainer active={this.state.activeSubPage === "education"} subject="Education" />
      </Page>
    )
  }
}

export class SkillsGraphic extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.active) {
      var classList = [graphics.container, animations.slideIn];
    } else {
      var classList = [graphics.container, animations.slideOut];
    }
    this.state = {
      classList: classList
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('SKILLSGRAPHIC componentWillReceiveProps('+nextProps+')')
    if (nextProps.active) {
      var classList = [graphics.container, animations.slideIn];
      } else {
      var classList = [graphics.container, animations.slideOut];
    }
    this.setState({
      classList: classList
    });
  }

   render() {
    console.log('rendering SkillsGraphic')
    return(
      <div className={this.state.classList.join(" ")}>
        <div className={graphics.bubbleSkill}>skills</div>
      </div>
    )
  }
}

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubNavMenu: true,
      showSubNavArrow: false,
      pageTitle: props.pageTitle,
      showHeaderClass: "",
      classList: props.pageTitle === "Home" ? [nav.page] : [nav.page, nav.shiftedRight],
      active: props.active
    };
  }

  replaceHeader(newHeader) {
    if (["projects", "articles", "code snippets"].includes(this.state.pageTitle.toLowerCase())) {
      newHeader = "Portfolio";
    } else if (["skills", "experience", "education", "r\u00e9sum\u00e9"].includes(this.state.pageTitle.toLowerCase())) {
      newHeader = "Work";
    }

    // handle subnav
    this.props.pageParentCallback(newHeader)

    // newHeader is the element to be placed in the h1
    this.setState({
      showSubNavArrow: false,
      showSubNavMenu: false,
      showHeaderClass: animations.fadeOut
    });

    if (["work", "portfolio"].includes(newHeader.toLowerCase())) {
      setTimeout(() => {
        this.setState({
          showSubNavArrow: false,
          showSubNavMenu: true,
          showHeaderClass: animations.fadeIn,
          pageTitle: utils.titleCase(newHeader)
        });
      }, 1000, newHeader);
    } else {
      setTimeout(() => {
        this.setState({
          showSubNavArrow: true,
          showSubNavMenu: false,
          showHeaderClass: animations.fadeIn,
          pageTitle: utils.titleCase(newHeader)
        });
      }, 1000, newHeader);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      if (this.props.pageNum === "1") {
          this.setState({
            classList: [nav.page],
            active: true
          });
      } else if (this.props.pageNum === "2" || this.props.pageNum === "3") {
        this.setState({
          classList: [nav.page, nav.shiftedRight, nav.pageIn],
          active: true
        });
      }
    } else {
      if (this.props.pageNum === "1") {
          this.setState({
            classList: [nav.page, nav.pageFaded, nav.blurry],
            active: false
          });
      } else if (this.props.pageNum === "2" || this.props.pageNum === "3") {
          this.setState({
            classList: [nav.page, nav.shiftedRight],
            active: false
          });
      }
      if (this.props.pageNum === "2" && this.state.pageTitle !== "Work") {
        this.replaceHeader("Work");
      }
      if (this.props.pageNum === "3" && this.state.pageTitle !== "Portfolio") {
        this.replaceHeader("Portfolio");
      }
    }
  }

  render() {
    console.log('rendering Page')
    return (
      <div className={this.state.classList.join(" ")} id={nav[`p${this.props.pageNum}`]}>
        <Header h1={this.state.pageTitle === "Home" ? "Jason Brazeal" : this.state.pageTitle} className={this.state.showHeaderClass}>
          {this.state.pageTitle === "Home" && <Typewriter words={["Software", "Eng"]} />}
          <SubNavArrow pageCallback={(e) => this.replaceHeader(e)} visible={this.state.showSubNavArrow} />
        </Header>
        <section>
          {this.props.children}
        </section>
        <SubNavMenu newHeaders={this.props.subNavnewHeaders} pageNum={this.props.pageNum} pageCallback={(e) => this.replaceHeader(e)} visible={this.state.showSubNavMenu} />
      </div>
    );
  }
}

export class NavMenu extends React.Component {
  handleClick(e, newPage) {
    e.preventDefault();
    this.props.onChangePage(newPage);
  }

  render() {
    return (
      <ul className={nav.menu}>
        <a href="" onClick={(e) => this.handleClick(e, nav.uno)}><
          li id={nav.uno} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-home"]].join(" ")}></li>
        </a>
        <a href="" onClick={(e) => this.handleClick(e, nav.dos)}>
          <li id={nav.dos} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-suitcase"]].join(" ")}></li>
        </a>
        <a href="" onClick={(e) => this.handleClick(e, nav.tres)}>
          <li id={nav.tres} className={[nav.navElem, nav.icon, nav.menuIcon, icons.fa, icons["fa-laptop"]].join(" ")}></li>
        </a>
      </ul>
    );
  }
}

export class SubNavMenu extends React.Component {
  handleClick(e, newHeader) {
    this.props.pageCallback(newHeader);
  }

  render() {
    if (this.props.newHeaders) {
      return (
        <section className={`${nav.subNav} ${this.props.visible ? animations.fadeIn : animations.fadeOut }`}>
          <ul className={nav.subNavList}>
            {this.props.newHeaders.map((newHeader, i) => {
              return <li key={i} onClick={(e) => this.handleClick(e, newHeader)}>{newHeader}</li>
            })}
          </ul>
        </section>
      );
    } else {
      return null;
    }
  }
}

export class SubNavArrow extends React.Component {
  handleClick(e) {
    this.props.pageCallback(null);
  }

  render() {
    return <span className={`${[icons.fa, icons["fa-chevron-left"], nav.shiftedRightElem, nav.subNavArrow].join(" ")} ${this.props.visible ? animations.fadeIn : animations.fadeOut }`} onClick={(e) => this.handleClick(e)}></span>
  }
}


export class Header extends React.Component {

  render() {
    return (
      <header className={this.props.className}>
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

export class WorkCardContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.workCardContainer].join(" ")}>
        <div>{this.props.subject}</div>
      </div>
    )
  }
}

export class ProjectCardContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.projectCardContainer].join(" ")}>
        <div>pcards</div>
      </div>
    )
  }
}

export class CodeSnippetContainer extends React.Component {
   render() {
    return(
      <div className={[graphics.container, graphics.snippetContainer].join(" ")}>
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
      <div className={[graphics.container, graphics.articleContainer].join(" ")}>
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
