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
    ];
  }




  checkToAddMenu(e, showMenu=true){
   /* if (this.props.el$('#profiles-menu').exists===false){
      let {payload} = e;
      this.appendView(new ProfilesMenuView({data:payload}), '.profiles-menu-holder' )
      this.props.profileMenu$ = this.props.el$('#profiles-menu');
      this.showMenu(showMenu);
    }*/
  }

  showMenu(bool=true){
   /* if ( this.props.profileMenu$!==undefined) {
      let inlineTxt = bool === true ? '' : 'display:none';
      this.props.profileMenu$.toggleClass('hide', !bool)
      this.props.profileMenu$.inline = inlineTxt;
    }*/
  }

  onProfileDataEvent(e){
      this.checkToAddMenu(e);
      this.showMenu();
  }

  onProfileItemEvent(e){
    let {menuData, profileItemData} = e.props();
    this.showMenu(false);
    this.checkToAddMenu({payload:menuData}, false);
    this.appendView(new ProfileItemView({data:profileItemData}), '.profile-item-holder');
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
    return [
      ['#profile-back-btn', 'click']
    ];
  }

  afterRender() {
    this.appendView(new ProfilesMenuView(), '.profiles-menu-holder');
    this.addChannel("CHANNEL_APP_DATA");
  }

}