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
    this.props.scrollY=0;
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

    // CHECK IF SCROLL POSITION IS FROM HISTORY - BACK - FORWARD BROWSER BUTTONS
    payload.scrollY = this.props.scrollRecorder.getScrollNum(routeCount);
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
        obj.data[count] = this.onWindowScroll();
        return obj[count];
      };

      obj.getScrollNum = (count)=>{
        return obj.data[count] !== undefined ? obj.data[count] :  obj.setScrollNum(count);
      };
      return obj;
    };
    return recorder();

  }


  listenToWindow(p){
    this.getChannel('CHANNEL_WINDOW')
    .pipe(filter(p=>p.action==='CHANNEL_WINDOW_SCROLL_EVENT'))
    .subscribe(this.onWindowScroll.bind(this));
  }

  onWindowScroll(e){
    let scrollY = window.scrollY;
    if (scrollY!==0) {
      this.props.scrollY = scrollY;
    }
    return this.props.scrollY;
  }


  addRegisteredActions() {
    return [
      'CHANNEL_PROFILES_MENU_EVENT',
      'CHANNEL_PROFILES_ITEM_EVENT'
    ];
  }


}