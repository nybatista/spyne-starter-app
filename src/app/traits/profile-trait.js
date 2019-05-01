import {SpyneTrait} from 'spyne';
const R = require('ramda');
import {compose, map, range,reduce} from 'ramda';

export class ProfileTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'profileTraits$';
    super(context, traitPrefix);

  }
  static profileTraits$CreateRandomArr(n=1){
    const shuffler = R.curry(function(random, list) {
          let idx = -1;
          let len = list.length;
          let position;
          let result = [];
          while (++idx < len) {
            position = Math.floor((idx + 1) * random());
            result[idx] = result[position];
            result[position] = list[idx];
          }
          return result;
        });
       const shuffle = shuffler(Math.random);
       return shuffle(range(0,n));
  }

  static profileTraits$InitCapWords(str){
    const replacer = (cxt,p1,p2)=>{
      return String(p1).toUpperCase()+p2;
    };
    return str.replace(/(\b\w)(\S*)/gm, replacer)

  }

  static profileTraits$CreateAnimalAvatarsArr(){
    const pad=(number, length=4) => {
      return (Array(length).join('0') + number).slice(-length);
    };

    const animalAvatarLinks = n=>`//assetscontainer.com/starter-app/imgs/animals_${pad(n)}.jpg`;
    let arr = ProfileTraits.profileTraits$CreateRandomArr(18);

    return map(animalAvatarLinks, arr);
  }


  static profileTraits$mapProfiles(response){
    let animatAvatarLinks = ProfileTraits.profileTraits$CreateAnimalAvatarsArr();


    const mapProfiles = (profile)=>{
        profile.photo = profile.picture.large;
        profile.userName = `${profile.name.first} ${profile.name.last}`;
        profile.profileId = String(profile.name.last).toLowerCase();
        profile.loc =  ProfileTraits.profileTraits$InitCapWords(`${profile.location.city}, ${profile.location.state}`);
        profile.avatar = animatAvatarLinks.shift();
        return profile;
      };

      //const lensPic = lensPath(['picture', 'large']);

        return map(mapProfiles, response.users);
  }

  static profileTraits$GetProfileItemData(profileId, data){
    const filterByProfileId = R.filter(R.propEq('profileId', profileId));
    return  R.compose(R.head, filterByProfileId)(data);

  }







}