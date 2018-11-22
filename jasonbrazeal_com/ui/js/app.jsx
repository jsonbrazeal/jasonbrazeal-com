import "normalize.css";
import css from "../css/shared.css";
import loader from "../css/loader.css";
import nav from "../css/nav.css";
import graphics from "../css/graphics.css";
import animations from "../css/animations.css";
import icons from "font-awesome/css/font-awesome.css";
import brazeal from "../pdf/brazeal.pdf";
import brazealLong from "../pdf/brazeal_long.pdf";
import favicon from "../icon/favicon.ico"
import manifest from "../icon/site.webmanifest"
import browserconfig from "../icon/browserconfig.xml"
import favicon16 from "../icon/favicon-16x16.png"
import favicon32 from "../icon/favicon-32x32.png"
import appleTouchIcon from "../icon/apple-touch-icon.png"
import androidChromeIcon192 from "../icon/android-chrome-192x192.png"
import androidChromeIcon512 from "../icon/android-chrome-512x512.png"
import safariPinnedTab from "../icon/safari-pinned-tab.svg"
import mstile from "../icon/mstile-150x150.png"

import { toTitleCase, typewriter, BubbleChart } from "./utils.js";
import snippets from "./snippets.js";
import writing from "./writing.js";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { select as d3Select } from 'd3-selection';
import { selectAll as d3SelectAll } from 'd3-selection-multi';

import Prism from "prismjs"; // includes defaults
// import Prism from "prismjs/components/prism-core"
import "prismjs/components/prism-python"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-sql"
import "prismjs/themes/prism-tomorrow.css"

import Remarkable from "remarkable";

var md = new Remarkable({html: true});


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "Home",
      activeSubPage: null
    };
  }

  handleNav(newPage) {
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
    this.setState({
      activeSubPage: newSubPage
    });
  }

  render() {
    return (
      <div className={css.appWrap}>
        <NavMenu activePage={this.state.activePage} onChangePage={(newPage) => {this.handleNav(newPage)}} />
        <div className={nav.container} id={nav.c1}>
          <div className={nav.container} id={nav.c2}>
            <div className={nav.container} id={nav.c3}>
              <Page active={this.state.activePage === "Home"}
                    pageNum="1"
                    pageTitle="Home"
                    onChangeSubPage={(newHeader) => this.handleSubPageNav(newHeader)}
                    subNavItems={[]}
                    activeSubPage={this.state.activeSubPage}>
                <MachineGraphic />
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
                  in={this.state.activeSubPage === "résumé"}>
                  <ResumeContainer active={this.state.activeSubPage === "résumé"} />
                </CSSTransition>
              </Page>
              <Page active={this.state.activePage === "Portfolio"}
                    pageNum="3"
                    pageTitle="Portfolio"
                    onChangeSubPage={(newHeader) => this.handleSubPageNav(newHeader)}
                    subNavItems={["projects", "writing", "snippets"]}
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
                  in={this.state.activeSubPage === "writing"}>
                  <WritingContainer active={this.state.activeSubPage === "writing"} activeSubPage={this.state.activeSubPage} />
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
                  in={this.state.activeSubPage === "snippets"}>
                  <SnippetContainer active={this.state.activeSubPage === "snippets"} activeSubPage={this.state.activeSubPage}/>
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
      // handle subpage transition
      this.setState({
        showSubNavArrow: false,
        showSubNavMenu: false,
      });

      if (nextProps.activeSubPage) { // transition from page to subpage
          this.setState({
            showSubNavArrow: true,
            showSubNavMenu: false,
            header: toTitleCase(nextProps.activeSubPage),
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
        <section className={nav[`p${this.props.pageNum}`]}>
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
    this.setState({
      currentMenuItem: subPage.replace(/é/g, 'e'),
      blink: false
    });
  }

  handleMouseEnter(e, subPage) {
    this.setState({
      currentMenuItem: subPage.replace(/é/g, 'e'),
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
                return <li key={i}>{subPage}</li>
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
    if (this.props.header == "Jason Brazeal") {
      var headerClass = nav.pageHeaderWide;
    } else {
      var headerClass = nav.pageHeader;
    }
    this.state = {
      classList: [headerClass],
      header: this.props.header
    };
  }

  handleSubPageNav(newSubPage) {
    this.props.onChangeSubPage(newSubPage);
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
      visible: this.props.visible,
      active: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  handleClick(e) {
    this.setState({
      active: false
    });
    this.props.onChangeSubPage(null);
  }

  mouseEnter(e) {
    this.setState({
      active: true
    });
  }
  mouseLeave(e) {
    this.setState({
      active: false
    });
  }

  render() {
    if (this.props.visible) {
      return (
        <span>
          <span className={this.state.active ? [nav.navArrowCircle, nav.navArrowCircleActive].join(" ") :  nav.navArrowCircle} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick(e)}></span>
          <span className={`${[icons.fa, icons["fa-chevron-left"], nav.shiftedRightElem, nav.subNavArrow, animations.bounceLeft].join(" ")}`}></span>
        </span>
      )
    } else {
    return null;
    }
  }
}

export class SkillsGraphic extends React.Component {

  componentDidMount() {
    var bubbleChart = new BubbleChart();
    bubbleChart.setup();
    bubbleChart.registerClickEvent(bubbleChart.svg.selectAll(".node"));
    bubbleChart.moveToCentral(d3Select(".node"));
  }

  render() {
    return(
      <div className={this.props.active ? `${graphics.skillsContainer} ${css.slidIn}` : `${graphics.skillsContainer} ${css.slidOut}`}>
        <div className={graphics.bubbleChart + " bubbleChart"}></div>
      </div>
    )
  }
}

export class EmbeddedGist extends React.Component {
// based on https://gist.github.com/aVolpe/b364a8fcd10f1ba833d97e9ab278f42c

  constructor(props) {
      super(props);
      this.gist = props.gist;
      this.file = props.file;
      this.stylesheetAdded = false;
      this.state = {
        loading: true,
        src: "",
        gistFileClass: graphics.gistFile,
        gistDataClass: graphics.gistData,
        gistClass: graphics.gist
      };
  }

  nextGistCallback() {
    return "embed_gist_callback_" + Math.floor(Math.random() * Math.floor(99999));
  };

  componentDidMount() {
    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    var gistCallback = this.nextGistCallback();
    window[gistCallback] = function(gist) {
        this.setState({
          loading: false,
          src: gist.div.replace(/"gist-file"/, `"gist-file ${this.state.gistFileClass}"`).replace(/"gist-data"/, `"gist-data ${this.state.gistDataClass}"`).replace(/"gist"/, `"gist ${this.state.gistClass}"`)
        });
        // The Gist JSON data includes a stylesheet to add to the page
        // to make it look correct. `addStylesheet` ensures we only add
        // the stylesheet one time.
        if (!this.stylesheetAdded) {
          this.stylesheetAdded = true;
          var link = document.createElement('link');
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = gist.stylesheet;
          document.head.appendChild(link);
        }
    }.bind(this);

    var url = "https://gist.github.com/" + this.props.gist + ".json?callback=" + gistCallback;
    if (this.props.file) {
      url += "&file=" + this.props.file;
    }

    // Add the JSONP script tag to the document.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      return <div className={graphics.snippetWrapper} dangerouslySetInnerHTML={{__html: this.state.src}} />;
    }
  }
}

// EmbeddedGist.propTypes = {
//     gist: React.PropTypes.string.isRequired, // e.g. "username/id"
//     file: React.PropTypes.string // to embed a single specific file from the gist
// };

// // Each time we request a Gist, we'll need to generate a new
// // global function name to serve as the JSONP callback.
// var gistCallbackId = 0;
// EmbeddedGist.nextGistCallback = () => {
//     return "embed_gist_callback_" + gistCallbackId++;
// };

/** USAGE:
* <EmbeddedGist gist="aVolpe/fffbe6a9e9858c7e3546fb1d55782152" file="SetUtils.java"></EmbeddedGist>
*/

export class SnippetTiles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupCloseActive: false
    };
  }

  mouseEnter(e) {
    this.setState({
      popupCloseActive: true,
    });
  }

  mouseLeave(e) {
    this.setState({
      popupCloseActive: false,
    });
  }

  handleTileClick(topic) {

    let popupTitle = document.querySelector(`.${animations.popupTitle}`);
    popupTitle.innerHTML = snippets.snippets[topic]["title"];
    let popup = document.querySelector(`.${animations.popupSnippet}`);
    popup.innerHTML = md.render(snippets.snippets[topic]["content"]) || "";
    Prism.highlightAllUnder(popup);

    var hexagons = document.querySelectorAll("." + graphics.hexagon);
    hexagons.forEach(element => {
      element.blur();
    });

    var modalContainer = document.querySelector("." + animations.popupContainer);
    modalContainer.classList.remove(animations.out);
    if (!(modalContainer.classList.contains(animations.five))) {
      modalContainer.classList.add(animations.five);
    }
    document.querySelector("body").classList.add(animations.popupActive);

    // to close modal, click x, click background, or press escape
    var modalClose = document.querySelector("." + animations.popupContent + " span");
    modalClose.addEventListener("click", function () {
      modalContainer.classList.add(animations.out);
      document.querySelector("body").classList.remove(animations.popupActive);
      setTimeout(function() { document.querySelector(`.${animations.popupContent}`).scrollTop = 0; }, 200);
    });
    var modalBackground = document.querySelector("." + animations.popupBackground);
    modalBackground.addEventListener("click", function (e) {
      if (e.target.classList.contains(animations.popupBackground)) {
        modalContainer.classList.add(animations.out);
        document.querySelector("body").classList.remove(animations.popupActive);
        setTimeout(function() { document.querySelector(`.${animations.popupContent}`).scrollTop = 0; }, 200);
      }
    });
  }

  render() {
    let numRows = Math.floor(Object.keys(snippets.snippets).length / 8);
    let snipsContainers = [];
    for (let i = 0; i < numRows + 1; i++) {
      let snipsSlice = Object.keys(snippets.snippets).slice(i * 8, i * 8 + 8);
      let snips = snipsSlice.map((elem, j) => {
        return <SnippetTile key={i * 8 + j} activeSubPage={this.props.activeSubPage} handleClick={this.handleTileClick} topic={elem} />
      });
      if (snips.length !== 8) {
        let nones = [...Array(8 - snips.length).keys()].map((elem, k) => {
          return <SnippetTile key={i * 8 + 8 - k} activeSubPage={this.props.activeSubPage} handleClick={this.handleTileClick} topic="none" />
        });
        snipsContainers.push(<HexagonGroup key={i}>{snips}{nones}</HexagonGroup>);
      } else {
        snipsContainers.push(<HexagonGroup key={i}>{snips}</HexagonGroup>);
      }
    }
    return (
      <div className={graphics.honeycomb}>

        {snipsContainers}

        <div className={animations.popupContainer}>
          <div className={animations.popupBackground}>
            <div className={animations.popup}>
              <div className={animations.popupContent}>
                <span className={this.state.popupCloseActive ? [animations.popupClose, animations.popupCloseActive].join(" ") : animations.popupClose} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)}></span>
                <span className={[animations.popupCloseIcon, icons.fa, icons["fa-times"]].join(" ")}></span>
                <h3 className={animations.popupTitle}></h3>
                <div className={animations.popupSnippet}></div>
              </div>
            </div>
          </div>
        </div>

      </div> /* graphics.honeycomb */

    ) // return
  } // render
} // class

export class HexagonGroup extends React.Component {
  render() {
    return (
      <div className={graphics.ibwsFix}>{this.props.children}</div>
    )
  }
}

export class SnippetTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeSubPage != "snippets") {
      this.setState({
        active: false
      });
      let modalContainer = document.querySelector("." + animations.popupContainer);
      modalContainer.classList.add(animations.out);
      document.querySelector("body").classList.remove(animations.popupActive);
      setTimeout(function() { document.querySelector(`.${animations.popupContent}`).scrollTop = 0; }, 200);
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.escHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escHandler);
  }

  mouseEnter(e) {
    this.setState({
      active: true
    });
  }
  mouseLeave(e) {
    this.setState({
      active: false
    });
  }

  escHandler(e) {
    if (event.key === "Escape") {
      try {
        var modalContainer = document.querySelector("." + animations.popupContainer);
        modalContainer.classList.add(animations.out);
        document.querySelector("body").classList.remove(animations.popupActive);
        setTimeout(function() { document.querySelector(`.${animations.popupContent}`).scrollTop = 0; }, 200);
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    if (this.props.topic == 'none') {
      return (
        <div className={graphics.hexanone}></div>
      )
    } else {
      return (
        <div className={`${graphics.hexagon} ${this.state.active ? graphics.hexagonHover : ""}`} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.props.handleClick(this.props.topic)}>
          <div className={graphics.hexagontent}>{this.props.topic}</div>
        </div>
      )
    }
  }
}

export class SnippetContainer extends React.Component {

  handleMouseOver(e, direction) {
    if (direction === "up") {
    } else if (direction === "down") {
    }
  }

  handleMouseEnter(e, direction) {
    if (direction === "up") {
    } else if (direction === "down") {
    }
  }

  render() {
    return(
      <div className={this.props.active ? `${graphics.snippetContainer} ${css.slidIn}` : `${graphics.snippetContainer} ${css.slidOut}`}>
        {/* <span className={[icons.fa, icons["fa-chevron-up"], animations.bounceUp, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "up")} onMouseEnter={(e) => this.handleMouseEnter(e, "up")}></span> */}
        <div className={graphics.snippetContainerInner}>
          {/* <EmbeddedGist gist="jsonbrazeal/745e118b37479b875a8d" />
          <EmbeddedGist gist="jsonbrazeal/3c7edf1ced0b448d2e77" />
          <EmbeddedGist gist="jsonbrazeal/745e118b37479b875a8d" /> */}
          <SnippetTiles activeSubPage={this.props.activeSubPage} />
        </div>
        {/* <span className={[icons.fa, icons["fa-chevron-down"], animations.bounceDown, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "down")} onMouseEnter={(e) => this.handleMouseEnter(e, "down")}></span> */}
      </div>
    )
  }
}

export class WritingContainer extends React.Component {

  handleMouseOver(e, direction) {
    if (direction === "up") {
    } else if (direction === "down") {
    }
  }

  handleMouseEnter(e, direction) {
    if (direction === "up") {
    } else if (direction === "down") {
    }
  }

  render() {

    let texts = [];
    for (var i = 0; i < writing.writing.length; i++) {
      texts.push(
        <Writing title={writing.writing[i].title} writingPreview={writing.writing[i].preview} key={i} md={writing.writing[i].md} slug={writing.writing[i].slug} date={writing.writing[i].date} activeSubPage={this.props.activeSubPage}>
        </Writing>
      );
    }
    return(
      <div className={this.props.active ? `${graphics.writingContainer} ${css.slidIn}` : `${graphics.writingContainer} ${css.slidOut}`}>
        {/* <span className={[icons.fa, icons["fa-chevron-up"], animations.bounceUp, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "up")} onMouseEnter={(e) => this.handleMouseEnter(e, "up")}></span> */}
        <div className={graphics.writingContainerInner}>
        {texts}
        </div>
        {/* <span className={[icons.fa, icons["fa-chevron-down"], animations.bounceDown, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "down")} onMouseEnter={(e) => this.handleMouseEnter(e, "down")}></span> */}
      </div>
    )
  }
}

export class Writing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writingOpen: false,
      active: false
    };
  }

  mouseEnter(e) {
    this.setState({
      active: true
    });
  }

  mouseLeave(e) {
    this.setState({
      active: false
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeSubPage != "writing") {
      this.setState({
        writingOpen: false
      });
    }
  }

  handleClick(state, e)  {
    let writing = document.querySelector(`.${graphics[this.props.slug]}`);
    Prism.highlightAllUnder(writing);
    // avoid scrolling back to the top of writing container
    e.preventDefault();
    if (state === "open") {
      this.setState({
        writingOpen: true
      });
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      // document.querySelector(`.${graphics.writingContainerInner}`).style.overflowY = 'hidden';
    } else {
      this.setState({
        writingOpen: false
      });
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
      // document.querySelector(`.${graphics.writingContainerInner}`).style.overflowY = 'auto';
    }
  }

  handleKeyDown(event) {
    if (event.keyCode == 27) {
      this.setState({
        writingOpen: false
      });
      // document.querySelector(`.${graphics.writingContainerInner}`).style.overflowY = 'auto';
    }
  }

  onChange(event) {
    // this method exists to get rid of a React warning
  }

  render() {
    return(
       <article className={graphics.writing}>
       <h1>{this.props.title}</h1>
       <div className={graphics.writingText}>
       <p>{this.props.writingPreview}</p>
       </div>
       <label className={[graphics.btn, graphics.fullTextBtn].join(" ")} htmlFor="modalTrigger" onClick={(e) => this.handleClick("open", e)}>full text</label>

        {/* Start of Modal */}
        <div className={animations.modal}>
          <input id="modalTrigger" className={animations.modalTriggerInput} type="checkbox" checked={this.state.writingOpen} onChange={ (e) => this.onChange(e) } />
          <div className={animations.modalOverlay}>
            <div className={animations.modalWrap}>
              <label htmlFor="modalClose" onClick={(e) => this.handleClick("close", e)}>
                  <span className={this.state.active ? [animations.modalCloseCircle, animations.modalCloseActive].join(" ") : animations.modalCloseCircle} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)}></span>
                  <span className={[animations.modalCloseX, icons.fa, icons["fa-times"]].join(" ")} id="modalClose"></span>
              </label>
              <h2>{this.props.title}</h2>
              <time>{this.props.date}</time>
              <div className={graphics[this.props.slug]} dangerouslySetInnerHTML={{__html: md.render(this.props.md)}}></div>
            </div>
          </div>
        </div>
        {/* End of Modal */}

      </article>
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
    return(
      <div>
      <div className={graphics.educationLogoContainer}>
        <a href="https://www.ccsf.edu/" target="_blank"><div className={[graphics.educationLogo, graphics.ccsfLogo].join(" ")}></div></a>
        <a href="http://www.austincc.edu/" target="_blank"><div className={[graphics.educationLogo, graphics.accLogo].join(" ")}></div></a>
        <a href="https://www.utexas.edu/" target="_blank"><div className={[graphics.educationLogo, graphics.utLogoEd].join(" ")}></div></a>
        <a href="https://www.uga.edu/" target="_blank"><div className={[graphics.educationLogo, graphics.ugaLogo].join(" ")}></div></a>
      </div>
      <div className={graphics.educationTextContainer}>
        <span className={graphics.degree}>Networking Certificate <span className={graphics.year}>(in progress)</span></span>
        <span className={graphics.org}>City College of San Francisco</span>
        <span className={[graphics.location, graphics.locationSf].join(" ")}>San Francisco, CA</span>

        <span className={graphics.degree}>Webmaster Certificate <span className={graphics.year}>(2014)</span></span>
        <span className={graphics.org}>Austin Community College</span>
          <span className={[graphics.location, graphics.locationAustin1].join(" ")}>Austin, TX</span>

        <span className={graphics.degree}>Software Developer Training Program <span className={graphics.year}>(2012)</span></span>
        <span className={graphics.org}>University of Texas at Austin</span>
        <span className={[graphics.location, graphics.locationAustin2].join(" ")}>Austin, TX</span>

        <span className={[graphics.degree, graphics.maDegree].join(" ")}>M.A. Linguistics <span className={graphics.year}>(2005)</span></span>
        <span className={graphics.org}>University of Texas at Austin</span>
        <span className={[graphics.location, graphics.locationAustin3].join(" ")}>Austin, TX</span>

        <span className={graphics.degree}>B.A. Linguistics <span className={graphics.year}>(2002)</span></span>
        <span className={graphics.org}>University of Georgia</span>
        <span className={graphics.location}>Athens, GA</span>
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
      prevActive: false,
      nextActive: false
    };
  }

  mouseEnter(e, direction) {
    if (direction === "prev") {
      this.setState({
        prevActive: true,
      });
    } else if (direction === "next") {
      this.setState({
        nextActive: true
      });
    }
  }
  mouseLeave(e, direction) {
    if (direction === "prev") {
      this.setState({
        prevActive: false
      });
    } else if (direction === "next") {
      this.setState({
        nextActive: false
      });
    }
  }

  handleNav(direction) {
    if (direction === "next") {
      if (this.state.currentPage === 4) {
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
          currentPage: 4
        });
      } else {
        this.setState({
          currentPage: --this.state.currentPage
        });
      }
    } else {
      throw `ExperienceContent.handleNav(direction) was called with direction=${direction}`;
    }
  }

  render() {
    return(
      <div>
      <section className={[graphics.experienceSection, graphics.primer, this.state.currentPage === 0 ? graphics.activeExperienceSection : ""].join(" ")}>
        <a href="https://primer.ai/" target="_blank"><div className={[graphics.experienceLogo, graphics.primerLogo].join(" ")}></div></a>
          <p className={graphics.jobTitle}>Senior Backend Engineer</p>
        <p>July 2018-present</p>
        <p>San Francisco, CA</p>
        <ul>
          <li>develop REST APIs and other infrastructure backing web-based interfaces to artificial intelligence software (Python/Flask/React)</li>
          <li>deploy and maintain data ingestion pipelines that enable large scale machine learning analyses using a variety of technologies (Python/Docker/Kubernetes/AWS)</li>
          <li>provide technical leadership and advisement as a member of the Platform Infrastructure team through code review, tech talks, interviewing, and mentoring</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.medal, this.state.currentPage === 1 ? graphics.activeExperienceSection : ""].join(" ")}>
          <a href="https://www.medal.com/" target="_blank"><div className={[graphics.experienceLogo, graphics.medalLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>
          Full Stack Engineer
          <span className={`${[icons.fa, icons["fa-arrow-right"], graphics.promotion].join(" ")}`}></span>
          Principal Software Engineer
        </p>
        <p>July 2017-July 2018</p>
        <p>San Francisco, CA</p>
        <ul>
          <li>participated in the design, coding, and deployment of the Medal platform, which consolidates medical records and clinical data from different sources (Python/Django/Javascript)</li>
          <li>integrated HIPAA-compliant AWS S3 storage and SQS/SNS into Medal platform and applications</li>
          <li>promoted to Principal Software Engineer, oversaw the engineering team, collaborated to implement new features and improvements, and mentored other engineers</li>
          <li>designed new features and services based on product/business requirements and provided guidance on technical architecture, scoping, preliminary cost analysis, etc.</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.verodin, this.state.currentPage === 2 ? graphics.activeExperienceSection : ""].join(" ")}>
            <a href="https://www.verodin.com/" target="_blank"><div className={[graphics.experienceLogo, graphics.verodinLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>Full Stack Engineer</p>
        <p>December 2015-June 2017</p>
        <p>remote</p>
        <ul>
          <li>contributed code to the front and back end of Verodin's Security Instrumentation Platform, an innovative, evidence-based approach to managing cybersecurity</li>
          <li>implemented new features and fix bugs in a massive Ruby on Rails application and supplementary Python-based systems</li>
          <li>wrote functional tests and unit tests for Rails back end and client-side Javascript, and configured them to run in CI system (Jenkins/RSpec/Capybara/Poltergeist/PhantomJS/ Jasmine/Teaspoon/Mocha)</li>
          <li>created and maintained dynamic graphics for Rails application using d3.js, amcharts, and jQuery</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.tyco, this.state.currentPage === 3 ? graphics.activeExperienceSection : ""].join(" ")}>
            <a href="http://www.tyco.com/" target="_blank"><div className={[graphics.experienceLogo, graphics.tycoLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>Python Developer</p>
        <p>September 2014-December 2015</p>
        <p>Boca Raton, FL</p>
        <ul>
          <li>developed web and embedded applications for Tyco On, an IoT initiative to create an integrated data and smart services platform for more than a billion devices deployed around the world</li>
          <li>created REST services to support hardware development, such as MAC address provisioning, device sessions, device authentication using LDAP and TOTP</li>
          <li>designed and built network device simulators to test cloud-based systems'​ processing of AMQP, UDP, and HTTP/REST communications from devices</li>
          <li>deployed a real-time device data/monitoring dashboard, device log tracker, and several other IoT-related web applications (Python/Twisted/RabbitMQ/Flask/WebSockets/MariaDB/
          Javascript/d3.js)</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.ut, this.state.currentPage === 4 ? graphics.activeExperienceSection : ""].join(" ")}>
        <a href="https://www.utexas.edu/"><div className={[graphics.experienceLogo, graphics.utLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>
          Software Developer
          <span className={`${[icons.fa, icons["fa-arrow-right"], graphics.promotion].join(" ")}`}></span>
          Software Developer / Analyst</p>
        <p>July 2013-May 2014</p>
        <p>Austin, TX</p>
        <ul>
          <li>gathered requirements, designed, and coded extension of student web registration available to 50,000+ students for canceling their registration for the upcoming semester (Python/Django, IBM z/OS mainframe back end with Natural/Adabas data store)</li>
          <li>built Python/Django middleware to integrate Toopher mobile app-based second factor authentication into existing legacy web systems using REST API</li>
          <li>set up daily mainframe database (Natural/Adabas) to MySQL database ETL process using SQL scripts and cron jobs for legacy IT service provisioning application</li>
          <li>taught Web Application Security course based on OWASP Top Ten and Python/Django course for campus developers</li>
        </ul>
      </section>
      <section className={[nav.experienceNav, nav.experienceNavPrev].join(" ")}>
        <span className={nav.experienceNavContainer}>
          <span className={this.state.prevActive ? [nav.experienceNavArrowCircle, nav.navArrowCircleActive].join(" ") : nav.experienceNavArrowCircle} onMouseEnter={(e) => this.mouseEnter(e, "prev")} onMouseLeave={(e) => this.mouseLeave(e, "prev")} onClick={(e) => this.handleNav("prev")}></span>
          <span className={[icons.fa, icons["fa-chevron-left"]].join(" ")}></span>
        </span>
        <span className={[nav.experienceNavContainer, nav.experienceNavNext].join(" ")}>
          <span className={this.state.nextActive ? [nav.experienceNavArrowCircle, nav.navArrowCircleActive].join(" ") : nav.experienceNavArrowCircle} onMouseEnter={(e) => this.mouseEnter(e, "next")} onMouseLeave={(e) => this.mouseLeave(e, "next")} onClick={(e) => this.handleNav("next")}></span>
          <span className={[icons.fa, icons["fa-chevron-right"]].join(" ")}></span>
        </span>
      </section>
      </div>
    )
  }

}

export class ResumeContainer extends React.Component {

  handleClick(version) {
    if (version === 'full') {
      window.open(brazealLong, '_blank');
    } else if (version === 'short') {
      window.open(brazeal, '_blank');
    }
  }

  render() {
    return(
      <div className={this.props.active ? `${graphics.resumeContainer} ${css.slidIn}` : `${graphics.resumeContainer} ${css.slidOut}`}>
        <label className={[graphics.btn].join(" ")} onClick={(e) => this.handleClick("full", e)}>Full Version pdf</label>
        <label className={[graphics.btn].join(" ")} onClick={(e) => this.handleClick("short", e)}>Short Version pdf</label>
      </div>
    )
  }
}

export class ProjectCardContainer extends React.Component {
  render() {
    return(
      <div className={this.props.active ? `${graphics.projectCardContainer} ${css.slidIn}` : `${graphics.projectCardContainer} ${css.slidOut}`}>
        <div className={graphics.projectCardWrapper}>
        <ProjectCard title="django tic-tac-toe" cardClass="ticTacToe" githubLink="https://github.com/jsonbrazeal/tictactoe" externalLink="http://jasonbrazeal.com/tictactoe">
          <ul>
            <li>Online Game</li>
            <li>Python, Django</li>
            <li>Javascript, jQuery</li>
            <li>Digital Ocean, Nginx, Gunicorn</li>
          </ul>
        </ProjectCard>
        <ProjectCard title="pcapview" cardClass="pcapview" githubLink="https://github.com/jsonbrazeal/pcapview">
          <ul>
            <li>Network Traffic Visualization Tool</li>
            <li>Python, Flask</li>
            <li>Javascript, d3.js</li>
          </ul>
        </ProjectCard>
        {/* <ProjectCard title="border wait times" cardClass="border" githubLink="https://github.com/jsonbrazeal">
          <ul>
            <li>Amazon Alexa Skill</li>
            <li>Python, Selenium</li>
            <li>AWS, EC2, DynamoDB</li>
          </ul>
        </ProjectCard> */}
        <ProjectCard title="notes viewer" cardClass="notes" githubLink="https://github.com/jsonbrazeal/notes">
          <ul>
            <li>Local File Browser Interface</li>
            <li>Python, Flask</li>
            <li>Javascript, React, Webpack</li>
          </ul>
        </ProjectCard>
        <ProjectCard title="randogen" cardClass="randogen" githubLink="https://github.com/jsonbrazeal/randogen">
          <ul>
            <li>Random Number Generator</li>
            <li>Rest Client for <a href="https://www.random.org/">random.org</a></li>
            <li>Python, Requests</li>
          </ul>
        </ProjectCard>
        <ProjectCard title="jasonbrazeal.com" cardClass="jasonBrazeal" githubLink="https://github.com/jsonbrazeal/jasonbrazeal-com-2.0.0" externalLink="http://jasonbrazeal.com">
          <ul>
            <li>Personal Website Redesign (<a href="http://jasonbrazeal.com">see old site</a>)</li>
            <li>Python, Flask</li>
            <li>Javascript, React, Webpack</li>
            <li>Digital Ocean, Nginx, Gunicorn</li>
          </ul>
        </ProjectCard>
        </div>
      </div>
    )
  }
}


export class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: false
    };
  }

  mouseEnter(e) {
    this.setState({
      active: true
    });
  }

  mouseLeave(e) {
    this.setState({
      active: false
    });
  }

  handleClick()  {
    this.setState({
      open: !this.state.open,
      active: false
    });
  }

  render() {
    if (this.props.externalLink) {
      var externalLink = (
        <a href={this.props.externalLink} target="blank">
          <i className={[icons.fa, icons['fa-external-link']].join(" ")}></i>
        </a>
      )
    } else {
      var externalLink = null;
    }
    return(
      <div className={this.state.open ? `${graphics.card} ${graphics.active} ${graphics[this.props.cardClass]}` : `${graphics.card} ${graphics[this.props.cardClass]}`}>
        <div className={graphics.cardImage}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={graphics.cardBody}>
          <div className={graphics.controls}>
            <a href="#">
              <span onClick={(e) => this.handleClick()} className={this.state.active ? [graphics.projectCardNav, graphics.projectCardNavActive].join(" ") : graphics.projectCardNav} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)}></span>
              <i className={[graphics.up, icons.fa, icons['fa-chevron-up']].join(" ")}></i>
              <i className={[graphics.down, icons.fa, icons['fa-chevron-down']].join(" ")}></i>
            </a>
            {externalLink}
            <a href={this.props.githubLink} target="blank">
              <i className={[icons.fa, icons['fa-github']].join(" ")}></i>
            </a>
          </div>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}


export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <hr className={css.orangeBorder} />
        <div className={nav.footerWrapper}>
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
        2018 Jason Brazeal
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
    typewriter(document);
  }

  render() {
    return(
      <h2>
        <span
          className={graphics.typewriter}
          data-period="20"
          data-rotate='["software engineer", "full stack developer", "coder."]'>
          <span className={graphics.typewriterWrap}></span>
          <span className={[graphics.typewriterCaret].join(" ")}>|</span>
        </span>
      </h2>
    )
  }
}

export class MachineGraphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    this.machine.addEventListener("machineStart", this.handleMachine.bind(this));
  }

  componentWillUnmount() {
    this.machine.removeEventListener("machineStop", this.handleMachine.bind(this));
  }

  handleMachine() {
    if (this.state.active) {
    } else {
      document.querySelector(`.${graphics.lightBulb}`).classList.add(animations.lightBulbFall);
      this.fidgetSpinner.classList.add(animations.rotateFidgetSpinner);
      this.valve.classList.add(animations.rotateValve);
      this.startLights();
      this.gear1.classList.add(animations.rotateGear1);
      this.gear2.classList.add(animations.rotateGear2);
      this.code.classList.add(animations.code);
      this.needle1.classList.add(animations.needle1);
      this.needle2.classList.add(animations.needle2);
      this.needle3.classList.add(animations.needle3);
      this.tank1.classList.add(animations.fadeIn);
      this.tank2.classList.add(animations.fadeIn);
      this.redLight.classList.add(animations.redFlash);
      this.electricPotential.classList.add(animations.electricFlow);
      document.querySelector(`.${graphics.cloudApp}`).classList.add(animations.cloudApp);
    }
  }

  startLights() {
    [this.gaugeLights1, this.gaugeLights2, this.gaugeLights3].forEach((gauge, i, arr) => {
      [...gauge.children].forEach((light, i, arr) => {
        setTimeout(() => {
          light.style.display = 'none';
        }, i * 50);
      });
      let jitter = Math.random() * Math.floor(i + 2);
      [...gauge.children].forEach((light, i, arr) => {
        setTimeout(() => {
          light.style.display = 'block';
        }, (i + jitter) * 400);
      });
    });
    setTimeout(() => {
      this.startLights();
    }, 5000);
  }

  render() {
    return(

      <svg ref={elem => this.machine = elem} className={graphics.machine} viewBox="0 -400 1200 800" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <rect id="path-1" x="318" y="197" width="205" height="97.5" rx="2"></rect>
          <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="205" height="97.5" fill="white">
            <use xlinkHref="#path-1"></use>
        </mask>
        <polygon id="path-3" points="691.978715 295 763.978715 295 763.978715 375 692.835858 375"></polygon>
        <mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="-4" y="-4" width="79.9787149" height="88">
          <rect x="688" y="291" width="79.9787149" height="88" fill="white"></rect>
          <use xlinkHref="#path-3" fill="black"></use>
        </mask>
      <polygon id="path-5" points="599 295 671 295 671 375 599.857143 375"></polygon>
      <mask id="mask-6" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="-4" y="-4" width="79.9787149" height="88">
        <rect x="595.021285" y="291" width="79.9787149" height="88" fill="white"></rect>
        <use xlinkHref="#path-5" fill="black"></use>
        </mask>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-7">
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feColorMatrix values="0 0 0 0 0.380048895   0 0 0 0 0.379389087   0 0 0 0 0.379389087  0 0 0 0.5 0" type="matrix" in="shadowOffsetOuter1" result="shadowMatrixOuter1"></feColorMatrix>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g className={graphics.cloudApp} id="cloudAppGroup" stroke="none" fill="#D8D8D8" fillRule="evenodd">
      <path d="M773.471977,318.816193 C776.750959,322.023402 781.236381,324 786.183,324 C793.381564,324 799.603426,319.814058 802.55186,313.741201 C807.199736,315.974313 812.407931,317.225225 817.908,317.225225 C826.747935,317.225225 834.833895,313.993839 841.051334,308.646728 C844.655726,310.864887 848.898619,312.144144 853.44,312.144144 C866.522521,312.144144 877.128,301.528049 877.128,288.432432 C877.128,275.336816 866.522521,264.720721 853.44,264.720721 C852.044853,264.720721 850.677876,264.841453 849.348927,265.073048 C848.546797,263.55248 847.637804,262.097134 846.631955,260.717029 C845.873612,246.898901 834.439729,235.927928 820.446,235.927928 C813.693338,235.927928 807.536746,238.482559 802.888129,242.679003 C800.846906,235.365127 794.140873,230 786.183,230 C776.985147,230 769.459646,237.167357 768.876373,246.226918 C753.194039,247.70171 740.922,260.916276 740.922,277 C740.922,279.334111 741.180456,281.607796 741.670283,283.793943 C737.541229,288.061689 735,293.877923 735,300.288288 C735,313.383905 745.605479,324 758.688,324 C764.280221,324 769.419837,322.060229 773.471977,318.816193 Z"></path>
    </g>
    <g className={graphics.lightBulb} id="lighBulbGroup" stroke="none" strokeWidth="1" fillRule="evenodd" fill="#FB9B51">
      <path d="M85.3886364,53.9125926 C60.7878788,53.9125926 40.8325758,73.886358 40.8325758,98.5317284 C40.8325758,106.643333 43.1049242,114.186914 46.7719697,120.804136 C57.7121212,140.546975 60.6155303,151.628765 62.405303,162.354877 C63.9007576,171.345062 65.9689394,173.434012 72.7515152,173.434012 L85.3886364,173.434012 L98.0284091,173.434012 C104.824242,173.434012 106.895076,171.345062 108.387879,162.354877 C110.182955,151.623457 113.083712,140.539012 124.021212,120.804136 C127.701515,114.189568 129.960606,106.645988 129.960606,98.5317284 C129.968561,73.8837037 110.013258,53.9125926 85.3886364,53.9125926 L85.3886364,53.9125926 Z" id="Shape"></path>
      <path d="M101.332197,176.664321 L69.4795455,176.664321 C68.1537879,176.664321 67.0852273,177.731358 67.0852273,179.05321 L67.0852273,180.651111 C67.0852273,181.967654 68.1537879,183.04 69.4795455,183.04 L101.332197,183.04 C102.639394,183.04 103.710606,181.967654 103.710606,180.651111 L103.710606,179.05321 C103.715909,177.731358 102.639394,176.664321 101.332197,176.664321 L101.332197,176.664321 Z" id="Shape"></path>
      <path d="M101.332197,186.22784 L69.4795455,186.22784 C68.1537879,186.22784 67.0852273,187.289568 67.0852273,188.616728 L67.0852273,190.21463 C67.0852273,191.531173 68.1537879,192.59821 69.4795455,192.59821 L101.332197,192.59821 C102.639394,192.59821 103.710606,191.531173 103.710606,190.21463 L103.710606,188.616728 C103.715909,187.292222 102.639394,186.22784 101.332197,186.22784 L101.332197,186.22784 Z" id="Shape"></path>
      <path d="M101.332197,195.794012 L69.4795455,195.794012 C68.1537879,195.794012 67.0852273,196.861049 67.0852273,198.182901 L67.0852273,199.780802 C67.0852273,201.102654 68.1537879,202.169691 69.4795455,202.169691 L101.332197,202.169691 C102.639394,202.169691 103.710606,201.102654 103.710606,199.780802 L103.710606,198.182901 C103.715909,196.861049 102.639394,195.794012 101.332197,195.794012 L101.332197,195.794012 Z" id="Shape"></path>
      <path d="M73.4568182,205.357531 L97.3549242,205.357531 C97.3549242,210.137963 90.9753788,213.325802 85.3886364,213.325802 C79.8284091,213.325802 73.4568182,210.137963 73.4568182,205.357531 L73.4568182,205.357531 Z" id="Shape"></path>
      <path d="M136.578788,22.501358 C140.640909,15.3798148 129.671591,8.98555556 125.575,16.0938272 C123.429924,19.8072222 107.910606,46.7273457 107.910606,46.7273457 L118.946212,53.1030247 C118.946212,53.1030247 132.731439,29.1690123 136.568182,22.5305556 C136.576136,22.5279012 136.576136,22.5225926 136.576136,22.5225926 L136.578788,22.501358 L136.578788,22.501358 L136.578788,22.501358 Z" id="Shape"></path>
      <path d="M161.420833,47.4333951 L161.420833,47.4333951 L161.412879,47.441358 L161.391667,47.4440123 C155.791667,50.6849383 131.784848,64.5617284 131.784848,64.5617284 L138.14053,75.6037037 C138.14053,75.6037037 162.205682,61.697716 167.805682,58.4620988 C174.927652,54.3532099 168.534848,43.3616667 161.420833,47.4333951 L161.420833,47.4333951 Z" id="Shape"></path>
      <path d="M92.0015152,7.15141975 L92.0015152,41.1585802 L79.2583333,41.1585802 L79.2583333,7.15141975 C79.2583333,-1.07166667 92.0015152,-1.07166667 92.0015152,7.15141975 L92.0015152,7.15141975 Z" id="Shape"></path>
      <path d="M34.4238636,22.501358 C30.3617424,15.3798148 41.3337121,8.98555556 45.4329545,16.0938272 C47.5753788,19.8072222 63.094697,46.7273457 63.094697,46.7273457 L52.069697,53.1030247 C52.069697,53.1030247 38.2606061,29.1690123 34.4318182,22.5305556 L34.4318182,22.5225926 L34.4238636,22.501358 L34.4238636,22.501358 L34.4238636,22.501358 Z" id="Shape"></path>
      <path d="M9.58977273,47.4333951 L9.58977273,47.4333951 L9.58977273,47.441358 L9.60833333,47.4440123 C15.2189394,50.6849383 39.217803,64.5617284 39.217803,64.5617284 L32.8488636,75.6037037 C32.8488636,75.6037037 8.78371212,61.697716 3.18636364,58.4620988 C-3.92765152,54.3532099 2.4625,43.3616667 9.58977273,47.4333951 L9.58977273,47.4333951 Z"></path>
    </g>
    <rect id="codeWindowRectangle" x="318" y="197" width="205" height="97.5" rx="2" stroke="#777777" strokeWidth="2" fill="#FFFFFF" fillRule="evenodd"></rect>
    <g ref={elem => this.code = elem} className={graphics.code} id="code" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26,47.1459048 L38.9420131,0" id="Line" stroke="#4DB09A" strokeWidth="5"></path>
      <path d="M0,41.2055538 L14.8156678,26" id="Line-Copy" stroke="#4DB09A" strokeWidth="5" transform="translate(7.407834, 33.602777) scale(1, -1) translate(-7.407834, -33.602777) "></path>
      <path d="M0,25.2055538 L14.8156678,10" id="Line-Copy-2" stroke="#4DB09A" strokeWidth="5"></path>
      <path d="M51,41.2055538 L65.8156678,26" id="Line-Copy-4" stroke="#4DB09A" strokeWidth="5" transform="translate(58.407834, 33.602777) scale(-1, -1) translate(-58.407834, -33.602777) "></path>
      <path d="M51,25.2055538 L65.8156678,10" id="Line-Copy-3" stroke="#4DB09A" strokeWidth="5" transform="translate(58.407834, 17.602777) scale(-1, 1) translate(-58.407834, -17.602777) "></path>
    </g>
    <g id="electricity" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(283.000000, 106.000000)">
          <path ref={elem => this.electricPotential = elem} className={graphics.electricPotential} d="M16.0429688,7.8203125 L35.1730116,25.3203125 L51.5042119,10.3913707 L73.3037778,25.3203125 C73.3037778,25.3203125 95.8323685,8.16307141 99.0429688,10.3913707" stroke="#F2E64E" strokeWidth="3"></path>
      <rect id="separator1" fill="#D8D8D8" transform="translate(31.500000, 46.500000) rotate(-31.000000) translate(-31.500000, -46.500000) " x="28" y="12" width="7" height="69" rx="3.5"></rect>
      <rect id="separator1-copy" fill="#D8D8D8" transform="translate(81.500000, 46.500000) scale(-1, 1) rotate(-31.000000) translate(-81.500000, -46.500000) " x="78" y="12" width="7" height="69" rx="3.5"></rect>
      <circle id="electricity_ball1" fill="#666666" cx="10.1440543" cy="10.1440543" r="10.1440543"></circle>
      <path d="M102.144054,20.2881085 C107.746461,20.2881085 112.288109,15.7464607 112.288109,10.1440543 C112.288109,4.54164779 107.746461,-1.13686838e-13 102.144054,-1.13686838e-13 C96.5416478,-1.13686838e-13 92,4.54164779 92,10.1440543 C92,15.7464607 96.5416478,20.2881085 102.144054,20.2881085 Z" id="electricity_ball2" fill="#666666"></path>
    </g>
    <g id="light" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(744.000000, 115.000000)">
      <path ref={elem => this.redLight = elem} d="M45.9088792,23.3712982 C45.9691809,22.7185425 46,22.0572962 46,21.3888889 C46,9.57613174 36.3741221,0 24.5,0 C12.6258779,0 3,9.57613174 3,21.3888889 C3,22.0579311 3.03087769,22.7197987 3.09129271,23.3731583 C3.03149572,23.6484234 3,23.9342459 3,24.2274256 L3,58.9947966 C3,61.2163545 4.79387055,63 7.00672201,63 L41.993278,63 C44.2070888,63 46,61.2068093 46,58.9947966 L46,24.2274256 C46,23.933335 45.9685632,23.6469185 45.9088792,23.3712982 Z" stroke="#AAAAAA" fill="#D55050"></path>
      <rect id="Rectangle-3-Copy" fill="#777777" x="0.468725869" y="46" width="48.5312741" height="6.27476038" rx="2"></rect>
    </g>
    <g id="funnel2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(828.000000, 280.500000) rotate(90.000000) translate(-828.000000, -280.500000) translate(722.500000, 219.500000)">
      <polygon id="Triangle" fill="#777777" points="0 6.21744885 209.517572 6.21744885 104.758786 100.466454"></polygon>
      <rect id="Rectangle" fill="#999999" opacity="0.98999995" x="52.1277955" y="51.3003195" width="105.089457" height="70.3354633"></rect>
      <polygon id="Triangle-2" fill="#999999" transform="translate(157.594140, 53.541484) scale(1, -1) translate(-157.594140, -53.541484) " points="105 6.68762476 210.18828 100.395342 105 100.395342"></polygon>
      <rect id="Rectangle-Copy" fill="#AAAAAA" opacity="0.98999995" x="105.086262" y="51.3003195" width="52.9584665" height="70.3354633"></rect>
      <rect id="Rectangle-3" fill="#D8D8D8" x="0.482428115" y="1.13686838e-13" width="209.517572" height="8.27476038" rx="2"></rect>
      <rect id="Rectangle-3" fill="#777777" x="49.6453674" y="74.7795527" width="110.054313" height="8.27476038" rx="2"></rect>
    </g>
    <g id="funnel1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(40.000000, 71.000000)">
      <polygon id="Triangle" fill="#777777" points="0 6.21744885 209.517572 6.21744885 104.758786 100.466454"></polygon>
      <rect id="Rectangle" fill="#999999" opacity="0.98999995" x="52.1277955" y="51.3003195" width="105.089457" height="70.3354633"></rect>
      <polygon id="Triangle-2" fill="#999999" transform="translate(157.594140, 53.541484) scale(1, -1) translate(-157.594140, -53.541484) " points="105 6.68762476 210.18828 100.395342 105 100.395342"></polygon>
      <rect id="Rectangle-Copy" fill="#AAAAAA" opacity="0.98999995" x="105.086262" y="51.3003195" width="52.9584665" height="70.3354633"></rect>
      <rect id="Rectangle-3" fill="#D8D8D8" x="0.482428115" y="1.13686838e-13" width="209.517572" height="8.27476038" rx="2"></rect>
      <rect id="Rectangle-3" fill="#777777" x="49.6453674" y="74.7795527" width="110.054313" height="8.27476038" rx="2"></rect>
    </g>
    <rect id="separator1" stroke="none" fill="#D8D8D8" fillRule="evenodd" x="275" y="152" width="15" height="243" rx="7.5"></rect>
    <rect id="separator2" stroke="none" fill="#D8D8D8" fillRule="evenodd" x="548" y="168" width="15" height="227" rx="7.5"></rect>
    <rect id="section3" stroke="none" fill="#AAAAAA" fillRule="evenodd" x="560" y="166" width="246" height="227" rx="2"></rect>
    <g id="gears" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(683.028315, 231.553442) rotate(15.000000) translate(-683.028315, -231.553442) translate(621.028315, 173.053442)">
      <path ref={elem => this.gear1 = elem} d="M44.5085566,90.001719 C44.5870983,89.3472055 44.6394593,88.6665115 44.6394593,87.9596369 C44.6394593,87.2527624 44.5870983,86.5720684 44.4823761,85.9175549 L48.9068872,82.4617237 C49.2995953,82.1475573 49.4043174,81.5715854 49.1686926,81.1265163 L44.9798063,73.874507 C44.718001,73.4032573 44.1682096,73.246174 43.6969599,73.4032573 L38.4870327,75.4977004 C37.38745,74.6599231 36.2355063,73.9792291 34.9526599,73.4556183 L34.1672438,67.9053441 C34.0887021,67.3817333 33.643633,67.0152058 33.1200222,67.0152058 L24.7422497,67.0152058 C24.218639,67.0152058 23.7997503,67.3817333 23.7212087,67.9053441 L22.9357926,73.4556183 C21.6529461,73.9792291 20.4748219,74.6861037 19.4014198,75.4977004 L14.1914925,73.4032573 C13.7202428,73.2199935 13.1704515,73.4032573 12.9086461,73.874507 L8.7197599,81.1265163 C8.45795451,81.597766 8.56267667,82.1475573 8.98156529,82.4617237 L13.4060764,85.9175549 C13.3013542,86.5720684 13.2228126,87.2789429 13.2228126,87.9596369 C13.2228126,88.6403309 13.2751737,89.3472055 13.3798958,90.001719 L8.95538475,93.4575501 C8.56267667,93.7717166 8.45795451,94.3476884 8.69357936,94.7927576 L12.8824656,102.044767 C13.144271,102.516017 13.6940623,102.6731 14.165312,102.516017 L19.3752393,100.421573 C20.4748219,101.259351 21.6267656,101.940045 22.909612,102.463655 L23.6950282,108.01393 C23.7997503,108.537541 24.218639,108.904068 24.7422497,108.904068 L33.1200222,108.904068 C33.643633,108.904068 34.0887021,108.537541 34.1410632,108.01393 L34.9264794,102.463655 C36.2093258,101.940045 37.38745,101.23317 38.4608521,100.421573 L43.6707794,102.516017 C44.1420291,102.69928 44.6918204,102.516017 44.9536258,102.044767 L49.142512,94.7927576 C49.4043174,94.3215079 49.2995953,93.7717166 48.8807066,93.4575501 L44.5085566,90.001719 L44.5085566,90.001719 Z M28.931136,95.8137986 C24.611347,95.8137986 21.0769743,92.2794258 21.0769743,87.9596369 C21.0769743,83.639848 24.611347,80.1054752 28.931136,80.1054752 C33.2509249,80.1054752 36.7852977,83.639848 36.7852977,87.9596369 C36.7852977,92.2794258 33.2509249,95.8137986 28.931136,95.8137986 L28.931136,95.8137986 Z" id="Shape" fill="#666666" transform="translate(28.931136, 87.959637) rotate(-35.000000) translate(-28.931136, -87.959637) "></path>
      <path ref={elem => this.gear2 = elem} d="M100.299948,55.5539861 C100.44097,54.3788049 100.534984,53.1566164 100.534984,51.8874206 C100.534984,50.6182248 100.44097,49.3960363 100.252941,48.2208551 L108.197166,42.015898 C108.902275,41.451811 109.090304,40.4176515 108.667239,39.6185283 L101.146079,26.59752 C100.676006,25.7513895 99.6888538,25.469346 98.8427233,25.7513895 L89.4882805,29.5119695 C87.513976,28.0077375 85.445657,26.785549 83.1423017,25.845404 L81.7320842,15.8798669 C81.5910625,14.9397219 80.7919392,14.2816204 79.8517942,14.2816204 L64.8094741,14.2816204 C63.8693291,14.2816204 63.1172131,14.9397219 62.9761914,15.8798669 L61.5659739,25.845404 C59.2626186,26.785549 57.1472923,28.0547447 55.2199951,29.5119695 L45.8655523,25.7513895 C45.0194218,25.4223387 44.0322695,25.7513895 43.562197,26.59752 L36.041037,39.6185283 C35.5709645,40.4646588 35.7589935,41.451811 36.5111095,42.015898 L44.4553348,48.2208551 C44.2673058,49.3960363 44.126284,50.6652321 44.126284,51.8874206 C44.126284,53.1096091 44.2202985,54.3788049 44.4083275,55.5539861 L36.4641022,61.7589432 C35.7589935,62.3230302 35.5709645,63.3571897 35.9940297,64.1563129 L43.5151898,77.1773212 C43.9852623,78.0234517 44.9724145,78.3054952 45.818545,78.0234517 L55.1729878,74.2628717 C57.1472923,75.7671037 59.2156114,76.9892922 61.5189666,77.9294372 L62.9291841,87.8949743 C63.1172131,88.8351193 63.8693291,89.4932208 64.8094741,89.4932208 L79.8517942,89.4932208 C80.7919392,89.4932208 81.5910625,88.8351193 81.685077,87.8949743 L83.0952945,77.9294372 C85.3986498,76.9892922 87.513976,75.7200965 89.4412733,74.2628717 L98.7957161,78.0234517 C99.6418466,78.3525025 100.628999,78.0234517 101.099071,77.1773212 L108.620231,64.1563129 C109.090304,63.3101824 108.902275,62.3230302 108.150159,61.7589432 L100.299948,55.5539861 L100.299948,55.5539861 Z M72.3306342,65.9895957 C64.5744379,65.9895957 58.2284591,59.6436169 58.2284591,51.8874206 C58.2284591,44.1312243 64.5744379,37.7852455 72.3306342,37.7852455 C80.0868305,37.7852455 86.4328093,44.1312243 86.4328093,51.8874206 C86.4328093,59.6436169 80.0868305,65.9895957 72.3306342,65.9895957 L72.3306342,65.9895957 Z" id="Shape" fill="#666666" transform="translate(72.330634, 51.887421) rotate(-35.000000) translate(-72.330634, -51.887421) "></path>
    </g>
    <path d="M288,177.001882 C288,175.896273 288.904172,175 289.991899,175 L550.008101,175 C551.108196,175 552,175.901311 552,177.001882 L552,390.998118 C552,392.103727 551.095828,393 550.008101,393 L289.991899,393 C288.891804,393 288,392.098689 288,390.998118 L288,177.001882 Z M318,198.991781 C318,197.891751 318.891569,197 319.995958,197 L521.004042,197 C522.106379,197 523,197.902953 523,198.991781 L523,292.508219 C523,293.608249 522.108431,294.5 521.004042,294.5 L319.995958,294.5 C318.893621,294.5 318,293.597047 318,292.508219 L318,198.991781 Z" id="section2_codeWindow" stroke="none" fill="#AAAAAA" fillRule="evenodd"></path>
    <rect id="section1" stroke="none" fill="#AAAAAA" fillRule="evenodd" x="15" y="154" width="264" height="239" rx="2"></rect>
    <g id="tank2" stroke="none" fill="none">
      <use fill="#6A4F8E" fillRule="evenodd" xlinkHref="#path-3"></use>
      <use stroke="#777777" mask="url(#mask-4)" strokeWidth="8" xlinkHref="#path-3"></use>
    </g>

    <g ref={elem => this.tank2 = elem} className={graphics.tank2}>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new" d="M28.018,81.221c0,1.975-1.6,3.573-3.574,3.573l0,0
    c-1.974,0-3.574-1.601-3.574-3.573l0,0c0-1.975,1.601-3.574,3.574-3.574l0,0C26.418,77.646,28.018,79.246,28.018,81.221
      L28.018,81.221z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M39.018,51.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.974,0-3.574-1.601-3.574-3.573l0,0c0-1.975,1.601-3.575,3.574-3.575l0,0C37.418,47.646,39.018,49.246,39.018,51.221
      L39.018,51.221z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M65.018,81.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.973,0-3.573-1.601-3.573-3.573l0,0c0-1.975,1.601-3.574,3.573-3.574l0,0C63.418,77.646,65.018,79.246,65.018,81.221
      L65.018,81.221z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M58.018,59.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.973,0-3.573-1.601-3.573-3.573l0,0c0-1.975,1.601-3.574,3.573-3.574l0,0C56.418,55.646,58.018,57.246,58.018,59.221
      L58.018,59.221z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M23.165,61.221c0,0.949-0.771,1.719-1.721,1.719l0,0
      c-0.949,0-1.72-0.77-1.72-1.719l0,0c0-0.951,0.771-1.721,1.72-1.721l0,0C22.394,59.5,23.165,60.27,23.165,61.221L23.165,61.221z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M45.165,71.221c0,2.055-1.667,3.719-3.721,3.719l0,0
      c-2.053,0-3.719-1.664-3.719-3.719l0,0c0-2.056,1.667-3.72,3.719-3.72l0,0C43.498,67.501,45.165,69.165,45.165,71.221L45.165,71.221
      z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M43.877,86.221c0,1.344-1.09,2.432-2.434,2.432l0,0
      c-1.343,0-2.433-1.088-2.433-2.432l0,0c0-1.345,1.09-2.434,2.433-2.434l0,0C42.788,83.787,43.877,84.876,43.877,86.221
      L43.877,86.221z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M63.999,42.22c0,1.411-1.146,2.554-2.556,2.554l0,0
      c-1.408,0-2.553-1.143-2.553-2.554l0,0c0-1.411,1.145-2.554,2.553-2.554l0,0C62.854,39.666,63.999,40.809,63.999,42.22L63.999,42.22
      z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M23.109,46.601c0,0.709-0.575,1.283-1.285,1.283l0,0
      c-0.708,0-1.283-0.573-1.283-1.283l0,0c0-0.709,0.575-1.284,1.283-1.284l0,0C22.534,45.317,23.109,45.891,23.109,46.601
      L23.109,46.601z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M53.075,49.444c0,0.709-0.574,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.573-1.283-1.283l0,0c0-0.709,0.575-1.283,1.283-1.283l0,0C52.5,48.161,53.075,48.734,53.075,49.444L53.075,49.444
      z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M53.497,74.723c0,0.711-0.575,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.572-1.283-1.283l0,0c0-0.709,0.575-1.281,1.283-1.281l0,0C52.921,73.439,53.497,74.014,53.497,74.723
      L53.497,74.723z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M26.061,70.771c0,0.709-0.575,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.574-1.283-1.283l0,0c0-0.709,0.575-1.283,1.283-1.283l0,0C25.486,69.486,26.061,70.062,26.061,70.771
      L26.061,70.771z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M65.877,68.221c0,1.344-1.09,2.432-2.434,2.432l0,0
      c-1.344,0-2.434-1.088-2.434-2.432l0,0c0-1.345,1.09-2.434,2.434-2.434l0,0C64.788,65.787,65.877,66.876,65.877,68.221
      L65.877,68.221z"></path>
    </g>

    <rect id="tank2_highlight" stroke="none" fill="#D8D8D8" fillRule="evenodd" opacity="0.100000001" x="702" y="295" width="15" height="80"></rect>
    <g id="tank1" stroke="none" fill="none">
      <use fill="#6A4F8E" fillRule="evenodd" xlinkHref="#path-5"></use>
      <use stroke="#777777" mask="url(#mask-6)" strokeWidth="8" xlinkHref="#path-5"></use>
    </g>

    <g ref={elem => this.tank1 = elem} className={graphics.tank1}>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new" d="M28.018,81.221c0,1.975-1.6,3.573-3.574,3.573l0,0
    c-1.974,0-3.574-1.601-3.574-3.573l0,0c0-1.975,1.601-3.574,3.574-3.574l0,0C26.418,77.646,28.018,79.246,28.018,81.221
      L28.018,81.221z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M39.018,51.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.974,0-3.574-1.601-3.574-3.573l0,0c0-1.975,1.601-3.575,3.574-3.575l0,0C37.418,47.646,39.018,49.246,39.018,51.221
      L39.018,51.221z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M65.018,81.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.973,0-3.573-1.601-3.573-3.573l0,0c0-1.975,1.601-3.574,3.573-3.574l0,0C63.418,77.646,65.018,79.246,65.018,81.221
      L65.018,81.221z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M58.018,59.221c0,1.975-1.6,3.573-3.574,3.573l0,0
      c-1.973,0-3.573-1.601-3.573-3.573l0,0c0-1.975,1.601-3.574,3.573-3.574l0,0C56.418,55.646,58.018,57.246,58.018,59.221
      L58.018,59.221z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M23.165,61.221c0,0.949-0.771,1.719-1.721,1.719l0,0
      c-0.949,0-1.72-0.77-1.72-1.719l0,0c0-0.951,0.771-1.721,1.72-1.721l0,0C22.394,59.5,23.165,60.27,23.165,61.221L23.165,61.221z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M45.165,71.221c0,2.055-1.667,3.719-3.721,3.719l0,0
      c-2.053,0-3.719-1.664-3.719-3.719l0,0c0-2.056,1.667-3.72,3.719-3.72l0,0C43.498,67.501,45.165,69.165,45.165,71.221L45.165,71.221
      z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M43.877,86.221c0,1.344-1.09,2.432-2.434,2.432l0,0
      c-1.343,0-2.433-1.088-2.433-2.432l0,0c0-1.345,1.09-2.434,2.433-2.434l0,0C42.788,83.787,43.877,84.876,43.877,86.221
      L43.877,86.221z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M63.999,42.22c0,1.411-1.146,2.554-2.556,2.554l0,0
      c-1.408,0-2.553-1.143-2.553-2.554l0,0c0-1.411,1.145-2.554,2.553-2.554l0,0C62.854,39.666,63.999,40.809,63.999,42.22L63.999,42.22
      z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M23.109,46.601c0,0.709-0.575,1.283-1.285,1.283l0,0
      c-0.708,0-1.283-0.573-1.283-1.283l0,0c0-0.709,0.575-1.284,1.283-1.284l0,0C22.534,45.317,23.109,45.891,23.109,46.601
      L23.109,46.601z"></path>
    <path className={animations.bubbleUp2} fill="#FFFFFF" enableBackground="new    " d="M53.075,49.444c0,0.709-0.574,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.573-1.283-1.283l0,0c0-0.709,0.575-1.283,1.283-1.283l0,0C52.5,48.161,53.075,48.734,53.075,49.444L53.075,49.444
      z"></path>
    <path className={animations.bubbleUp3} fill="#FFFFFF" enableBackground="new    " d="M53.497,74.723c0,0.711-0.575,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.572-1.283-1.283l0,0c0-0.709,0.575-1.281,1.283-1.281l0,0C52.921,73.439,53.497,74.014,53.497,74.723
      L53.497,74.723z"></path>
    <path className={animations.bubbleUp4} fill="#FFFFFF" enableBackground="new    " d="M26.061,70.771c0,0.709-0.575,1.283-1.284,1.283l0,0
      c-0.708,0-1.283-0.574-1.283-1.283l0,0c0-0.709,0.575-1.283,1.283-1.283l0,0C25.486,69.486,26.061,70.062,26.061,70.771
      L26.061,70.771z"></path>
    <path className={animations.bubbleUp1} fill="#FFFFFF" enableBackground="new    " d="M65.877,68.221c0,1.344-1.09,2.432-2.434,2.432l0,0
      c-1.344,0-2.434-1.088-2.434-2.432l0,0c0-1.345,1.09-2.434,2.434-2.434l0,0C64.788,65.787,65.877,66.876,65.877,68.221
      L65.877,68.221z"></path>
    </g>

    <rect id="tank1_highlight" stroke="none" fill="#D8D8D8" fillRule="evenodd" opacity="0.1" x="609" y="295" width="15" height="80"></rect>
    <rect id="gauge3" stroke="#999999" strokeWidth="1" fill="#666666" fillRule="evenodd" x="46" y="357" width="205" height="17.5" rx="2"></rect>
    <rect id="gauge2" stroke="#999999" strokeWidth="1" fill="#666666" fillRule="evenodd" x="46" y="330" width="205" height="17.5" rx="2"></rect>
    <rect id="gauge1" stroke="#999999" strokeWidth="1" fill="#666666" fillRule="evenodd" x="46" y="304" width="205" height="17.5" rx="2"></rect>
      <g ref={elem => this.gaugeLights1 = elem} className={graphics.gaugeLights}stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(55.000000, 306.000000)">
      <circle id="light" fill="#F2E64E" cx="7" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="27" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="46" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="66" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="85" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="105" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="124" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="144" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="163" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="183" cy="7" r="7"></circle>
    </g>
      <g ref={elem => this.gaugeLights2 = elem} className={graphics.gaugeLights} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(55.000000, 332.000000)">
      <circle id="light" fill="#F2E64E" cx="7" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="27" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="46" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="66" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="85" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="105" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="124" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="144" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="163" cy="7" r="7"></circle>
      <circle id="light" fill="#F2E64E" cx="183" cy="7" r="7"></circle>
    </g>
      <g ref={elem => this.gaugeLights3 = elem} className={graphics.gaugeLights} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(54.000000, 359.000000)">
      <circle id="light" fill="#F3E74E" cx="7" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="27" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="46" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="66" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="85" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="105" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="124" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="144" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="163" cy="7" r="7"></circle>
      <circle id="light" fill="#F3E74E" cx="183" cy="7" r="7"></circle>
    </g>
    <g id="dial1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(316.000000, 319.000000)">
      <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
      <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
      <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
      <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
      <path ref={elem => this.needle1 = elem} className={graphics.needle1} d="M14.5,14.5 L29.6137817,27.5986108" id="needle" stroke="#666666" strokeWidth="4" strokeLinecap="square"></path>
    </g>
    <g id="dial2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(394.000000, 319.000000)">
      <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
      <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
      <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
      <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
      <path ref={elem => this.needle2 = elem} className={graphics.needle2} d="M34.5,8.5 L29.6137817,27.5986108" id="needle" stroke="#666666" strokeWidth="4" strokeLinecap="square"></path>
    </g>
    <g id="dial3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(474.000000, 319.000000)">
      <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
      <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
      <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
      <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
      <path ref={elem => this.needle3 = elem} className={graphics.needle3} d="M49.5,22.5 L31.4919759,27.7582008" id="needle" stroke="#666666" strokeWidth="4" strokeLinecap="square"></path>
    </g>
      <g className={graphics.fidgetSpinner} filter="url(#filter-7)" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(88.000000, 170.000000)">
      <g id="Group" fill="#346D98">
        <g ref={elem => this.fidgetSpinner = elem}>
          <path d="M59.9331813,6.62083333 C51.5544183,6.62083333 44.7626965,13.2509358 44.7626965,21.4303133 C44.7626965,29.6096908 51.5544183,36.2411175 59.9331813,36.2411175 C68.3119442,36.2411175 75.103666,29.611015 75.103666,21.4316375 C75.103666,13.25226 68.3119442,6.62083333 59.9331813,6.62083333 L59.9331813,6.62083333 Z M59.9331813,29.9433808 C55.1178003,29.9433808 51.2139506,26.1324292 51.2139506,21.4316375 C51.2139506,16.7308458 55.1178003,12.9198942 59.9331813,12.9198942 C64.7485622,12.9198942 68.652412,16.7308458 68.652412,21.4316375 C68.652412,26.1324292 64.7485622,29.9433808 59.9331813,29.9433808 L59.9331813,29.9433808 Z" id="Shape"></path>
          <path d="M96.5572056,67.5325 C88.1784427,67.5325 81.3867209,74.1626025 81.3867209,82.34198 C81.3867209,90.5213575 88.1784427,97.15146 96.5572056,97.15146 C104.935969,97.15146 111.72769,90.5213575 111.72769,82.34198 C111.72769,74.1626025 104.935969,67.5325 96.5572056,67.5325 L96.5572056,67.5325 Z M96.5572056,90.8537233 C91.7418247,90.8537233 87.837975,87.0427717 87.837975,82.34198 C87.837975,77.6411883 91.7418247,73.8302367 96.5572056,73.8302367 C101.372587,73.8302367 105.276436,77.6411883 105.276436,82.34198 C105.276436,87.0427717 101.372587,90.8537233 96.5572056,90.8537233 L96.5572056,90.8537233 Z" id="Shape"></path>
          <path d="M21.9527115,67.5325 C13.5739486,67.5325 6.78222674,74.1626025 6.78222674,82.34198 C6.78222674,90.5213575 13.5739486,97.15146 21.9527115,97.15146 C30.3314744,97.15146 37.1231963,90.5213575 37.1231963,82.34198 C37.1231963,74.1626025 30.3314744,67.5325 21.9527115,67.5325 L21.9527115,67.5325 Z M21.9527115,90.8537233 C17.1373305,90.8537233 13.2334808,87.0427717 13.2334808,82.34198 C13.2334808,77.6411883 17.1373305,73.8302367 21.9527115,73.8302367 C26.7680925,73.8302367 30.6719422,77.6411883 30.6719422,82.34198 C30.6719422,87.0427717 26.7680925,90.8537233 21.9527115,90.8537233 L21.9527115,90.8537233 Z" id="Shape"></path>
          <path d="M118.713384,82.3366833 C118.709315,82.159245 118.702532,81.9818067 118.693037,81.8030442 C118.683542,81.6229575 118.672691,81.4455192 118.659126,81.2680808 L118.659126,81.2627842 C117.913081,71.0349208 109.964311,62.74961 99.7340007,61.2135767 C99.6675348,61.2109283 99.5983561,61.2096042 99.5318903,61.2043075 C98.7804196,61.1725275 98.038444,61.1036708 97.3086764,60.9977375 C97.2489928,60.9911167 97.1893092,60.9818475 97.1296256,60.9725783 C86.3770833,59.357095 78.1421036,50.2865533 78.1421036,39.3370192 C78.1421036,36.6463125 78.639919,34.0694842 79.547381,31.6899567 C79.9095519,30.9921208 80.2310294,30.27045 80.5131701,29.5328892 C81.420632,27.1533617 81.9157346,24.5805058 81.9157346,21.8924475 C81.9157346,12.4047933 75.7344131,4.32870083 67.0897869,1.28973833 C66.9405779,1.2354475 66.7900125,1.183805 66.6408035,1.136135 C64.39453,0.398574167 61.9909088,0 59.4909801,0 C47.1039212,0 37.0662256,9.8001575 37.0662256,21.8911233 C37.0662256,24.2123875 37.4365352,26.4502292 38.1215401,28.5490333 C38.5962959,29.9976717 39.2189043,31.3814258 39.9744444,32.6791092 C40.0409102,32.8817067 40.1033067,33.0856283 40.1629903,33.2908742 C40.7299845,35.21224 41.0311153,37.2408633 41.0311153,39.3370192 C41.0311153,50.2574217 32.8381854,59.3120733 22.1236236,60.9606608 C22.0842867,60.9672817 22.0449498,60.9712542 22.0056129,60.9765508 C21.0493189,61.120885 20.0699654,61.2043075 19.0770474,61.2188733 C19.0214331,61.2215217 18.9644624,61.2228458 18.9088482,61.2228458 C8.71244847,62.7959558 0.79894631,71.068025 0.0610400407,81.2747017 C0.05832715,81.2905917 0.05832715,81.3038333 0.0569707046,81.3197233 C0.0461191418,81.4812717 0.0339111337,81.6441442 0.027128907,81.8083408 C0.0176337895,81.9831308 0.0108515628,82.1618933 0.00678222674,82.3393317 C0.0027128907,82.5286875 0,82.7193675 0,82.9087233 C0,83.0768925 0.0027128907,83.2463858 0.00678222674,83.414555 C0.0108515628,83.6012625 0.0176337895,83.7853217 0.027128907,83.970705 C0.62396486,95.5412733 10.4256389,104.744232 22.4247545,104.744232 C29.8987684,104.744232 36.5182217,101.174278 40.591627,95.6869317 C40.591627,95.6869317 40.5943399,95.6869317 40.5943399,95.6842833 C40.8154405,95.3492692 41.0433233,95.0208758 41.2861271,94.6991033 C41.4963761,94.4157317 41.7120509,94.1350083 41.9358644,93.86223 C46.0418244,88.8211275 52.3777807,85.591485 59.4882672,85.591485 C66.1891072,85.591485 72.2049423,88.45963 76.3054766,93.0094667 C80.0479093,100.038143 87.5775374,104.840896 96.2520054,104.840896 C108.29724,104.840896 118.128756,95.5902675 118.693037,83.970705 C118.702532,83.7866458 118.709315,83.6012625 118.713384,83.414555 C118.717453,83.2463858 118.720166,83.0768925 118.720166,82.9087233 C118.720166,82.7167192 118.717453,82.5286875 118.713384,82.3366833 L118.713384,82.3366833 Z M22.4668043,99.0635567 C13.3257191,99.0635567 5.91545816,91.8296342 5.91545816,82.906075 C5.91545816,73.9825158 13.3257191,66.7485933 22.4668043,66.7485933 C31.6078895,66.7485933 39.0181504,73.9825158 39.0181504,82.906075 C39.0181504,91.8309583 31.6078895,99.0635567 22.4668043,99.0635567 L22.4668043,99.0635567 Z M59.4869107,76.7751833 C51.7673803,76.7751833 45.5087414,70.6654783 45.5087414,63.1296458 C45.5087414,55.5938133 51.7673803,49.4841083 59.4869107,49.4841083 C67.2064412,49.4841083 73.46508,55.5938133 73.46508,63.1296458 C73.46508,70.6654783 67.2064412,76.7751833 59.4869107,76.7751833 L59.4869107,76.7751833 Z M59.4869107,38.0499292 C50.3458255,38.0499292 42.9355646,30.8160067 42.9355646,21.8924475 C42.9355646,12.9688883 50.3458255,5.73496583 59.4869107,5.73496583 C68.6279959,5.73496583 76.0382569,12.9688883 76.0382569,21.8924475 C76.0382569,30.8160067 68.6279959,38.0499292 59.4869107,38.0499292 L59.4869107,38.0499292 Z M96.2520054,99.0635567 C87.1109202,99.0635567 79.7006593,91.8296342 79.7006593,82.906075 C79.7006593,73.9825158 87.1109202,66.7485933 96.2520054,66.7485933 C105.393091,66.7485933 112.803352,73.9825158 112.803352,82.906075 C112.803352,91.8309583 105.393091,99.0635567 96.2520054,99.0635567 L96.2520054,99.0635567 Z" id="Shape"></path>
          <ellipse id="Oval" cx="59.4950494" cy="63.3759408" rx="12.0194622" ry="11.7334408"></ellipse>
        </g>
      </g>
    </g>
    <rect id="Rectangle-4" stroke="none" fill="#AAAAAA" fillRule="evenodd" x="432" y="96" width="43" height="73"></rect>
    <rect id="Rectangle-4-Copy-2" stroke="none" fill="#AAAAAA" fillRule="evenodd" transform="translate(563.500000, 74.500000) rotate(90.000000) translate(-563.500000, -74.500000) " x="542" y="-47" width="43" height="243" rx="21.5"></rect>
    <rect id="Rectangle-4-Copy" stroke="none" fill="#AAAAAA" fillRule="evenodd" x="658" y="96" width="43" height="73"></rect>
    <rect id="Rectangle-3-Copy" stroke="none" fill="#999999" fillRule="evenodd" x="652" y="143" width="54" height="25.2700005" rx="2"></rect>
    <rect id="Rectangle-3-Copy-2" stroke="none" fill="#999999" fillRule="evenodd" x="426" y="150" width="54" height="25.2700005" rx="2"></rect>
    <path d="M479.916667,101 L479.916667,46.0033251 L479.916667,46.0033251 C479.712108,46.0011103 479.507283,46 479.302198,46 C448.759637,46 424,70.6243388 424,101" id="Combined-Shape" stroke="none" fill="#999999" fillRule="evenodd" opacity="0.98999995"></path>
    <path d="M708.916667,101 L708.916667,46.0033251 L708.916667,46.0033251 C708.712108,46.0011103 708.507283,46 708.302198,46 C677.759637,46 653,70.6243388 653,101" id="Combined-Shape-Copy" stroke="none" fill="#999999" fillRule="evenodd" opacity="0.98999995" transform="translate(680.958333, 73.500000) scale(-1, 1) translate(-680.958333, -73.500000) "></path>
    <path ref={elem => this.valve = elem} d="M604,37 C584.167665,37 568,53.1819377 568,73.0317814 C568,92.881625 584.167665,109.063563 604,109.063563 C623.832335,109.063563 640,92.881625 640,73.0317814 C640,53.3976969 623.832335,37 604,37 L604,37 Z M632.023952,73.2475406 C632.023952,76.9154464 631.377246,80.3675932 630.083832,83.8197399 L611.976048,73.2475406 L611.976048,73.2475406 C611.976048,70.4426713 610.251497,67.8535613 607.88024,66.3432471 L607.88024,45.6303668 C621.461078,47.3564402 632.023952,59.0074353 632.023952,73.2475406 L632.023952,73.2475406 Z M600.11976,45.1988485 L600.11976,65.9117288 C597.748503,67.422043 596.023952,70.011153 596.023952,72.8160222 L596.023952,72.8160222 L577.916168,83.3882215 C576.622754,80.3675932 575.976048,76.6996873 575.976048,72.8160222 C575.976048,59.0074353 586.538922,47.3564402 600.11976,45.1988485 L600.11976,45.1988485 Z M604,101.080473 C595.161677,101.080473 587.185629,96.7652901 582.011976,90.292515 L600.11976,79.7203157 C601.413174,80.3675932 602.706587,81.0148707 604.215569,81.0148707 C605.724551,81.0148707 607.017964,80.5833523 608.311377,79.7203157 L626.419162,90.292515 C620.814371,97.1968084 612.838323,101.080473 604,101.080473 L604,101.080473 Z" id="valve" stroke="none" fill="#777777" fillRule="evenodd"></path>
    <g id="screw-copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(23.000000, 161.500000) rotate(75.000000) translate(-23.000000, -161.500000) translate(19.000000, 158.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(271.000000, 161.500000) rotate(15.000000) translate(-271.000000, -161.500000) translate(267.000000, 158.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(23.000000, 385.500000) rotate(-10.000000) translate(-23.000000, -385.500000) translate(19.000000, 382.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-4" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(270.000000, 385.500000) rotate(120.000000) translate(-270.000000, -385.500000) translate(266.000000, 382.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-8" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(297.000000, 182.500000) rotate(-80.000000) translate(-297.000000, -182.500000) translate(293.000000, 179.000000)">
      <path d="M-2.26485497e-14,6.94452854 L-2.26485497e-14,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,-1.13686838e-13 -2.26485497e-14,-1.13686838e-13" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-7" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(544.000000, 182.500000) rotate(47.000000) translate(-544.000000, -182.500000) translate(540.000000, 179.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-6" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(296.000000, 386.500000) rotate(15.000000) translate(-296.000000, -386.500000) translate(292.000000, 383.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-5" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(542.000000, 385.500000) rotate(-111.000000) translate(-542.000000, -385.500000) translate(538.000000, 382.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-11" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(568.000000, 173.500000) rotate(69.000000) translate(-568.000000, -173.500000) translate(564.000000, 170.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-10" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(797.000000, 174.500000) rotate(-66.000000) translate(-797.000000, -174.500000) translate(793.000000, 171.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw-copy-9" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(797.000000, 385.500000) rotate(-5.000000) translate(-797.000000, -385.500000) translate(793.000000, 382.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
    <g id="screw" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(569.000000, 385.500000) rotate(122.000000) translate(-569.000000, -385.500000) translate(565.000000, 382.000000)">
      <path d="M0,6.94452854 L0,6.94452854 C2.00269884,6.94452854 3.62620702,5.38994288 3.62620702,3.47226427 C3.62620702,1.55458567 2.00269884,0 0,0" id="screw_left" fill="#666666" transform="translate(1.813104, 3.472264) scale(-1, 1) translate(-1.813104, -3.472264) "></path>
      <path d="M4.27586207,6.94452854 L4.27586207,6.94452854 C6.27856091,6.94452854 7.90206909,5.38994288 7.90206909,3.47226427 C7.90206909,1.55458567 6.27856091,0 4.27586207,0" id="screw_right" fill="#666666"></path>
    </g>
</svg>
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
