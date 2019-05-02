// import Rx from "rxjs";
// import * as R from "ramda";
import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';

export class Page404 extends ViewStream {

  constructor(props = {}) {
    props.class='page page-404';
    props.template=require('./templates/404.tmpl.html');
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