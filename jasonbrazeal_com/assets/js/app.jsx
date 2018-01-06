import "normalize.css";
import css from "../css/shared.css";
import loader from "../css/loader.css";
import nav from "../css/nav.css";
import graphics from "../css/graphics.css";
import animations from "../css/animations.css";
import icons from "font-awesome/css/font-awesome.css";

import utils from "./utils.js";
import React from "react";
import { CSSTransition } from 'react-transition-group';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "Work",
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
      <div className={css.appWrap}>
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
      </div>
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

  componentWillMount() {
    console.log(`this.state.header=${this.state.header}`)
    // handle page nav state
    if (this.props.active) {
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
}

  render() {
    if (this.props.pageTitle == "Home") {
      var header = "Jason Brazeal";
    } else {
      var header = this.state.header;
    }
    return (
      <div className={this.state.classList.join(" ")} id={nav[`p${this.props.pageNum}`]}>
        <Header header={header} onChangeSubPage={(newSubPage) => this.handleSubPageNav(newSubPage)}>
          {this.state.header === "Home" && <Typewriter words={["Software", "Eng"]} />}
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
      classList: classList,
      currentMenuItem: props.subNavItems[0],
      blink: true
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

  handleMouseOver(e, subPage) {
    // replace "é"" in order to keep unicode out of css and in js only
    // replace " s" in "code snippets"
    this.setState({
      currentMenuItem: subPage.replace(/é/g, 'e').replace(/\ss/, 'S'),
      blink: false
    });
  }

  handleMouseEnter(e, subPage) {
    this.setState({
      currentMenuItem: subPage.replace(/é/g, 'e').replace(/\ss/, 'S'),
      blink: false
    });
    setTimeout(() => {
      this.setState({
        blink: true
      });
    }, 500);
  }

  render() {
    if (this.props.pageNum === "1") {
      return null;
    } else {
      return (
        <section className={this.state.classList.join(" ")}>
          <span className={[nav.hoverIcon, nav[this.state.currentMenuItem], this.state.blink ? animations.blinkingOrange : ''].join(" ")}></span>
          <ul className={nav.subNavList}>
            {this.props.subNavItems.map((subPage, i) => {
              if (this.props.visible) {
                return <li key={i} onClick={(e) => this.handleClick(e, subPage)} onMouseOver={(e) => this.handleMouseOver(e, subPage)} onMouseEnter={(e) => this.handleMouseEnter(e, subPage)}>{subPage}</li>
              } else {
                return <li key={i} >{subPage}</li>
              }
            })}
          </ul>
        </section>
      );
    }
  }
}


export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [nav.pageHeader],
      header: this.props.header
    };
  }

  handleSubPageNav(newSubPage) {
    this.props.onChangeSubPage(newSubPage)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.header !== this.props.header) {
      if (["Home", "Work", "Portfolio"].includes(nextProps.header)) {
        var showSubNavArrow = false;
      } else {
        var showSubNavArrow = true;
      }
      this.setState({
        classList: [animations.fadeOutIn, nav.pageHeader]
      });
      setTimeout(() => {
        this.setState({
          header: nextProps.header,
          showSubNavArrow: showSubNavArrow
        });
      }, 500);
      setTimeout(() => {
        this.setState({
          classList: [nav.pageHeader]
        });
      }, 1000);
    }
  }

  render() {
    return (
      <header className={this.state.classList.join(" ")}>
        <h1>{this.state.header}</h1>
        {this.state.header === "Jason Brazeal" || <SubNavArrow onChangeSubPage={(newSubPage) => this.handleSubPageNav(newSubPage)} visible={this.state.showSubNavArrow} />}
        {this.props.children}
      </header>
    )
  }
}

export class SubNavArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }

  handleClick(e) {
    this.props.onChangeSubPage(null);
  }

  render() {
    if (this.props.visible) {
      return <span className={`${[icons.fa, icons["fa-chevron-left"], nav.shiftedRightElem, nav.subNavArrow, animations.bounceLeft].join(" ")}`} onClick={(e) => this.handleClick(e)}></span>
    } else {
    return null;
    }
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
    if (this.props.subject === "Experience") {
      var content = (
        <ExperienceContent />
      );
    } else if (this.props.subject === "Education") {
      var content = (
         <EducationContent />
      );
    } else {
      throw `WorkCardContainer.props.subject is ${this.props.subject}`;
    }

    return(
      <div className={this.props.active ? `${graphics.workCardContainer} ${graphics[this.props.subject.toLowerCase()]} ${css.slidIn}` : `${graphics.workCardContainer} ${graphics[this.props.subject.toLowerCase()]} ${css.slidOut}`}>
        {content}
      </div>
    );
  }
}

export class EducationContent extends React.Component {
  render() {
    var imgClass = graphics.accLogo;
    return(
      <div>
      <div className={graphics.educationLogoContainer}>
        <div className={[graphics.educationLogo, graphics.accLogo].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.utLogo].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.utLogo].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.ugaLogo].join(" ")}></div>
      </div>
      <div className={graphics.educationTextContainer}>
        <span className={graphics.degree}>Webmaster Certificate </span><span className={graphics.year}>2014 </span><span className={graphics.location}>Austin, TX</span>
        <span className={graphics.degree}>Software Developer Training </span><span className={graphics.year}>2012 </span><span className={graphics.location}>Austin, TX</span>
        <span className={graphics.degree}>M.A. Linguistics  2002</span><span className={graphics.year}>2005 </span><span className={graphics.location}>Austin, TX</span>
        <span className={graphics.degree}>B.A. Linguistics </span><span className={graphics.year}>2002 </span><span className={graphics.location}>Athens, GA</span>
      </div>
      </div>
    )
  }
}

export class ExperienceContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  handleNav(direction) {
    console.log(`handlingNav(${direction})`)
    if (direction === "next") {
      if (this.state.currentPage === 3) {
        this.setState({
          currentPage: 0
        });
      } else {
        this.setState({
          currentPage: ++this.state.currentPage
        });
      }
    } else if (direction === "prev") {
      if (this.state.currentPage === 0) {
        this.setState({
          currentPage: 3
        });
      } else {
        this.setState({
          currentPage: --this.state.currentPage
        });
      }
    } else {
      throw `ExperienceContent.handleNav(direction) was called with direction=${direction}`;
    }
    console.log(`set currentPage to ${this.state.currentPage}`)
  }

  render() {
    return(
      <div>
      <section className={[graphics.experienceSection, graphics.medal, this.state.currentPage === 0 ? graphics.activeExperienceSection : ""].join(" ")}>
        <h3>Medal</h3>
        <div className={[graphics.experienceLogo, graphics.medalLogo].join(" ")}></div>
      </section>
      <section className={[graphics.experienceSection, graphics.verodin, this.state.currentPage === 1 ? graphics.activeExperienceSection : ""].join(" ")}>
        <h3>Verodin</h3>
        <div className={[graphics.experienceLogo, graphics.verodinLogo].join(" ")}></div>
      </section>
      <section className={[graphics.experienceSection, graphics.tyco, this.state.currentPage === 2 ? graphics.activeExperienceSection : ""].join(" ")}>
        <h3>Tyco</h3>
        <div className={[graphics.experienceLogo, graphics.tycoLogo].join(" ")}></div>
      </section>
      <section className={[graphics.experienceSection, graphics.ut, this.state.currentPage === 3 ? graphics.activeExperienceSection : ""].join(" ")}>
        <h3>University of Texas at Austin</h3>
        <div className={[graphics.experienceLogo, graphics.utLogo].join(" ")}></div>
      </section>
      <section className={graphics.experienceNav}>
        <span className={[icons.fa, icons["fa-chevron-left"]].join(" ")} onClick={(e) => this.handleNav("prev")}></span>
        <span className={[icons.fa, icons["fa-chevron-right"]].join(" ")} onClick={(e) => this.handleNav("next")}></span>
      </section>
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

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className={nav.footerWrapper}>
          <hr className={css.orangeBorder} />
          <Contact />
          <RoundThumbnail className={nav.footerImage} alt="photo of jason" />
          <Copyright />
        </div>
      </footer>
    )
   }
}

export class Contact extends React.Component {
  render() {
    return(
      <div className={nav.contact}>
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
      <div className={nav.copyright}>
        <span className={[icons.fa, icons["fa-copyright"]].join(" ")}></span>
        2017 Jason Brazeal
      </div>
    )
  }
}

export class RoundThumbnail extends React.Component {
  render() {
    return(
      <div className={nav.thumbnail}>
        <span className={this.props.className} alt={this.props.alt}></span>
      </div>
    )
  }
}

export class Typewriter extends React.Component {
  componentDidMount() {
    utils.typewriter(document);
  }

  render() {
    return(
      <h2>
        <span
          className={graphics.typewriter}
          data-period="2000"
          data-rotate='["software engineer", "web developer", "coder."]'>
          <span className={graphics.typewriterWrap}></span>
          <span className={[graphics.typewriterCaret].join(" ")}>|</span>
        </span>
      </h2>
    )
  }
}

export class DesignCodeDeployGraphic extends React.Component {
  render() {
    return(
      <div className={graphics.designCodeDeploy}>
        <div className={graphics.bubble}>
          <span className={[graphics.bubbleText, icons.fa, icons["fa-users"]].join(" ")}> design</span>
        </div>
        <div className={graphics.bubble}>
          <span className={[graphics.bubbleText, icons.fa, icons["fa-code"]].join(" ")}> code</span>
        </div>
        <div className={graphics.bubble}>
          <span className={[graphics.bubbleText, icons.fa, icons["fa-cloud-upload"]].join(" ")}> deploy</span>
        </div>
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

//  render() {
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
