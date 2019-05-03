// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';

export class Page404 extends ViewStream {

  constructor(props = {}) {
    props.class='page page-404';
    props.template=require('./templates/404.tmpl.html');
    props.traits = PageTraits;
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
      this.pageTrait$OnPageChangeBindToDispose()

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