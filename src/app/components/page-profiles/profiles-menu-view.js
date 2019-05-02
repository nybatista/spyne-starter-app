// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';

export class ProfilesMenuView extends ViewStream {

  constructor(props = {}) {
    props.tagName='ul';
    props.id='profiles-menu';
    props.template=require('./templates/profiles-menu.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [

    ];
  }



  broadcastEvents() {
    // return nexted array(s)
    return [
        ['li', 'click'],
        ['ul', 'animationend']
    ];
  }

  afterRender() {

  }

}