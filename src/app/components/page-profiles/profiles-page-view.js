import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {ProfilesContentView} from './profiles-content-view';

export class ProfilesPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-profiles-page';
    props.class='page';
    props.template = require('./templates/profiles.tmpl.html');
    super(props);
    new PageTraits(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_STARTER_ROUTE_PAGE_EVENT', 'disposeViewStream'],
      ['CHANNEL_PROFILES_DATA_EVENT', 'onProfilesData']
    ];
  }

  onProfilesData(e){
    this.appendView(new ProfilesContentView({data:e.payload}), '.page-content');
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {
    this.pageTrait$InitPage();

    this.addChannel("CHANNEL_PROFILES")


  }

}