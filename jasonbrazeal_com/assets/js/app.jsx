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
                  <WritingContainer active={this.state.activeSubPage === "writing"} />
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
                  <CodeSnippetContainer active={this.state.activeSubPage === "snippets"} />
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

  componentDidMount() {
    var bubbleChart = new utils.BubbleChart();
    bubbleChart.setup();
    bubbleChart.registerClickEvent(bubbleChart.svg.selectAll(".node"));
    bubbleChart.moveToCentral(d3.select(".node"));
  }

  render() {
    console.log('SkillsGraphic rendering.')
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

function escHandler(e) {
  if (event.key === "Escape") {
    try {
      var modalContainer = document.querySelector("." + animations.popupContainer);
      modalContainer.classList.add(animations.out);
      document.querySelector("body").classList.remove(animations.popupActive);
    }
    catch (error) {
      console.log(error);
    }
  }
}

export class SnippetTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    document.addEventListener("keyup", escHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", escHandler);
  }

  // TODO: refactor this into the individual tile components
  // they should hold the state (mouse entered or left) and update
  // the class accordingly
  mouseEnter(e) {
    if (e.target.classList.contains(graphics.hexagon)) {
      e.target.classList.add(graphics.hexagonHover);
    }
  }
  mouseLeave(e) {
    if (e.target.classList.contains(graphics.hexagon)) {
      e.target.classList.remove(graphics.hexagonHover);
    }
  }

  handleClick(text) {
    console.log(text);
    console.log(animations.popupContainer)
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
    modalClose.addEventListener("click", function() {
      modalContainer.classList.add(animations.out);
      document.querySelector("body").classList.remove(animations.popupActive);
    });
    var modalBackground = document.querySelector("." + animations.popupBackground);
    modalBackground.addEventListener("click", function(e) {
      if (e.target.classList.contains(animations.popupBackground)) {
        modalContainer.classList.add(animations.out);
        document.querySelector("body").classList.remove(animations.popupActive);
      }
    });
  }

  render() {
    return (
      // TODO: refactor into individual tile components
      <div className={graphics.honeycomb}>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("grep")}>
            <div className={graphics.hexagontent}>grep</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("sed")}>
            <div className={graphics.hexagontent}>sed</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("awk")}>
            <div className={graphics.hexagontent}>awk</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("wc")}>
            <div className={graphics.hexagontent}>wc</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("sort")}>
            <div className={graphics.hexagontent}>sort</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("ps")}>
            <div className={graphics.hexagontent}>ps</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("bc")}>
            <div className={graphics.hexagontent}>bc</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("mqtt publisher")}>
            <div className={graphics.hexagontent}>mqtt publisher</div>
          </div>
        </div>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("mqtt subscriber")}>
            <div className={graphics.hexagontent}>mqtt subscriber</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("mysql")}>
            <div className={graphics.hexagontent}>mysql</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("requests")}>
            <div className={graphics.hexagontent}>requests</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("sql")}>
            <div className={graphics.hexagontent}>sql</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("flask")}>
            <div className={graphics.hexagontent}>flask</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("asyncio")}>
            <div className={graphics.hexagontent}>asyncio</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("bash")}>
            <div className={graphics.hexagontent}>bash</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("xargs")}>
            <div className={graphics.hexagontent}>xargs</div>
          </div>
        </div>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("nc")}>
            <div className={graphics.hexagontent}>nc</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("socat")}>
            <div className={graphics.hexagontent}>socat</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("top")}>
            <div className={graphics.hexagontent}>top</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("vi")}>
            <div className={graphics.hexagontent}>vi</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("file")}>
            <div className={graphics.hexagontent}>file</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("rm")}>
            <div className={graphics.hexagontent}>rm</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("docker")}>
            <div className={graphics.hexagontent}>docker</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("tr")}>
            <div className={graphics.hexagontent}>tr</div>
          </div>
        </div>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("ssh")}>
            <div className={graphics.hexagontent}>ssh</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("zip")}>
            <div className={graphics.hexagontent}>zip</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("tar")}>
            <div className={graphics.hexagontent}>tar</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("systemctl")}>
            <div className={graphics.hexagontent}>systemctl</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("cut")}>
            <div className={graphics.hexagontent}>cut</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("unzip")}>
            <div className={graphics.hexagontent}>unzip</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("mount")}>
            <div className={graphics.hexagontent}>mount</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={(e) => this.mouseEnter(e)} onMouseLeave={(e) => this.mouseLeave(e)} onClick={(e) => this.handleClick("pyenv")}>
            <div className={graphics.hexagontent}>pyenv</div>
          </div>
        </div>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("nvm")}>
            <div className={graphics.hexagontent}>nvm</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("rvm")}>
            <div className={graphics.hexagontent}>rvm</div>
          </div>
          <div className={graphics.hexanone}></div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("adduser")}>
            <div className={graphics.hexagontent}>adduser</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("useradd")}>
            <div className={graphics.hexagontent}>useradd</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("trap")}>
            <div className={graphics.hexagontent}>trap</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("set")}>
            <div className={graphics.hexagontent}>set</div>
          </div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("kill")}>
            <div className={graphics.hexagontent}>kill</div>
          </div>
        </div>
        <div className={graphics.ibwsFix}>
          <div className={graphics.hexanone}></div>
          <div className={graphics.hexanone}></div>
          <div className={graphics.hexagon} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={(e) => this.handleClick("env")}>
            <div className={graphics.hexagontent}>env</div>
          </div>
          <div className={graphics.hexanone}></div>
        </div>

        <div className={animations.popupContainer}>
          <div className={animations.popupBackground}>
            <div className={animations.popup}>
              <div className={animations.popupContent}>
                <span className={[icons.fa, icons["fa-times"]].join(" ")}></span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus quis eaque molestias officiis vitae, iusto explicabo numquam ducimus tempora culpa rem aut alias laudantium! Molestias vitae aliquid optio impedit.</p>
                <code>python3 -m http.server 8000</code>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fugiat tempora quaerat a est, ut voluptate quam totam vitae eveniet architecto doloribus repellendus similique magnam dicta quae, expedita voluptas debitis.</p>
                {/* <svg className={animations.popupSvg} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                  <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
                </svg> */}
              </div>
            </div>
          </div>
        </div>

      </div>




    )
  }
}

export class CodeSnippetContainer extends React.Component {

  handleMouseOver(e, direction) {
    if (direction === "up") {
      console.log(direction);
    } else if (direction === "down") {
      console.log(direction);
    }
  }

  handleMouseEnter(e, direction) {
    if (direction === "up") {
      console.log(direction);
    } else if (direction === "down") {
      console.log(direction);
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
          <SnippetTiles />
        </div>
        {/* <span className={[icons.fa, icons["fa-chevron-down"], animations.bounceDown, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "down")} onMouseEnter={(e) => this.handleMouseEnter(e, "down")}></span> */}
      </div>
    )
  }
}

export class WritingContainer extends React.Component {

  handleMouseOver(e, direction) {
    if (direction === "up") {
      console.log(direction)
    } else if (direction === "down") {
      console.log(direction)
    }
  }

  handleMouseEnter(e, direction) {
    if (direction === "up") {
      console.log(direction)
    } else if (direction === "down") {
      console.log(direction)
    }
  }

  render() {
    return(
      <div className={this.props.active ? `${graphics.writingContainer} ${css.slidIn}` : `${graphics.writingContainer} ${css.slidOut}`}>
        {/* <span className={[icons.fa, icons["fa-chevron-up"], animations.bounceUp, graphics.scrollNav].join(" ")} onMouseOver={(e) => this.handleMouseOver(e, "up")} onMouseEnter={(e) => this.handleMouseEnter(e, "up")}></span> */}
        <div className={graphics.writingContainerInner}>
          <Writing title="Markdown Here for Code Styling" writingPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </Writing>
          <Writing title="Python Lists" writingPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </Writing>
          <Writing title="How to Build a Simple IoT System with Python" writingPreview="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </Writing>
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
      writingOpen: false
    };
  }

  handleClick(state)  {
    if (state === "open") {
      this.setState({
        writingOpen: true
      });
    } else {
      this.setState({
        writingOpen: false
      });
    }
  }

  render() {
    return(
       <article className={graphics.writing}>
       <h1>{this.props.title}</h1>
       <div className={graphics.writingText}>
       <p>{this.props.writingPreview}</p>
       </div>
       <label className={[graphics.btn, graphics.fullTextBtn].join(" ")} htmlFor="modalTrigger" onClick={(e) => this.handleClick("open")}>full text</label>

        {/* Start of Modal */}
        <div className={animations.modal}>
          <input id="modalTrigger" className={animations.modalTriggerInput} type="checkbox" checked={this.state.writingOpen} />
          <div className={animations.modalOverlay}>
            <div className={animations.modalWrap}>
              <label htmlFor="modalTrigger" onClick={(e) => this.handleClick("close")}>&#10006;</label>
              <h2>{this.props.title}</h2>

              {this.props.children}

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
        <div className={[graphics.educationLogo, graphics.ccsfLogo].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.accLogo].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.utLogoEd].join(" ")}></div>
        <div className={[graphics.educationLogo, graphics.ugaLogo].join(" ")}></div>
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
    };
  }

  handleNav(direction) {
    console.log(`handlingNav(${direction})`)
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
    console.log(`set currentPage to ${this.state.currentPage}`)
  }

  render() {
    return(
      <div>
      <section className={[graphics.experienceSection, graphics.primer, this.state.currentPage === 0 ? graphics.activeExperienceSection : ""].join(" ")}>
        <a href="https://primer.ai/"><div className={[graphics.experienceLogo, graphics.primerLogo].join(" ")}></div></a>
          <p className={graphics.jobTitle}>Senior Backend Engineer</p>
        <p>July 2018-present</p>
        <p>San Francisco, CA</p>
        <ul>
          <li>develop REST APIs and other infrastructure used for web-based products (Python/Flask/React)</li>
          <li>deploy and maintain data ingestion pipelines using a variety of technologies (Python/Docker/Kubernetes/AWS)</li>
          <li>provide technical leadership and advisement through code review, tech talks, interviewing, and mentoring</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.medal, this.state.currentPage === 1 ? graphics.activeExperienceSection : ""].join(" ")}>
          <a href="https://www.medal.com/"><div className={[graphics.experienceLogo, graphics.medalLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>
          Full Stack Engineer
          <span className={`${[icons.fa, icons["fa-arrow-right"], graphics.promotion].join(" ")}`}></span>
          Principal Software Engineer
        </p>
        <p>July 2017-July 2018</p>
        <p>San Francisco, CA</p>
        <ul>
          <li>participated in the design, coding, and deployment of the Medal platform, which consolidates medical records and clinical data from different sources (Python/Django/Javascript)</li>
          <li>replaced username/password authentication for accessing the web applications with OpenIdConnect/OAuth2 authentication</li>
          <li>integrated HIPAA-compliant AWS S3 storage and SQS/SNS into Medal platform and applications</li>
          <li>promoted to Principal Software Engineer, oversaw the engineering team, collaborated to implement new features and improvements, and mentored other engineers</li>
          <li>designed new features and services based on product/business requirements and provided guidance on technical architecture, scoping, preliminary cost analysis, etc.</li>
        </ul>
      </section>
      <section className={[graphics.experienceSection, graphics.verodin, this.state.currentPage === 2 ? graphics.activeExperienceSection : ""].join(" ")}>
            <a href="https://www.verodin.com/"><div className={[graphics.experienceLogo, graphics.verodinLogo].join(" ")}></div></a>
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
            <a href="http://www.tyco.com/"><div className={[graphics.experienceLogo, graphics.tycoLogo].join(" ")}></div></a>
        <p className={graphics.jobTitle}>Python Developer</p>
        <p>September 2014-December 2015</p>
        <p>Boca Raton, FL</p>
        <ul>
          <li>developed web and embedded applications for Tyco On, an IoT initiative to create an integrated data and smart services platform for more than a billion devices deployed around the world</li>
          <li>created REST services to support hardware development, such as MAC address provisioning, device sessions, device authentication using LDAP and TOTP</li>
          <li>designed and built network device simulators to test cloud-based systems'​ processing of AMQP, UDP, and HTTP/REST communications from devices</li>
          <li>deployed several web applications including a real-time device data/monitoring dashboard, device log tracker, and custom online reports using GitLab's REST API (Python/Twisted/ RabbitMQ/Flask/WebSockets/MariaDB/Javascript/d3.js)</li>
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
      <section className={graphics.experienceNav}>
        <span className={[icons.fa, icons["fa-chevron-left"]].join(" ")} onClick={(e) => this.handleNav("prev")}></span>
        <span className={[icons.fa, icons["fa-chevron-right"]].join(" ")} onClick={(e) => this.handleNav("next")}></span>
      </section>
      </div>
    )
  }

}

export class ResumeContainer extends React.Component {
  render() {
    return(
      <div className={this.props.active ? `${graphics.resumeContainer} ${css.slidIn}` : `${graphics.resumeContainer} ${css.slidOut}`}>
        <iframe src="http://localhost:8888/brazeal.pdf#zoom=100" height="600px" />
      </div>
    )
  }
}

export class ProjectCardContainer extends React.Component {
  render() {
    return(
      <div className={this.props.active ? `${graphics.projectCardContainer} ${css.slidIn}` : `${graphics.projectCardContainer} ${css.slidOut}`}>
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
        <ProjectCard title="border wait times" cardClass="border" githubLink="https://github.com/jsonbrazeal">
          <ul>
            <li>Amazon Alexa Skill</li>
            <li>Python, Selenium</li>
            <li>AWS, EC2, DynamoDB</li>
          </ul>
        </ProjectCard>
        <ProjectCard title="notes viewer" cardClass="notes" githubLink="https://github.com/jsonbrazeal/notes">
          <ul>
            <li>Local File Browser</li>
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
    )
  }
}


export class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick()  {
    this.setState({
      open: !this.state.open
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
            <a data-action="drawer" href="#" onClick={(e) => this.handleClick()}>
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
    utils.typewriter(document);
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

export class DesignCodeDeployGraphic extends React.Component {
  render() {
    return(
      <svg className={graphics.machine} viewBox="15 37 874 358" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
          </mask >
        <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-7">
          <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feColorMatrix values="0 0 0 0 0.380048895   0 0 0 0 0.379389087   0 0 0 0 0.379389087  0 0 0 0.5 0" type="matrix" in="shadowOffsetOuter1" result="shadowMatrixOuter1"></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs >
        <g id="electricity" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(275.000000, 106.000000)">
          <path d="M16.0429688,7.8203125 L35.1730116,25.3203125 L51.5042119,10.3913707 L73.3037778,25.3203125 C73.3037778,25.3203125 95.8323685,8.16307141 99.0429688,10.3913707" stroke="#979797"></path>
          <rect id="separator1" fill="#D8D8D8" transform="translate(31.500000, 46.500000) rotate(-31.000000) translate(-31.500000, -46.500000) " x="28" y="12" width="7" height="69" rx="3.5"></rect>
          <rect id="separator1-copy" fill="#D8D8D8" transform="translate(81.500000, 46.500000) scale(-1, 1) rotate(-31.000000) translate(-81.500000, -46.500000) " x="78" y="12" width="7" height="69" rx="3.5"></rect>
          <circle id="electricity_ball1" fill="#666666" cx="10.1440543" cy="10.1440543" r="10.1440543"></circle>
          <path d="M102.144054,20.2881085 C107.746461,20.2881085 112.288109,15.7464607 112.288109,10.1440543 C112.288109,4.54164779 107.746461,-1.13686838e-13 102.144054,-1.13686838e-13 C96.5416478,-1.13686838e-13 92,4.54164779 92,10.1440543 C92,15.7464607 96.5416478,20.2881085 102.144054,20.2881085 Z" id="electricity_ball2" fill="#666666"></path>
        </g>
        <g id="light" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(744.000000, 115.000000)">
          <path d="M45.9088792,23.3712982 C45.9691809,22.7185425 46,22.0572962 46,21.3888889 C46,9.57613174 36.3741221,0 24.5,0 C12.6258779,0 3,9.57613174 3,21.3888889 C3,22.0579311 3.03087769,22.7197987 3.09129271,23.3731583 C3.03149572,23.6484234 3,23.9342459 3,24.2274256 L3,58.9947966 C3,61.2163545 4.79387055,63 7.00672201,63 L41.993278,63 C44.2070888,63 46,61.2068093 46,58.9947966 L46,24.2274256 C46,23.933335 45.9685632,23.6469185 45.9088792,23.3712982 Z" stroke="#777777" fill="#D55050"></path>
          <rect id="Rectangle-3-Copy" fill="#777777" x="0.468725869" y="46" width="48.5312741" height="6.27476038" rx="2"></rect>
        </g>
        <g id="funnel2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(828.000000, 280.500000) rotate(90.000000) translate(-828.000000, -280.500000) translate(722.500000, 219.500000)">
          <polygon id="Triangle" fill="#777777" points="0 6.21744885 209.517572 6.21744885 104.758786 100.466454"></polygon>
          <rect id="Rectangle" fill="#999999" opacity="0.98999995" x="52.1277955" y="51.3003195" width="105.089457" height="70.3354633"></rect>
          <polygon id="Triangle-2" fill="#999999" transform="translate(157.594140, 53.541484) scale(1, -1) translate(-157.594140, -53.541484) " points="105 6.68762476 210.18828 100.395342 105 100.395342"></polygon>
          <rect id="Rectangle-Copy" fill="#AAAAAA" opacity="0.98999995" x="105.086262" y="51.3003195" width="52.9584665" height="70.3354633"></rect>
          <rect id="Rectangle-3" fill="#D8D8D8" x="0.482428115" y="1.13686838e-13" width="209.517572" height="8.27476038" rx="2"></rect>
          <rect id="Rectangle-3" fill="#777777" x="49.6453674" y="74.7795527" width="110.054313" height="8.27476038" rx="2"></rect>
        </g>
        <g id="funnel1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(40.000000, 71.000000)">
          <polygon id="Triangle" fill="#777777" points="0 6.21744885 209.517572 6.21744885 104.758786 100.466454"></polygon>
          <rect id="Rectangle" fill="#999999" opacity="0.98999995" x="52.1277955" y="51.3003195" width="105.089457" height="70.3354633"></rect>
          <polygon id="Triangle-2" fill="#999999" transform="translate(157.594140, 53.541484) scale(1, -1) translate(-157.594140, -53.541484) " points="105 6.68762476 210.18828 100.395342 105 100.395342"></polygon>
          <rect id="Rectangle-Copy" fill="#AAAAAA" opacity="0.98999995" x="105.086262" y="51.3003195" width="52.9584665" height="70.3354633"></rect>
          <rect id="Rectangle-3" fill="#D8D8D8" x="0.482428115" y="1.13686838e-13" width="209.517572" height="8.27476038" rx="2"></rect>
          <rect id="Rectangle-3" fill="#777777" x="49.6453674" y="74.7795527" width="110.054313" height="8.27476038" rx="2"></rect>
        </g>
        <rect id="separator1" stroke="none" fill="#D8D8D8" fill-rule="evenodd" x="275" y="152" width="15" height="243" rx="7.5"></rect>
        <rect id="separator2" stroke="none" fill="#D8D8D8" fill-rule="evenodd" x="548" y="168" width="15" height="227" rx="7.5"></rect>
        <rect id="section3" stroke="none" fill="#AAAAAA" fill-rule="evenodd" x="560" y="166" width="246" height="227" rx="2"></rect>
        <g id="gears" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(683.028315, 231.553442) rotate(15.000000) translate(-683.028315, -231.553442) translate(621.028315, 173.053442)">
          <path d="M44.5085566,90.001719 C44.5870983,89.3472055 44.6394593,88.6665115 44.6394593,87.9596369 C44.6394593,87.2527624 44.5870983,86.5720684 44.4823761,85.9175549 L48.9068872,82.4617237 C49.2995953,82.1475573 49.4043174,81.5715854 49.1686926,81.1265163 L44.9798063,73.874507 C44.718001,73.4032573 44.1682096,73.246174 43.6969599,73.4032573 L38.4870327,75.4977004 C37.38745,74.6599231 36.2355063,73.9792291 34.9526599,73.4556183 L34.1672438,67.9053441 C34.0887021,67.3817333 33.643633,67.0152058 33.1200222,67.0152058 L24.7422497,67.0152058 C24.218639,67.0152058 23.7997503,67.3817333 23.7212087,67.9053441 L22.9357926,73.4556183 C21.6529461,73.9792291 20.4748219,74.6861037 19.4014198,75.4977004 L14.1914925,73.4032573 C13.7202428,73.2199935 13.1704515,73.4032573 12.9086461,73.874507 L8.7197599,81.1265163 C8.45795451,81.597766 8.56267667,82.1475573 8.98156529,82.4617237 L13.4060764,85.9175549 C13.3013542,86.5720684 13.2228126,87.2789429 13.2228126,87.9596369 C13.2228126,88.6403309 13.2751737,89.3472055 13.3798958,90.001719 L8.95538475,93.4575501 C8.56267667,93.7717166 8.45795451,94.3476884 8.69357936,94.7927576 L12.8824656,102.044767 C13.144271,102.516017 13.6940623,102.6731 14.165312,102.516017 L19.3752393,100.421573 C20.4748219,101.259351 21.6267656,101.940045 22.909612,102.463655 L23.6950282,108.01393 C23.7997503,108.537541 24.218639,108.904068 24.7422497,108.904068 L33.1200222,108.904068 C33.643633,108.904068 34.0887021,108.537541 34.1410632,108.01393 L34.9264794,102.463655 C36.2093258,101.940045 37.38745,101.23317 38.4608521,100.421573 L43.6707794,102.516017 C44.1420291,102.69928 44.6918204,102.516017 44.9536258,102.044767 L49.142512,94.7927576 C49.4043174,94.3215079 49.2995953,93.7717166 48.8807066,93.4575501 L44.5085566,90.001719 L44.5085566,90.001719 Z M28.931136,95.8137986 C24.611347,95.8137986 21.0769743,92.2794258 21.0769743,87.9596369 C21.0769743,83.639848 24.611347,80.1054752 28.931136,80.1054752 C33.2509249,80.1054752 36.7852977,83.639848 36.7852977,87.9596369 C36.7852977,92.2794258 33.2509249,95.8137986 28.931136,95.8137986 L28.931136,95.8137986 Z" id="Shape" fill="#666666" transform="translate(28.931136, 87.959637) rotate(-35.000000) translate(-28.931136, -87.959637) "></path>
          <path d="M100.299948,55.5539861 C100.44097,54.3788049 100.534984,53.1566164 100.534984,51.8874206 C100.534984,50.6182248 100.44097,49.3960363 100.252941,48.2208551 L108.197166,42.015898 C108.902275,41.451811 109.090304,40.4176515 108.667239,39.6185283 L101.146079,26.59752 C100.676006,25.7513895 99.6888538,25.469346 98.8427233,25.7513895 L89.4882805,29.5119695 C87.513976,28.0077375 85.445657,26.785549 83.1423017,25.845404 L81.7320842,15.8798669 C81.5910625,14.9397219 80.7919392,14.2816204 79.8517942,14.2816204 L64.8094741,14.2816204 C63.8693291,14.2816204 63.1172131,14.9397219 62.9761914,15.8798669 L61.5659739,25.845404 C59.2626186,26.785549 57.1472923,28.0547447 55.2199951,29.5119695 L45.8655523,25.7513895 C45.0194218,25.4223387 44.0322695,25.7513895 43.562197,26.59752 L36.041037,39.6185283 C35.5709645,40.4646588 35.7589935,41.451811 36.5111095,42.015898 L44.4553348,48.2208551 C44.2673058,49.3960363 44.126284,50.6652321 44.126284,51.8874206 C44.126284,53.1096091 44.2202985,54.3788049 44.4083275,55.5539861 L36.4641022,61.7589432 C35.7589935,62.3230302 35.5709645,63.3571897 35.9940297,64.1563129 L43.5151898,77.1773212 C43.9852623,78.0234517 44.9724145,78.3054952 45.818545,78.0234517 L55.1729878,74.2628717 C57.1472923,75.7671037 59.2156114,76.9892922 61.5189666,77.9294372 L62.9291841,87.8949743 C63.1172131,88.8351193 63.8693291,89.4932208 64.8094741,89.4932208 L79.8517942,89.4932208 C80.7919392,89.4932208 81.5910625,88.8351193 81.685077,87.8949743 L83.0952945,77.9294372 C85.3986498,76.9892922 87.513976,75.7200965 89.4412733,74.2628717 L98.7957161,78.0234517 C99.6418466,78.3525025 100.628999,78.0234517 101.099071,77.1773212 L108.620231,64.1563129 C109.090304,63.3101824 108.902275,62.3230302 108.150159,61.7589432 L100.299948,55.5539861 L100.299948,55.5539861 Z M72.3306342,65.9895957 C64.5744379,65.9895957 58.2284591,59.6436169 58.2284591,51.8874206 C58.2284591,44.1312243 64.5744379,37.7852455 72.3306342,37.7852455 C80.0868305,37.7852455 86.4328093,44.1312243 86.4328093,51.8874206 C86.4328093,59.6436169 80.0868305,65.9895957 72.3306342,65.9895957 L72.3306342,65.9895957 Z" id="Shape" fill="#666666" transform="translate(72.330634, 51.887421) rotate(-35.000000) translate(-72.330634, -51.887421) "></path>
        </g>
        <rect id="section2" stroke="none" fill="#AAAAAA" fill-rule="evenodd" x="288" y="175" width="264" height="218" rx="2"></rect>
        <rect id="section1" stroke="none" fill="#AAAAAA" fill-rule="evenodd" x="15" y="154" width="264" height="239" rx="2"></rect>
        <use id="code_window" stroke="#777777" mask="url(#mask-2)" stroke-width="2" fill="#FFFFFF" fill-rule="evenodd" xlinkHref="#path-1"></use>
        <g id="tank2" stroke="none" fill="none">
          <use fill="#6A4F8E" fill-rule="evenodd" xlinkHref="#path-3"></use>
        <use stroke="#777777" mask="url(#mask-4)" stroke-width="8" xlinkHref="#path-3"></use>
      </g >
        <rect id="tank2_highlight" stroke="none" fill="#D8D8D8" fill-rule="evenodd" opacity="0.100000001" x="702" y="295" width="15" height="80"></rect>
        <g id="tank1" stroke="none" fill="none">
          <use fill="#6A4F8E" fill-rule="evenodd" xlinkHref="#path-5"></use>
        <use stroke="#777777" mask="url(#mask-6)" stroke-width="8" xlinkHref="#path-5"></use>
      </g >
        <rect id="tank1_highlight" stroke="none" fill="#D8D8D8" fill-rule="evenodd" opacity="0.1" x="609" y="295" width="15" height="80"></rect>
        <rect id="gauge3" stroke="#999999" stroke-width="1" fill="#666666" fill-rule="evenodd" x="46" y="357" width="205" height="17.5" rx="2"></rect>
        <rect id="gauge2" stroke="#999999" stroke-width="1" fill="#666666" fill-rule="evenodd" x="46" y="330" width="205" height="17.5" rx="2"></rect>
        <rect id="gauge1" stroke="#999999" stroke-width="1" fill="#666666" fill-rule="evenodd" x="46" y="304" width="205" height="17.5" rx="2"></rect>
        <g id="gauge_lights" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(55.000000, 306.000000)">
          <circle id="light" fill="#F2E64E" cx="7" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="85" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="27" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="66" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="46" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="105" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="124" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="144" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="163" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="183" cy="7" r="7"></circle>
        </g>
        <g id="gauge_lights-copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(55.000000, 332.000000)">
          <circle id="light" fill="#F2E64E" cx="7" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="27" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="85" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="66" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="46" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="105" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="124" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="144" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="163" cy="7" r="7"></circle>
          <circle id="light" fill="#F2E64E" cx="183" cy="7" r="7"></circle>
        </g>
        <g id="gauge_lights-copy-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(54.000000, 359.000000)">
          <circle id="light" fill="#F3E74E" cx="7" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="85" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="27" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="66" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="46" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="105" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="124" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="144" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="163" cy="7" r="7"></circle>
          <circle id="light" fill="#F3E74E" cx="183" cy="7" r="7"></circle>
        </g>
        <g id="dial1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(316.000000, 319.000000)">
          <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
          <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
          <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
          <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
          <path d="M14.5,14.5 L29.6137817,27.5986108" id="needle" stroke="#666666" stroke-width="4" stroke-linecap="square"></path>
        </g>
        <g id="dial2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(394.000000, 319.000000)">
          <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
          <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
          <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
          <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
          <path d="M34.5,8.5 L29.6137817,27.5986108" id="needle" stroke="#666666" stroke-width="4" stroke-linecap="square"></path>
        </g>
        <g id="dial3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(474.000000, 319.000000)">
          <circle id="dial-shadow" fill="#777777" cx="29" cy="29" r="29"></circle>
          <circle id="dial" fill="#FFFFFF" cx="30" cy="28" r="27"></circle>
          <path d="M57,55 C57,40.0883118 44.9116882,28 30,28 C15.0883118,28 3,40.0883118 3,55 L57,55 Z" id="dial_bottom" fill="#D55050" transform="translate(30.000000, 41.500000) scale(1, -1) translate(-30.000000, -41.500000) "></path>
          <path d="M30,34 C32.7614237,34 35,31.7614237 35,29 C35,26.2385763 32.7614237,24 30,24 C27.2385763,24 25,26.2385763 25,29 C25,31.7614237 27.2385763,34 30,34 Z" id="dial_center" fill="#666666"></path>
          <path d="M49.5,22.5 L31.4919759,27.7582008" id="needle" stroke="#666666" stroke-width="4" stroke-linecap="square"></path>
        </g>
        <g id="spinner" filter="url(#filter-7)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(88.000000, 173.000000)">
          <g id="Group" fill="#346D98">
            <g>
              <path d="M59.9331813,6.62083333 C51.5544183,6.62083333 44.7626965,13.2509358 44.7626965,21.4303133 C44.7626965,29.6096908 51.5544183,36.2411175 59.9331813,36.2411175 C68.3119442,36.2411175 75.103666,29.611015 75.103666,21.4316375 C75.103666,13.25226 68.3119442,6.62083333 59.9331813,6.62083333 L59.9331813,6.62083333 Z M59.9331813,29.9433808 C55.1178003,29.9433808 51.2139506,26.1324292 51.2139506,21.4316375 C51.2139506,16.7308458 55.1178003,12.9198942 59.9331813,12.9198942 C64.7485622,12.9198942 68.652412,16.7308458 68.652412,21.4316375 C68.652412,26.1324292 64.7485622,29.9433808 59.9331813,29.9433808 L59.9331813,29.9433808 Z" id="Shape"></path>
              <path d="M96.5572056,67.5325 C88.1784427,67.5325 81.3867209,74.1626025 81.3867209,82.34198 C81.3867209,90.5213575 88.1784427,97.15146 96.5572056,97.15146 C104.935969,97.15146 111.72769,90.5213575 111.72769,82.34198 C111.72769,74.1626025 104.935969,67.5325 96.5572056,67.5325 L96.5572056,67.5325 Z M96.5572056,90.8537233 C91.7418247,90.8537233 87.837975,87.0427717 87.837975,82.34198 C87.837975,77.6411883 91.7418247,73.8302367 96.5572056,73.8302367 C101.372587,73.8302367 105.276436,77.6411883 105.276436,82.34198 C105.276436,87.0427717 101.372587,90.8537233 96.5572056,90.8537233 L96.5572056,90.8537233 Z" id="Shape"></path>
              <path d="M21.9527115,67.5325 C13.5739486,67.5325 6.78222674,74.1626025 6.78222674,82.34198 C6.78222674,90.5213575 13.5739486,97.15146 21.9527115,97.15146 C30.3314744,97.15146 37.1231963,90.5213575 37.1231963,82.34198 C37.1231963,74.1626025 30.3314744,67.5325 21.9527115,67.5325 L21.9527115,67.5325 Z M21.9527115,90.8537233 C17.1373305,90.8537233 13.2334808,87.0427717 13.2334808,82.34198 C13.2334808,77.6411883 17.1373305,73.8302367 21.9527115,73.8302367 C26.7680925,73.8302367 30.6719422,77.6411883 30.6719422,82.34198 C30.6719422,87.0427717 26.7680925,90.8537233 21.9527115,90.8537233 L21.9527115,90.8537233 Z" id="Shape"></path>
              <path d="M118.713384,82.3366833 C118.709315,82.159245 118.702532,81.9818067 118.693037,81.8030442 C118.683542,81.6229575 118.672691,81.4455192 118.659126,81.2680808 L118.659126,81.2627842 C117.913081,71.0349208 109.964311,62.74961 99.7340007,61.2135767 C99.6675348,61.2109283 99.5983561,61.2096042 99.5318903,61.2043075 C98.7804196,61.1725275 98.038444,61.1036708 97.3086764,60.9977375 C97.2489928,60.9911167 97.1893092,60.9818475 97.1296256,60.9725783 C86.3770833,59.357095 78.1421036,50.2865533 78.1421036,39.3370192 C78.1421036,36.6463125 78.639919,34.0694842 79.547381,31.6899567 C79.9095519,30.9921208 80.2310294,30.27045 80.5131701,29.5328892 C81.420632,27.1533617 81.9157346,24.5805058 81.9157346,21.8924475 C81.9157346,12.4047933 75.7344131,4.32870083 67.0897869,1.28973833 C66.9405779,1.2354475 66.7900125,1.183805 66.6408035,1.136135 C64.39453,0.398574167 61.9909088,0 59.4909801,0 C47.1039212,0 37.0662256,9.8001575 37.0662256,21.8911233 C37.0662256,24.2123875 37.4365352,26.4502292 38.1215401,28.5490333 C38.5962959,29.9976717 39.2189043,31.3814258 39.9744444,32.6791092 C40.0409102,32.8817067 40.1033067,33.0856283 40.1629903,33.2908742 C40.7299845,35.21224 41.0311153,37.2408633 41.0311153,39.3370192 C41.0311153,50.2574217 32.8381854,59.3120733 22.1236236,60.9606608 C22.0842867,60.9672817 22.0449498,60.9712542 22.0056129,60.9765508 C21.0493189,61.120885 20.0699654,61.2043075 19.0770474,61.2188733 C19.0214331,61.2215217 18.9644624,61.2228458 18.9088482,61.2228458 C8.71244847,62.7959558 0.79894631,71.068025 0.0610400407,81.2747017 C0.05832715,81.2905917 0.05832715,81.3038333 0.0569707046,81.3197233 C0.0461191418,81.4812717 0.0339111337,81.6441442 0.027128907,81.8083408 C0.0176337895,81.9831308 0.0108515628,82.1618933 0.00678222674,82.3393317 C0.0027128907,82.5286875 0,82.7193675 0,82.9087233 C0,83.0768925 0.0027128907,83.2463858 0.00678222674,83.414555 C0.0108515628,83.6012625 0.0176337895,83.7853217 0.027128907,83.970705 C0.62396486,95.5412733 10.4256389,104.744232 22.4247545,104.744232 C29.8987684,104.744232 36.5182217,101.174278 40.591627,95.6869317 C40.591627,95.6869317 40.5943399,95.6869317 40.5943399,95.6842833 C40.8154405,95.3492692 41.0433233,95.0208758 41.2861271,94.6991033 C41.4963761,94.4157317 41.7120509,94.1350083 41.9358644,93.86223 C46.0418244,88.8211275 52.3777807,85.591485 59.4882672,85.591485 C66.1891072,85.591485 72.2049423,88.45963 76.3054766,93.0094667 C80.0479093,100.038143 87.5775374,104.840896 96.2520054,104.840896 C108.29724,104.840896 118.128756,95.5902675 118.693037,83.970705 C118.702532,83.7866458 118.709315,83.6012625 118.713384,83.414555 C118.717453,83.2463858 118.720166,83.0768925 118.720166,82.9087233 C118.720166,82.7167192 118.717453,82.5286875 118.713384,82.3366833 L118.713384,82.3366833 Z M22.4668043,99.0635567 C13.3257191,99.0635567 5.91545816,91.8296342 5.91545816,82.906075 C5.91545816,73.9825158 13.3257191,66.7485933 22.4668043,66.7485933 C31.6078895,66.7485933 39.0181504,73.9825158 39.0181504,82.906075 C39.0181504,91.8309583 31.6078895,99.0635567 22.4668043,99.0635567 L22.4668043,99.0635567 Z M59.4869107,76.7751833 C51.7673803,76.7751833 45.5087414,70.6654783 45.5087414,63.1296458 C45.5087414,55.5938133 51.7673803,49.4841083 59.4869107,49.4841083 C67.2064412,49.4841083 73.46508,55.5938133 73.46508,63.1296458 C73.46508,70.6654783 67.2064412,76.7751833 59.4869107,76.7751833 L59.4869107,76.7751833 Z M59.4869107,38.0499292 C50.3458255,38.0499292 42.9355646,30.8160067 42.9355646,21.8924475 C42.9355646,12.9688883 50.3458255,5.73496583 59.4869107,5.73496583 C68.6279959,5.73496583 76.0382569,12.9688883 76.0382569,21.8924475 C76.0382569,30.8160067 68.6279959,38.0499292 59.4869107,38.0499292 L59.4869107,38.0499292 Z M96.2520054,99.0635567 C87.1109202,99.0635567 79.7006593,91.8296342 79.7006593,82.906075 C79.7006593,73.9825158 87.1109202,66.7485933 96.2520054,66.7485933 C105.393091,66.7485933 112.803352,73.9825158 112.803352,82.906075 C112.803352,91.8309583 105.393091,99.0635567 96.2520054,99.0635567 L96.2520054,99.0635567 Z" id="Shape"></path>
              <ellipse id="Oval" cx="59.4950494" cy="63.3759408" rx="12.0194622" ry="11.7334408"></ellipse>
            </g>
          </g>
        </g>
        <rect id="Rectangle-4" stroke="none" fill="#AAAAAA" fill-rule="evenodd" x="432" y="96" width="43" height="73"></rect>
        <rect id="Rectangle-4-Copy-2" stroke="none" fill="#AAAAAA" fill-rule="evenodd" transform="translate(563.500000, 74.500000) rotate(90.000000) translate(-563.500000, -74.500000) " x="542" y="-47" width="43" height="243" rx="21.5"></rect>
        <rect id="Rectangle-4-Copy" stroke="none" fill="#AAAAAA" fill-rule="evenodd" x="658" y="96" width="43" height="73"></rect>
        <rect id="Rectangle-3-Copy" stroke="none" fill="#999999" fill-rule="evenodd" x="652" y="143" width="54" height="25.2700005" rx="2"></rect>
        <rect id="Rectangle-3-Copy-2" stroke="none" fill="#999999" fill-rule="evenodd" x="426" y="150" width="54" height="25.2700005" rx="2"></rect>
        <path d="M479.916667,101 L479.916667,46.0033251 L479.916667,46.0033251 C479.712108,46.0011103 479.507283,46 479.302198,46 C448.759637,46 424,70.6243388 424,101" id="Combined-Shape" stroke="none" fill="#999999" fill-rule="evenodd" opacity="0.98999995"></path>
        <path d="M708.916667,101 L708.916667,46.0033251 L708.916667,46.0033251 C708.712108,46.0011103 708.507283,46 708.302198,46 C677.759637,46 653,70.6243388 653,101" id="Combined-Shape-Copy" stroke="none" fill="#999999" fill-rule="evenodd" opacity="0.98999995" transform="translate(680.958333, 73.500000) scale(-1, 1) translate(-680.958333, -73.500000) "></path>
        <path d="M604,37 C584.167665,37 568,53.1819377 568,73.0317814 C568,92.881625 584.167665,109.063563 604,109.063563 C623.832335,109.063563 640,92.881625 640,73.0317814 C640,53.3976969 623.832335,37 604,37 L604,37 Z M632.023952,73.2475406 C632.023952,76.9154464 631.377246,80.3675932 630.083832,83.8197399 L611.976048,73.2475406 L611.976048,73.2475406 C611.976048,70.4426713 610.251497,67.8535613 607.88024,66.3432471 L607.88024,45.6303668 C621.461078,47.3564402 632.023952,59.0074353 632.023952,73.2475406 L632.023952,73.2475406 Z M600.11976,45.1988485 L600.11976,65.9117288 C597.748503,67.422043 596.023952,70.011153 596.023952,72.8160222 L596.023952,72.8160222 L577.916168,83.3882215 C576.622754,80.3675932 575.976048,76.6996873 575.976048,72.8160222 C575.976048,59.0074353 586.538922,47.3564402 600.11976,45.1988485 L600.11976,45.1988485 Z M604,101.080473 C595.161677,101.080473 587.185629,96.7652901 582.011976,90.292515 L600.11976,79.7203157 C601.413174,80.3675932 602.706587,81.0148707 604.215569,81.0148707 C605.724551,81.0148707 607.017964,80.5833523 608.311377,79.7203157 L626.419162,90.292515 C620.814371,97.1968084 612.838323,101.080473 604,101.080473 L604,101.080473 Z" id="valve" stroke="none" fill="#777777" fill-rule="evenodd"></path>
      </svg >
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
