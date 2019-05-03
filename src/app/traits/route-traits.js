import {SpyneTrait} from 'spyne';
import {find, propEq} from 'ramda';

export class RouteTrait extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'routeTrait';
    super(context, traitPrefix);

  }

  static routeTrait$ParseRouteData(pathsChanged, routeData={}, isDeepLink){
    let payload = {};
    let action;

    const isChanged = (str)=>pathsChanged.indexOf(str)>=0;
    let changedParam = find(isChanged, ['pageId']);
    if (isDeepLink === true){
      changedParam = 'pageId';
    }

    if (changedParam !== 'pageId'){
      return {action,payload};
    } else {
      action = "CHANNEL_STARTER_ROUTE_PAGE_EVENT";
      payload = routeData;
    }

    return {action, payload};
  }


  static routeTrait$TestMethod(){
    console.log('route test method ',this);
  }
}