import {SpyneTrait} from 'spyne';
import {find, propEq} from 'ramda';

export class RouteTrait extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'routeTrait';
    super(context, traitPrefix);

  }

  static routeTrait$ParseRouteData(pathsChanged, routeData={}, isDeepLink){

    const actionHash = {
      pageId: "CHANNEL_STARTER_ROUTE_PAGE_EVENT",
      profileId: "CHANNEL_STARTER_ROUTE_PROFILE_EVENT",
      profileMenu: "CHANNEL_STARTER_ROUTE_PROFILE_MENU_EVENT",
      profileMenuDeeplink: "CHANNEL_STARTER_ROUTE_PROFILE_MENU_DEEPLINK_EVENT"
    };

    const isChanged = (str)=>pathsChanged.indexOf(str)>=0;
    let changedParam = find(isChanged, ['pageId', 'profileId']);
    const isMenu = propEq('profileId', 'menu')(routeData);
    changedParam  = isMenu === true ? 'profileMenu' : changedParam;

    if(changedParam === 'profileMenu' && isDeepLink===true){
      changedParam = 'profileMenuDeeplink';
    }


    const action =  actionHash[changedParam];
    const payload = {}
    //console.log('route event is ',{changedParam, action, pathsChanged,routeData});

    return {action, payload:routeData};
  }


  static routeTrait$TestMethod(){
    console.log('route test method ',this);
  }
}