import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {ProfilesContentView} from './profiles-content-view';
import {ProfileTraits} from '../../traits/profile-trait';
import {ProfileItemView} from './profile-item-view';

export class ProfilesPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-profiles';
    props.class='page';
    props.traits = [PageTraits, ProfileTraits];
    super(props);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
      this.pageTrait$OnPageChangeBindToDispose()
    ];
  }


  afterRender() {
    this.pageTrait$InitPage();
    this.appendView(new ProfilesContentView());
  }

}