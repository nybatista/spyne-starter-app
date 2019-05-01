// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';

export class ProfilesContentView extends ViewStream {

  constructor(props = {}) {
    props.tagName='ul';
    props.id='profiles-menu';
    props.template=require('./templates/profiles-menu.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_STARTER_ROUTE_PROFILE_EVENT', 'onProfileEvent']
    ];
  }


  onProfileEvent(e){

    this.props.el$.addClass('hide');
  }


  broadcastEvents() {
    // return nexted array(s)
    return [
        ['li', 'click']
    ];
  }

  afterRender() {
    console.log('props data ',this.props.data);
    this.addChannel("CHANNEL_STARTER_ROUTE");
  }

}