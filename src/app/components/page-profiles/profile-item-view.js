// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';

export class ProfileItemView extends ViewStream {

  constructor(props = {}) {
    props.id='profile-item-view';
    props.class=`profile-item ${props.data.profileId}`;
    props.template=require('./templates/profile-item.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {

  }

}