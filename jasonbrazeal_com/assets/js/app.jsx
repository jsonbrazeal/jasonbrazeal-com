import "normalize.css";
import css from "../css/shared.css";
import loader from "../css/loader.css";
import nav from "../css/nav.css"
import graphics from "../css/graphics.css"
import animations from "../css/animations.css"
import icons from "font-awesome/css/font-awesome.css"
import jason from "../img/jason.jpeg"

import utils from "./utils.js"
import React from "react";
import { CSSTransition } from 'react-transition-group';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "Home",
      activeSubPage: null
    };
  }

  handleNav(newPage) {
    console.log('handleNav('+newPage+')')
    if (newPage.match("uno")) {
      var page = "Home";
    } else if (newPage.match("dos")) {
      var page = "Work";
    } else if (newPage.match("tres")) {
      var page = "Portfolio";
    } else {
      throw `Page ${page} does not exist`
    }
    this.setState({
      activePage: page,
      activeSubPage: null
    });
  }

  handleSubPageNav(newSubPage) {
    console.log('handleSubPageNav('+newSubPage+')')
    this.setState({
      activeSubPage: newSubPage
    });
  }

  render() {
    console.log('rendering app....');
    console.log('this.state.activeSubPage='+this.state.activeSubPage);
    console.log('this.state.activePage='+this.state.activePage);
    return (
      <React.Fragment>
        <NavMenu activePage={this.state.activePage} onChangePage={(newPage) => {this.handleNav(newPage)}} />
        <div className={nav.container} id={nav.c1} >
          <div className={nav.container} id={nav.c2} >
            <div className={nav.container} id={nav.c3} >
              <Page active={this.state.activePage === "Home"}
                    pageNum="1"
                    pageTitle="Home"
                    onChangeSubPage={(newHeader) => this.handleSubPageNav(newHeader)}
                    subNavItems={[]}
                    activeSubPage={this.state.activeSubPage}>
                <DesignCodeDeployGraphic />
                <Footer />
              </Page>
              <Page active={this.state.activePage === "Work"}
                    pageNum="2"
                    pageTitle="Work"
                    onChangeSubPage={(newHeader) => this.handleSubPageNav(newHeader)}
                    subNavItems={["skills", "experience", "education", "résumé"]}
                    activeSubPage={this.state.activeSubPage}>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "skills"}>
                  <SkillsGraphic active={this.state.activeSubPage === "skills"} />
                </CSSTransition>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "experience"}>
                  <WorkCardContainer active={this.state.activeSubPage === "experience"} subject="Experience" />
                </CSSTransition>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "education"}>
                  <WorkCardContainer active={this.state.activeSubPage === "education"} subject="Education" />
                </CSSTransition>
              </Page>
              <Page active={this.state.activePage === "Portfolio"}
                    pageNum="3"
                    pageTitle="Portfolio"
                    onChangeSubPage={(newHeader) => this.handleSubPageNav(newHeader)}
                    subNavItems={["projects", "articles", "code snippets"]}
                    activeSubPage={this.state.activeSubPage}>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "projects"}>
                <ProjectCardContainer active={this.state.activeSubPage === "projects"} />
                </CSSTransition>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "articles"}>
                  <ArticleContainer active={this.state.activeSubPage === "articles"} />
                </CSSTransition>
                <CSSTransition
                  timeout={1000}
                  classNames={{
                    appear: animations.slideAppear,
                    appearActive: animations.slideAppearActive,
                    enter: animations.slideEnter,
                    enterActive: animations.slideEnterActive,
                    exit: animations.slideExit,
                    exitActive: animations.slideExitActive
                  }}
                  in={this.state.activeSubPage === "code snippets"}>
                  <CodeSnippetContainer active={this.state.activeSubPage === "code snippets"} />
                </CSSTransition>
               </Page>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export class NavMenu extends React.Component {
  handleClick(e, newPageId) {
    e.preventDefault();
    this.props.onChangePage(newPageId);
  }

  render() {
    return (
      <ul className={nav.menu}>
        <a href="" onClick={(e) => this.handleClick(e, nav.uno)}>
          <li id={nav.uno} className={this.props.activePage === "Home" ? [nav.selected, nav.navElem].join(" ") : nav.navElem}>
            <span className={[nav.icon, nav.menuIcon, icons.fa, icons["fa-home"]].join(" ")}></span>
            Home
          </li>
        </a>
        <a href="" onClick={(e) => this.handleClick(e, nav.dos)}>
          <li id={nav.dos} className={this.props.activePage === "Work" ? [nav.selected, nav.navElem].join(" ") : nav.navElem}>
            <span className={[nav.icon, nav.menuIcon, icons.fa, icons["fa-suitcase"]].join(" ")}></span>
            Work
          </li>
        </a>
        <a href="" onClick={(e) => this.handleClick(e, nav.tres)}>
          <li id={nav.tres} className={this.props.activePage === "Portfolio" ? [nav.selected, nav.navElem].join(" ") : nav.navElem}>
            <span className={[nav.icon, nav.menuIcon, icons.fa, icons["fa-laptop"]].join(" ")}></span>
            Portfolio
          </li>
        </a>
      </ul>
    );
  }
}

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubNavMenu: true,
      showSubNavArrow: false,
      header: props.pageTitle,
      headerClassName: "",
      classList: props.pageTitle === "Home" ? [nav.page] : [nav.page, nav.shiftedRight],
      active: props.active,
      activeSubPage: props.activeSubPage,
    };
  }

  handleSubPageNav(newSubPage) {
    this.props.onChangeSubPage(newSubPage)
  }

  componentWillReceiveProps(nextProps) {
    console.log(`this.state.header=${this.state.header}`)
    // handle page nav state
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
    }

    if (nextProps.activeSubPage !== this.state.activeSubPage) {
      console.log(`subpage transition ${this.state.activeSubPage} to ${nextProps.activeSubPage}`)
      console.log(this.state)
      // handle subpage transition
      this.setState({
        showSubNavArrow: false,
        showSubNavMenu: false,
      });

      if (nextProps.activeSubPage) { // transition from page to subpage
          this.setState({
            showSubNavArrow: true,
            showSubNavMenu: false,
            header: utils.toTitleCase(nextProps.activeSubPage),
            activeSubPage: nextProps.activeSubPage,
          });
      } else { // transition from subpage to page
          this.setState({
            showSubNavArrow: false,
            showSubNavMenu: true,
            header: this.props.pageTitle,
            activeSubPage: null,
          });
      }
    }

  }

  render() {
    return (
      <div className={this.state.classList.join(" ")} id={nav[`p${this.props.pageNum}`]}>
        <Header header={this.state.header === "Home" ? "Jason Brazeal" : this.state.header}>
          {this.state.header === "Home" && <Typewriter words={["Software", "Eng"]} />}
          <SubNavArrow onChangeSubPage={(newSubPage) => this.handleSubPageNav(newSubPage)} visible={this.state.showSubNavArrow} />
        </Header>
        <section>
          {this.props.children}
        </section>
        <SubNavMenu subNavItems={this.props.subNavItems} pageNum={this.props.pageNum} onChangeSubPage={(newSubPage) => this.handleSubPageNav(newSubPage)} visible={this.state.showSubNavMenu} />
      </div>
    );
  }
}


export class SubNavMenu extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.visible) {
      var classList = [nav.subNav, animations.fadeIn, css.zIndexFront];
    } else {
      var classList = [nav.subNav, animations.fadeOut, css.zIndexBehind];
    }
    this.state = {
      classList: classList
    };
  }

  componentWillReceiveProps(nextProps)  {
    var classList = this.state.classList;
    if (nextProps.visible) {
      classList.splice(classList.indexOf(animations.fadeOut), 1);
      classList.splice(classList.indexOf(css.zIndexBehind), 1);
      classList.push(animations.fadeIn, css.zIndexFront)
    }
    else {
      classList.splice(classList.indexOf(animations.fadeIn), 1);
      classList.splice(classList.indexOf(css.zIndexFront), 1);
      classList.push(animations.fadeOut, css.zIndexBehind)
    }
    this.setState({
      classList: classList
    });
  }

  handleClick(e, newSubPage) {
    this.props.onChangeSubPage(newSubPage)
  }

  render() {
    return (
      <section className={this.state.classList.join(" ")}>
        <ul className={nav.subNavList}>
          {this.props.subNavItems.map((subPage, i) => {
            if (this.props.visible) {
              return <li key={i} onClick={(e) => this.handleClick(e, subPage)}>{subPage}</li>
            } else {
              return <li key={i} >{subPage}</li>
            }
          })}
        </ul>
      </section>
    );
  }
}

export class SubNavArrow extends React.Component {
  handleClick(e) {
    this.props.onChangeSubPage(null);
  }

  render() {
    return <span className={`${[icons.fa, icons["fa-chevron-left"], nav.shiftedRightElem, nav.subNavArrow].join(" ")} ${this.props.visible ? animations.fadeIn : animations.fadeOut }`} onClick={(e) => this.handleClick(e)}></span>
  }
}

export class SkillsGraphic extends React.Component {
   render() {
    console.log('SkillsGraphic rendering.')
    return(
      <div className={this.props.active ? `${graphics.container} ${css.slidIn}` : `${graphics.container} ${css.slidOut}`}>
        <div className={graphics.bubbleSkill}>skills</div>
      </div>
    )
  }
}

export class CodeSnippetContainer extends React.Component {
   render() {
    return(
      <div className={this.props.active ? `${graphics.container} ${css.slidIn}` : `${graphics.container} ${css.slidOut}`}>
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
      <div className={this.props.active ? `${graphics.container} ${css.slidIn}` : `${graphics.container} ${css.slidOut}`}>
        <div className={graphics.article}>article1</div>
        <div className={graphics.article}>article2</div>
        <div className={graphics.article}>article3</div>
      </div>
    )
  }
}

export class WorkCardContainer extends React.Component {
   render() {
    return(
      <div className={this.props.active ? `${graphics.container} ${graphics.workCardContainer} ${css.slidIn}` : `${graphics.container} ${graphics.workCardContainer} ${css.slidOut}`}>
        <div>{this.props.subject}</div>
      </div>
    )
  }
}

export class ProjectCardContainer extends React.Component {
   render() {
    return(
      <div className={this.props.active ? `${graphics.container} ${graphics.projectCardContainer} ${css.slidIn}` : `${graphics.container} ${graphics.workCardContainer} ${css.slidOut}`}>
        <div>pcards</div>
      </div>
    )
  }
}

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      header: this.props.header
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.header !== this.props.header) {
      this.setState({
        classList: [animations.fadeOutIn]
      });
      setTimeout(() => {
        this.setState({
          header: this.props.header
        });
      }, 500);
      setTimeout(() => {
        this.setState({
          classList: []
        });
      }, 1000);
    }
  }

  render() {
    return (
      <header className={this.state.classList.join(" ")}>
        <h1>{this.state.header}</h1>
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
        <hr className={css.orangeBorder} />
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
