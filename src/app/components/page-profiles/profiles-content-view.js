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
        ['CHANNEL_STARTER_ROUTE_PROFILE_EVENT', 'onProfileEvent'],
        ['CHANNEL_STARTER_ROUTE_PROFILE_MENU_EVENT', 'onMenuReturnEvent'],
        ["CHANNEL_UI_ANIMATIONEND_EVENT", 'onTransitionEnd'],
        ["CHANNEL_ROUTE_DEEPLINK_EVENT", 'onDeepLink']
    ];
  }

  onDeepLink(e){
    let {routeData} = e.props();
    let {profileId} = routeData;
    if (profileId!==undefined && profileId!=='menu'){
      this.props.el$.inline = 'display:none;';
      this.props.el$.addClass('hide');
    }

    console.log("onDEEP LINK ",{profileId, e});
  }

  onMenuReturnEvent(){

    this.props.el$.inline = '';
    this.props.el$.removeClass('hide');

  }

  onTransitionEnd(e){
    console.log('transition end event ',e);
    this.props.el$.inline = 'display:none';
  }


  onProfileEvent(e){

    this.props.el$.addClass('hide');
  }


  broadcastEvents() {
    // return nexted array(s)
    return [
        ['li', 'click'],
        ['ul', 'animationend']
    ];
  }

  afterRender() {
    console.log('props data ',this.props.data);
    this.addChannel("CHANNEL_STARTER_ROUTE");
    this.addChannel("CHANNEL_UI");
    this.addChannel("CHANNEL_ROUTE");
  }

}