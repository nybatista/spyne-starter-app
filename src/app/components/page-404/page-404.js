import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import template from './templates/404.tmpl.html';

export class Page404 extends ViewStream {

  constructor(props = {}) {
    props.class='page page-404';
    props.template=template;
    props.traits = PageTraits;
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