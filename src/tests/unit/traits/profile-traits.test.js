import {profilesData} from '../../mocks/profiles-data';
import {profilesDataParsed} from '../../mocks/profiles-data-parsed';
import {ProfileTraits} from '../../../app/traits/profile-trait';
const R = require('ramda');

describe('ProfileTraits methods', () => {

  it('should add photos and avatars to profiles', () => {

    //console.log('profiles data is ',profilesData);
    //let updatedProfiles = ProfileTraits.profileTraits$mapProfiles(profilesData);

    return true;

  });

  it('should filter data by profileId', ()=>{
      let data = profilesDataParsed;
      let name = data[0].profileId;
      let profileItemData = ProfileTraits.profileTraits$GetProfileItemData(name, data);
      let profileItemEmail = profileItemData.email;
      expect(profileItemEmail).to.equal(data[0].email);

  });

  it ('should return the country name by code ', ()=>{
    let countryCode = "DE";
    let country = ProfileTraits.profileTraits$GetCountryByCode(countryCode);
    expect(country).to.equal('Germany');

  });

  it ('undefined profileId should return menu event', ()=>{
    let name;
    let data = profilesDataParsed;
    let {action, payload} = ProfileTraits.profileTraits$GetChannelPayload(name, data);
    let payloadIsEmpty = R.isEmpty(payload);
    expect(payloadIsEmpty).to.equal(true);

  })

  it ('empty profileId name should return menu event', ()=>{
    let name = "";
    let data = profilesDataParsed;
    let {action, payload} = ProfileTraits.profileTraits$GetChannelPayload(name, data);
    let payloadIsEmpty = R.isEmpty(payload);
    expect(payloadIsEmpty).to.equal(true);
  })

  it ('defined profileId name should return item event', ()=>{
    let data = profilesDataParsed;
    let name = data[0].profileId;
    let {action, payload} = ProfileTraits.profileTraits$GetChannelPayload(name, data);
    let payloadIsEmpty = R.isEmpty(payload);
    expect(payloadIsEmpty).to.equal(false);
  })

});