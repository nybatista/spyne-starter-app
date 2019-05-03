import {ViewStream} from 'spyne';
import {HeaderView} from './header-view';
import {HomePageView} from '../page-home/home-page-view';
import {PageHolderView} from './page-holder';

export class MainView extends ViewStream {

  constructor(props = {}) {
      props.tagName='main';
      props.id = 'app';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
    ];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }


  afterRender() {
    this.appendView(new HeaderView());
    this.appendView(new PageHolderView());
  }

}