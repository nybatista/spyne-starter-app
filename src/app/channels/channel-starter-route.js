import {Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators/index';
import {Channel, ChannelPayload} from 'spyne';

export class ChannelStarterRoute extends Channel {

  constructor(name, props = {}) {
    name = "CHANNEL_STARTER_ROUTE";
    props.sendCurrentPayload = false;
    super(name, props);

  }

  onRouteChange(e){
    console.log('on route change ',e);
  }

  onChannelInitialized() {

    this.getChannel('CHANNEL_ROUTE')
        .subscribe(this.onRouteChange.bind(this));
  }

  addRegisteredActions() {
    return [];
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