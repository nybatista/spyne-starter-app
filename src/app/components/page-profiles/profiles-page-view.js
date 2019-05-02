import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {ProfilesContentView} from './profiles-content-view';
import {ProfileTraits} from '../../traits/profile-trait';
import {ProfileItemView} from './profile-item-view';

export class ProfilesPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-profiles';
    props.class='page';
    super(props);
    new PageTraits(this);
    new ProfileTraits(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_STARTER_ROUTE_PAGE_EVENT', 'onStartDispose'],
      /*['CHANNEL_STARTER_ROUTE_PROFILE_EVENT', 'onProfileEvent'],
      ['CHANNEL_PROFILES_DATA_EVENT', 'onProfilesData'],
        ['CHANNEL_ROUTE_DEEPLINK_EVENT', 'onDeepLink']*/
    ];
  }

  onDeepLink(e){

    let {routeData} = e.props();
    let {profileId} = routeData;
    if (profileId!==undefined && profileId!=='menu'){
       this.loadProfile(profileId);

    }


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
      this.loadProfile(profileId);

  }

  loadProfile(profileId){

    let data = this.profileTraits$GetProfileItemData(profileId, this.props.data);

    this.appendView(new ProfileItemView({data}), '.page-content');;
    console.log('profileItemData ',data);
  }

  onProfilesData(e){
    this.props.data = e.payload;
    this.appendView(new ProfilesContentView({data:this.props.data}), '.page-content');

  //  this.addChannel("CHANNEL_ROUTE");
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['#profile-back-btn', 'click']

    ];
  }

  afterRender() {
    this.pageTrait$InitPage();

    //this.addChannel("CHANNEL_PROFILES");

    this.appendView(new ProfilesContentView());


  }

}