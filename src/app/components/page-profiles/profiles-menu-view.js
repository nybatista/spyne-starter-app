// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {ProfilesMenuItemView} from './profiles-menu-item-view';

export class ProfilesMenuView extends ViewStream {

  constructor(props = {}) {
    props.tagName='ul';
    props.id='profiles-menu';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_UI_ANIMATIONEND_EVENT', 'onAnimationEnd', '#profiles-menu'],
      ['CHANNEL_USERS_DATA_EVENT', 'onMenuDataEvent'],
      ['CHANNEL_APP_DATA_PROFILE_EVENT', 'slideIn'],
      ['CHANNEL_APP_DATA_PROFILE_ITEM_EVENT', 'slideOut']
    ];
  }

  slideIn(e){
    this.props.el$.removeClass('hide');
    this.props.el$.inline='';
  }

  slideOut(e){
    this.props.el$.addClass('hide');
  }

  onAnimationEnd(e){
    this.hideMenu();
  }

  hideMenu(){
   this.props.el$.inline='display:none';
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['ul', 'animationend']
    ];
  }

  onMenuDataEvent(e){
    const addMenuItems = (data)=>{
      this.appendView(new ProfilesMenuItemView({data}))
    };
    e.payload.forEach(addMenuItems);
  }

  afterRender() {
    this.hideMenu();
    this.addChannel("CHANNEL_APP_DATA");
    this.addChannel("CHANNEL_USERS");
    this.addChannel('CHANNEL_UI');
  }

}