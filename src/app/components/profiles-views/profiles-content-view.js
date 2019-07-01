import {ViewStream} from 'spyne';
import {ProfilesMenuView} from './profiles-menu-view';
import {ProfileItemView} from './profile-item-view';
import template from './templates/profiles.tmpl.html'

export class ProfilesContentView extends ViewStream {

  constructor(props = {}) {
    props.tagName='section';
    props.id='profiles-content';
    props.class='profiles-page page-content';
    props.template = template;
    super(props);

  }

  addActionListeners() {
    return [
        ['CHANNEL_PROFILES_MENU_EVENT', 'onShowMenuEvent'],
        ['CHANNEL_PROFILES_ITEM_EVENT', 'onProfileItemEvent']
    ];
  }

  onShowMenuEvent(e){
    this.showBackBtn(false);
  }

  onProfileItemEvent(e){
    this.showBackBtn();
    this.appendView(new ProfileItemView({data:e.payload}), '.profile-item-holder');
  }

  showBackBtn(bool=true){
    this.props.el$('#profile-back-btn').toggle('reveal', bool);
  }

  broadcastEvents() {
    return [
      ['#profile-back-btn', 'click']
    ];
  }

  onRendered() {
    this.appendView(new ProfilesMenuView(), '.profiles-menu-holder');
    this.addChannel("CHANNEL_PROFILES");
  }

}