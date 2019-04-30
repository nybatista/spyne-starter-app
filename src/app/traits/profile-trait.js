import {SpyneTrait} from 'spyne';

export class ProfileTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'profileTraits$';
    super(context, traitPrefix);

  }


  static profileTraits$mapProfiles(data){
      const mapProfiles = (profile)=>{
          console.log('profile is ',profile);
        return profile;
      };

        return data.map(mapProfiles);

  }







}