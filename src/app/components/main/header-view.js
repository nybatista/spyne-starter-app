import {ViewStream} from 'spyne';
import {FilterTraits} from '../../traits/filter-traits';
import template from "./templates/header.tmpl.html";


export class HeaderView extends ViewStream {

  constructor(props = {}) {
      props.tagName='section';
      props.id='header-view';
      props.traits = FilterTraits;
      props.template = template;
    super(props);
  }

  addActionListeners() {
    return [
        ["CHANNEL_ROUTE_.*_EVENT", 'onRouteChange', this.filters$PageIdFilter()]
    ];
  }

  onRouteChange(e){
    let {pageId} = e.props().routeData;
    this.props.el$('a').setActiveItem('selected', `#${pageId}`);
  }

  broadcastEvents() {
    return [
        ['a', 'click']
    ];
  }

  afterRender() {
      this.addChannel("CHANNEL_ROUTE");
  }

}