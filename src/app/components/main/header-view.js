// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';

export class HeaderView extends ViewStream {

  constructor(props = {}) {
      props.tagName='section';
      props.id='header-view';
      props.template = require("./templates/header.tmpl.html");
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ["CHANNEL_ROUTE_.*_EVENT", 'onRouteChange']
    ];
  }

  onRouteChange(e){

    let {routeData} = e.props();
    let {pageId} = routeData;

    if (pageId!==undefined){
      let sel = `#${pageId}`;
      this.props.el$('a').setActiveItem('selected', sel);

    }

    console.log('route change in header ',{pageId},e);
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['a', 'click']
    ];
  }

  afterRender() {
      this.addChannel("CHANNEL_ROUTE");
  }

}