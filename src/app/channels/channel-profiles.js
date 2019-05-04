import {filter} from 'rxjs/operators';
import {Channel} from 'spyne';
import {length} from 'ramda';
import {ProfileTraits} from '../traits/profile-trait';
import {FilterTraits} from '../traits/filter-traits';

export class ChannelProfiles extends Channel {

  constructor(name, props = {}) {
    name = 'CHANNEL_PROFILES';
    props.sendCachedPayload = true;
    props.traits = [ProfileTraits, FilterTraits];
    super(name, props);
  }

  onInitialDataLoaded(e){
    this.props.data = e.payload;

    const routePayloadFilter = this.filters$ProfileEventFilter();
    this.routeChannel$
    .pipe(filter(routePayloadFilter))
    .subscribe(this.onRouteEvent.bind(this));
  }

  onRouteEvent(e){
    let {profileId} = e.props().routeData;

    let isProfileItemEvent = length(profileId)>=1;
    const action = isProfileItemEvent === true ?  "CHANNEL_PROFILES_ITEM_EVENT" : "CHANNEL_PROFILES_MENU_EVENT";

    let data = {};
    if (isProfileItemEvent === true){
      data = this.profileTraits$GetProfileItemData(profileId, this.props.data);
    }

    this.sendChannelPayload(action, data);
  }

  onChannelInitialized() {
    this.routeChannel$ = this.getChannel("CHANNEL_ROUTE");
    this.getChannel('CHANNEL_USERS')
      .subscribe(this.onInitialDataLoaded.bind(this));

  }

  addRegisteredActions() {
    return [
      'CHANNEL_PROFILES_MENU_EVENT',
      'CHANNEL_PROFILES_ITEM_EVENT'
    ];
  }


}