import {ViewStream} from 'spyne';
import {ProfilesMenuItemView} from './profiles-menu-item-view';

export class ProfilesMenuView extends ViewStream {

  constructor(props = {}) {
    props.tagName='ul';
    props.id='profiles-menu';
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_USERS_DATA_EVENT', 'onMenuDataEvent'],
      ['CHANNEL_PROFILES_MENU_EVENT', 'slideIn'],
      ['CHANNEL_PROFILES_ITEM_EVENT', 'slideOut']
    ];
  }

  slideIn(e){
    this.props.el$.removeClass('hide');
  }

  slideOut(e){
    this.props.el$.addClass('hide');
  }


  hideMenu(bool = true){
    let hideStr = bool === true ? 'display:none;' : '';
    this.props.el$.inline=hideStr;
  }

  broadcastEvents() {
    return [
    ];
  }

  onMenuDataEvent(e){
    const addMenuItems = (data)=>{
      this.appendView(new ProfilesMenuItemView({data}))
    };
    e.payload.forEach(addMenuItems);
    this.hideMenu(false);
  }

  onRendered() {
    this.hideMenu();
    this.addChannel("CHANNEL_PROFILES");
    this.addChannel("CHANNEL_USERS");
  }

}