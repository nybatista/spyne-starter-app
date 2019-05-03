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
    console.log('filter returned ',payloadFilter(payload));

    return true;

  })



});