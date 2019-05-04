import {Channel, ChannelPayloadFilter} from 'spyne';
import {filter} from "rxjs/operators";
import {FilterTraits} from '../traits/filter-traits';


export class ChannelPageRoute extends Channel {

  constructor(name, props = {}) {
    name = "CHANNEL_PAGE_ROUTE";
    props.sendCachedPayload = false;
    super(name, props);
    new FilterTraits(this);

  }

  onRouteChange(e){
    let {routeData,} = e.props();
    const action = "CHANNEL_PAGE_ROUTE_EVENT";
    this.sendChannelPayload(action ,routeData);
  }

  onChannelInitialized() {
    const pagePayloadFilter = this.filters$PageChangeFilter();
    this.getChannel('CHANNEL_ROUTE')
    .pipe(filter(pagePayloadFilter))
    .subscribe(this.onRouteChange.bind(this));
  }

  addRegisteredActions() {
    return [
      "CHANNEL_PAGE_ROUTE_EVENT"
    ];
  }


}