// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {HomePageView} from '../page-home/home-page-view';

export class PageHolderView extends ViewStream {

  constructor(props = {}) {
    props.id='page-holder';
    props.tagName='section';
    super(props);
    new PageTraits(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_STARTER_ROUTE_PAGE_EVENT', 'onPageEvent']
    ];
  }

  onPageEvent(e){
    let {pageId} = e.props();
    const PageClass = this.pageTrait$GetPageClass(pageId);
    this.appendView(new PageClass());
    console.log('page event is ',pageId,e,PageClass);

  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {

   this.addChannel("CHANNEL_STARTER_ROUTE");
  }

}