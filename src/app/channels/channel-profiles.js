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

    this.props.scrollRecorder = this.getScrollYRecorder();


    const routePayloadFilter = this.filters$ProfileEventFilter();
    this.routeChannel$
    .pipe(filter(routePayloadFilter))
    .subscribe(this.onProfilesRouteEvent.bind(this));
  }

  onProfilesRouteEvent(e){
    let {profileId} = e.props().routeData;
    let {routeCount} = e.props();
    let {action, payload} = this.profileTraits$GetChannelPayload(profileId, this.props.data);

    console.log('scroll record ',routeCount);
    payload.scrollY = this.props.scrollRecorder.getScrollNum(routeCount)
    this.sendChannelPayload(action, payload);

  }


  onChannelInitialized() {
    this.routeChannel$ = this.getChannel("CHANNEL_ROUTE");

    this.getChannel('CHANNEL_USERS')
      .subscribe(this.onInitialDataLoaded.bind(this));

  }

  getScrollYRecorder(){

    let recorder = ()=>{
      let obj = {};
      obj.data = {};

      obj.setScrollNum = (count)=>{
        obj.data[count] = window.scrollY;
        return obj[count];
      };

      obj.getScrollNum = (count)=>{

        console.log('obj scroll data ',count,obj.data);

        return obj.data[count] !== undefined ? obj.data[count] :  obj.setScrollNum(count);
      };

      return obj;

    };

    return recorder();

  }












  addRegisteredActions() {
    return [
      'CHANNEL_PROFILES_MENU_EVENT',
      'CHANNEL_PROFILES_ITEM_EVENT'
    ];
  }


}