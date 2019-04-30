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
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  afterRender() {
    this.pageTestMethod();

  }

}