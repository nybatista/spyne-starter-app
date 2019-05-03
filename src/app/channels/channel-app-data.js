import {Subject, forkJoin, zip} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {Channel, ChannelPayload} from 'spyne';
import {propEq,is,clone} from 'ramda';
import {ProfileTraits} from '../traits/profile-trait';

export class ChannelAppData extends Channel {

  constructor(name, props = {}) {
    name = 'CHANNEL_APP_DATA';
    props.sendCachedPayload = true;
    super(name, props);
    new ProfileTraits(this);
  }


  onInitialDataLoaded(e){
    let {route, data} = e;
    this.props.data = data;
    this.routeChannel$.subscribe(this.onRouteEvent.bind(this));
  }

  onRouteEvent(e){
    let {routeData} = e.props();
    this.checkForEvent(routeData);
  }

  checkForEvent(routeData){
    let {profileId, pageId} = routeData;

    let actionStr;
    let payload = {};
    let isProfilePage = pageId === 'profiles';
    let isProfileItem = profileId !== undefined && profileId !=="";;

    if (isProfilePage === true){
      actionStr = "CHANNEL_APP_DATA_PROFILE_EVENT";
      payload = clone(this.props.data);
      if (isProfileItem === true){
        profileId = decodeURI(profileId);
        actionStr = "CHANNEL_APP_DATA_PROFILE_ITEM_EVENT";
        payload = {};
        payload.menuData = clone(this.props.data);
        payload.profileItemData = this.profileTraits$GetProfileItemData(profileId, this.props.data);
      }
      this.sendChannelPayload(actionStr, payload);

    }

  }

  onChannelInitialized() {
    const subscribeTest = (e)=>{
      console.log('channel app data test subscribe ',e);

    }

    this.observer$.subscribe(subscribeTest);

    this.fetchProfiles$ = this.getChannel('CHANNEL_USERS');
    this.routeChannel$ = this.getChannel("CHANNEL_ROUTE");
    const obs$ = zip(this.routeChannel$, this.fetchProfiles$)
    .pipe(
    map(([route, data])=>({route,data:data.payload}))
  )
        .subscribe(this.onInitialDataLoaded.bind(this));

  }

  addRegisteredActions() {
    return [
      'CHANNEL_APP_DATA_PROFILE_EVENT',
      'CHANNEL_APP_DATA_PROFILE_ITEM_EVENT'
    ];
  }


}