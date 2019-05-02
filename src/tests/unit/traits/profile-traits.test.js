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
      let name = 'larsen';
      let data = profilesDataParsed;
      let profileItemData = ProfileTraits.profileTraits$GetProfileItemData(name, data);
      let profileItemEmail = profileItemData.email;

      expect(profileItemEmail).to.equal('jonas.larsen@example.com');

  })

  it ('should return the country name by code ', ()=>{

    let countryCode = "DE";

    let country = ProfileTraits.profileTraits$GetCountryByCode(countryCode);
    expect(country).to.equal('Germany');

  })

});