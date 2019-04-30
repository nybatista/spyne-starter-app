import {SpyneTrait} from 'spyne';
import {find} from 'ramda';

export class RouteTrait extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'routeTrait';
    super(context, traitPrefix);

  }

  static routeTrait$ParseRouteData(pathsChanged, routeData={}){

    const isChanged = (str)=>pathsChanged.indexOf(str)>=0;
    const changedParam = find(isChanged, ['pageId', 'profileId']);

    const action = changedParam === 'pageId' ? "CHANNEL_STARTER_ROUTE_PAGE_EVENT" : "CHANNEL_STARTER_ROUTE_PROFILE_EVENT";
    const payload = {}
    //console.log('route event is ',{changedParam, action, pathsChanged,routeData});

    return {action, payload:routeData};
  }


  static routeTrait$TestMethod(){
    console.log('route test method ',this);
  }
}