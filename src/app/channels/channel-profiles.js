import {filter} from 'rxjs/operators';
import {Channel} from 'spyne';
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
    .subscribe(this.onProfilesRouteEvent.bind(this));
  }

  onProfilesRouteEvent(e){
    let {profileId} = e.props().routeData;
    let {action, payload} = this.profileTraits$GetChannelPayload(profileId, this.props.data);
    this.sendChannelPayload(action, payload);

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