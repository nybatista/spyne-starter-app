import {ViewStream} from 'spyne';
import {PageView} from './page-view';

export class PageHolderView extends ViewStream {

  constructor(props = {}) {
    props.id='page-holder';
    props.tagName='section';
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_PAGE_ROUTE_EVENT', 'onPageEvent']
    ];
  }

  onPageEvent(e){
    let {pageId} = e.props();
    this.appendView(new PageView({pageId}));
  }


  onRendered() {
   this.addChannel("CHANNEL_PAGE_ROUTE");
  }

}