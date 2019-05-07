import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import template from './templates/about.tmpl.html';

export class AboutPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-about-page';
    props.class='page';
    props.template = template;
    props.traits = [PageTraits];
    super(props);
  }

  addActionListeners() {
    return [
      this.pageTrait$OnPageChangeBindToDispose()
    ];
  }

  broadcastEvents() {
    return [];
  }

  afterRender() {
    this.pageTrait$InitPage();

  }

}