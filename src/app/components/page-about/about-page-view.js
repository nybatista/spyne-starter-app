import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';

export class AboutPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-about-page';
    props.class='page';
    props.template = require('./templates/about.tmpl.html');
    super(props);
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
    return [];
  }

  afterRender() {
    this.pageTrait$InitPage();

  }

}