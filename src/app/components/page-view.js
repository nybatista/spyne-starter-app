import {ViewStream} from 'spyne';
import {PageTraits} from '../traits/page-traits';

export class PageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id=`page-${props.pageId}`;
    props.class='page';
    props.traits = PageTraits;
    props.template = props.pageId === 'profiles' ? undefined : document.querySelector(`.tmpl-${props.pageId}`);
    super(props);
  }

  addActionListeners() {
    return [
      this.pageTrait$OnPageChangeBindToDispose()
    ];

  }

  broadcastEvents() {
   return this.pageTrait$BraodcastEventsArr();

  }

  onRendered() {
    this.pageTrait$InitPage();

  }

}