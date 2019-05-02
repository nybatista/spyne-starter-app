// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';

export class ProfileItemView extends ViewStream {

  constructor(props = {}) {
    props.id='profile-item-view';
    props.class=`profile-item ${props.data.profileId}`;
    props.animInClass = 'reveal';
    props.template=require('./templates/profile-item.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_APP_DATA_PROFILE_EVENT', 'disposeViewStream']
    ];
  }

  onRouteEvent(){
    console.log('item route event ');
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {


    this.addChannel('CHANNEL_APP_DATA');


   this.props.el$.addAnimClass('reveal');
  }

}