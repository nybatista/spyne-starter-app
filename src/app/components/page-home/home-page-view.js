import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';

export class HomePageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-home-page';
    props.class='page';
    props.template = require('./templates/home.tmpl.html');
    super(props);
    this.props.pageId='home';
    new PageTraits(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_STARTER_ROUTE_PAGE_EVENT', 'disposeViewStream']
    ];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['.btn', 'click']
    ];
  }

  afterRender() {
    this.pageTrait$InitPage();

  }

}