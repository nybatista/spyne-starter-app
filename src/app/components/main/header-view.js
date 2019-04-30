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
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['a', 'click']
    ];
  }

  afterRender() {

  }

}