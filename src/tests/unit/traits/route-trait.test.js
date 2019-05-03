import {RouteTrait} from '../../../app/traits/route-traits';
import {homeChannelPayload} from '../../mocks/channel-payloads';

describe('RouteTrait methods', ()=>{

  it('should return page event', ()=>{
    let {pathsChanged, routeData} = homeChannelPayload.payload;
    let {action} = RouteTrait.routeTrait$ParseRouteData(pathsChanged, routeData);
    expect(action).to.equal("CHANNEL_PAGE_ROUTE_EVENT");
  });
  it('should return profile event', ()=>{
    let {pathsChanged, routeData} = homeChannelPayload.payload;
    pathsChanged=['profileId'];
    let {action} = RouteTrait.routeTrait$ParseRouteData(pathsChanged, routeData);
    expect(action).to.equal("CHANNEL_PAGE_ROUTE_PROFILE_EVENT");
  });


});