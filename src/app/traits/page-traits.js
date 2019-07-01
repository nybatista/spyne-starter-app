import {SpyneTrait} from 'spyne';
import {ProfilesContentView} from '../components/profiles-views/profiles-content-view';

export class PageTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = "pageTrait$";
    super(context, traitPrefix);
  }


  static pageTrait$BraodcastEventsArr(){
    let {pageId} = this.props;
     return  pageId === 'home' ? [['.btn', 'click']] : [];
  }


  static pageTrait$OnPageChangeBindToDispose(){
    return  ['CHANNEL_PAGE_ROUTE_EVENT', 'disposeViewStream'];
  }

  static pageTrait$InitPage(){
    this.addChannel("CHANNEL_PAGE_ROUTE");

    if (this.props.pageId==='profiles'){
      this.appendView(new ProfilesContentView());
    }

  }

}