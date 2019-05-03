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
        ['CHANNEL_APP_DATA_PROFILE_EVENT', 'onShowMenuEvent'],
        ['CHANNEL_APP_DATA_PROFILE_ITEM_EVENT', 'onProfileItemEvent']
    ];
  }

  onShowMenuEvent(e){
    this.showBackBtn(false);
  }

  onProfileItemEvent(e){
    let {profileItemData} = e.props();
    this.showBackBtn();
    this.appendView(new ProfileItemView({data:profileItemData}), '.profile-item-holder');
  }

  showBackBtn(bool=true){
    this.props.el$('#profile-back-btn').toggle('reveal', bool);
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