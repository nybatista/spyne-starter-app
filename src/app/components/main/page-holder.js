// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {FilterTraits} from '../../traits/filter-traits';
import {HomePageView} from '../page-home/home-page-view';

export class PageHolderView extends ViewStream {

  constructor(props = {}) {
    props.id='page-holder';
    props.tagName='section';
    props.traits = [FilterTraits, PageTraits];
    super(props);
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
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {

   this.addChannel("CHANNEL_STARTER_ROUTE");
   this.addChannel("CHANNEL_ROUTE");
  }

}