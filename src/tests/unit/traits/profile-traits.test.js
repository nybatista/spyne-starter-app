import {profilesData} from '../../mocks/profiles-data';
import {ProfileTraits} from '../../../app/traits/profile-trait';

describe('ProfileTraits methods', () => {

  it('should add photos and avatars to profiles', () => {

    //console.log('profiles data is ',profilesData);
    let updatedProfiles = ProfileTraits.profileTraits$mapProfiles(profilesData);

    return true;

  });

});