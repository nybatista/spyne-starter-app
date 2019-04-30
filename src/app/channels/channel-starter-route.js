import {Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators/index';
import {Channel, ChannelPayload} from 'spyne';
import {RouteTrait} from '../traits/route-traits';

export class ChannelStarterRoute extends Channel {

  constructor(name, props = {}) {
    name = "CHANNEL_STARTER_ROUTE";
    props.sendCurrentPayload = false;
    super(name, props);
    new RouteTrait(this);

  }

  onRouteChange(e){
    let {pathsChanged, routeData} = e.props();
    let {action, payload} = this.routeTrait$ParseRouteData(pathsChanged, routeData);
    this.sendChannelPayload(action,payload);
  }

  onChannelInitialized() {
    this.getChannel('CHANNEL_ROUTE')
        .subscribe(this.onRouteChange.bind(this));
  }

  addRegisteredActions() {
    return [
      "CHANNEL_STARTER_ROUTE_PAGE_EVENT",
      "CHANNEL_STARTER_ROUTE_PROFILE_EVENT"
    ];
  }

  onIncomingViewStreamInfo(obj) {
    let data = obj.props();
  }

  onSendPayload(actionStr, payload = {}) {
    const action = this.channelActions[actionStr];
    const srcElement = {};
    const event = undefined;
    this.sendChannelPayload(action, payload, srcElement, event);
  }

}