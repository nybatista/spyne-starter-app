import {Channel, ChannelPayload} from 'spyne';
import {RouteTrait} from '../traits/route-traits';

export class ChannelStarterRoute extends Channel {

  constructor(name, props = {}) {
    name = "CHANNEL_STARTER_ROUTE";
    props.sendCachedPayload = false;
    super(name, props);
    new RouteTrait(this);

  }

  onRouteChange(e){
    let {pathsChanged, routeData, isDeepLink} = e.props();
    let {action, payload} = this.routeTrait$ParseRouteData(pathsChanged, routeData, isDeepLink);
    if (action!==undefined) {
      this.sendChannelPayload(action, payload);
    }
  }

  onChannelInitialized() {
    this.getChannel('CHANNEL_ROUTE')
        .subscribe(this.onRouteChange.bind(this));
  }

  addRegisteredActions() {
    return [
      "CHANNEL_STARTER_ROUTE_PAGE_EVENT"
    ];
  }


}