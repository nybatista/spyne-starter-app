// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {ProfilesMenuView} from './profiles-menu-view';
import {ProfileItemView} from './profile-item-view';

export class ProfilesContentView extends ViewStream {

  constructor(props = {}) {
    props.tagName='section';
    props.id='profiles-content';
    props.class='profiles-page page-content';
    props.template = require('./templates/profiles.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_APP_DATA_PROFILE_EVENT', 'onProfileDataEvent'],
        ['CHANNEL_APP_DATA_PROFILE_ITEM_EVENT', 'onProfileItemEvent']
/*        ['CHANNEL_STARTER_ROUTE_PROFILE_EVENT', 'onProfileEvent'],
        ['CHANNEL_STARTER_ROUTE_PROFILE_MENU_EVENT', 'onMenuReturnEvent'],
        ["CHANNEL_UI_ANIMATIONEND_EVENT", 'onTransitionEnd'],
        ["CHANNEL_ROUTE_DEEPLINK_EVENT", 'onDeepLink']*/
    ];
  }




  checkToAddMenu(e, showMenu=true){
    console.log('check to add menu ',this.props.el$('#profiles-menu').exists,e);
    if (this.props.el$('#profiles-menu').exists===false){
      let {payload} = e;

      console.log("payload is ",payload);

      this.appendView(new ProfilesMenuView({data:payload}), '.profiles-menu-holder' )
      this.props.profileMenu$ = this.props.el$('#profiles-menu');
      this.showMenu(showMenu);
    }
  }

  showMenu(bool=true){

    if ( this.props.profileMenu$!==undefined) {
      let inlineTxt = bool === true ? '' : 'display:none';
      this.props.profileMenu$.toggleClass('hide', !bool)
      this.props.profileMenu$.inline = inlineTxt;
    }
  }

  onProfileDataEvent(e){
    console.log('profile data event ',e);

      this.checkToAddMenu(e);


        this.showMenu();

     // this.props.el$('#profiles-menu').removeClass('hide');


  }

  onProfileItemEvent(e){
    let {menuData, profileItemData} = e.props();
    this.showMenu(false);
   this.checkToAddMenu({payload:menuData}, false);

   this.appendView(new ProfileItemView({data:profileItemData}), '.profile-item-holder');

    console.log('profile item event');

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
    ];
  }

  afterRender() {
    console.log('props data ',this.props.data);
    //this.addChannel("CHANNEL_STARTER_ROUTE");
    //this.addChannel("CHANNEL_UI");
    this.addChannel("CHANNEL_APP_DATA");
  }

}