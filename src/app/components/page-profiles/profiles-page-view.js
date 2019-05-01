import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {ProfilesContentView} from './profiles-content-view';
import {ProfileTraits} from '../../traits/profile-trait';
import {ProfileItemView} from './profile-item-view';

export class ProfilesPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-profiles-page';
    props.class='page';
    props.template = require('./templates/profiles.tmpl.html');
    super(props);
    new PageTraits(this);
    new ProfileTraits(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_STARTER_ROUTE_PAGE_EVENT', 'onStartDispose'],
      ['CHANNEL_STARTER_ROUTE_PROFILE_EVENT', 'onProfileEvent'],
      ['CHANNEL_PROFILES_DATA_EVENT', 'onProfilesData']
    ];
  }

  onStartDispose(e){
    let {pageId} = e.props();

    console.log('page id is ',pageId);

    if (pageId!=="profiles"){
      this.disposeViewStream();
    }
  }

  onProfileEvent(e){
    console.log("profile event is ",e);
    let {profileId} = e.props();
    let data = this.profileTraits$GetProfileItemData(profileId, this.props.data);

    this.appendView(new ProfileItemView({data}), '.page-content');;
    console.log('profileItemData ',data);

  }

  onProfilesData(e){
    this.props.data = e.payload;
    this.appendView(new ProfilesContentView({data:this.props.data}), '.page-content');
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {
    this.pageTrait$InitPage();

    this.addChannel("CHANNEL_PROFILES");



  }

}