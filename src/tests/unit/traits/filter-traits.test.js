import {FilterTraits} from '../../../app/traits/filter-traits';
import {homeChannelPayload} from '../../mocks/channel-payloads';
const R = require('ramda');

describe('filter trait tests', () => {

  it('header pageId filter should return true', () => {
    let payload = R.clone(homeChannelPayload);
    let payloadFilter = FilterTraits.filters$PageIdFilter();
    let filterReturned = payloadFilter(payload);
    expect(filterReturned).to.equal(true);


  });

  it('header pageId filter should return true', () => {
    let payload = R.clone(homeChannelPayload);
    payload.routeData.pageId=undefined;
    let payloadFilter = FilterTraits.filters$PageIdFilter();
    let filterReturned = payloadFilter(payload);
    expect(filterReturned).to.equal(false);
  });


  it('pageId change should return true ',()=>{
    let payload = R.clone(homeChannelPayload);
    payload.pathsChanged = ['profileId'];
    let payloadFilter = FilterTraits.filters$PageChangeFilter();

    return true;

  });

it('returns true, pageId returns true and profileId is empty', ()=>{
    let payload = R.clone(homeChannelPayload);
    payload.routeData.pageId = 'profiles';
    payload.routeData.profileId = "";

  let payloadFilter = FilterTraits.filters$ProfileEventFilter();
    let filterReturned = payloadFilter(payload);

  expect(filterReturned).to.equal(true);


});

  it('returns true, pageId returns true and profileId is undefined', ()=>{
    let payload = R.clone(homeChannelPayload);
    payload.routeData.pageId = 'profiles';
    let payloadFilter = FilterTraits.filters$ProfileEventFilter();
    let filterReturned = payloadFilter(payload);
    expect(filterReturned).to.equal(true);
  });

  it('returns true, pageId returns true and profileId is defined', ()=>{
    let payload = R.clone(homeChannelPayload);
    payload.routeData.pageId = 'profiles';
    payload.routeData.profileId = "b0";
    let payloadFilter = FilterTraits.filters$ProfileEventFilter();
    let filterReturned = payloadFilter(payload);
    expect(filterReturned).to.equal(true);

  });

  it('returns false, pageId returns false and profileId is defined', ()=>{
    let payload = R.clone(homeChannelPayload);
    payload.routeData.pageId = 'home';
    payload.routeData.profileId = "b0";
    let payloadFilter = FilterTraits.filters$ProfileEventFilter();
    let filterReturned = payloadFilter(payload);
    expect(filterReturned).to.equal(false);

  });


});