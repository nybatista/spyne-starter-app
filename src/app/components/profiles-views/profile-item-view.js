import {ViewStream} from 'spyne';
import template from './templates/profile-item.tmpl.html';

export class ProfileItemView extends ViewStream {

  constructor(props = {}) {
    props.id='profile-item-view';
    props.class=`profile-item ${props.data.profileId}`;
    props.animInClass = 'reveal';
    props.template=template;
    super(props);
  }

  addActionListeners() {
    return [
        ['CHANNEL_PROFILES_MENU_EVENT', 'disposeViewStream']
    ];
  }


  onRendered() {
    this.addChannel('CHANNEL_PROFILES');
   this.props.el$.addAnimClass('reveal');
  }

}