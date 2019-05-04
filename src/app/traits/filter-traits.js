import {SpyneTrait, ChannelPayloadFilter} from 'spyne';
import {propEq, isEmpty, prop, complement, compose, allPass} from 'ramda';
export class FilterTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'filters$';
    super(context, traitPrefix);
  }

  static filters$PageIdFilter(e){
   return new ChannelPayloadFilter('', {
      routeData:  (val)=>['home','profiles','about'].indexOf(val.pageId)>=0
    })
  }


  static filters$PageChangeFilter(e){
    return new ChannelPayloadFilter('', {
      pathsChanged: (arr)=>arr.indexOf('pageId')>=0
    })
  }

  static filters$ProfileEventFilter(e){
    const pageIdIsProfiles = propEq('pageId', 'profiles');

    return new ChannelPayloadFilter('', {
      routeData: pageIdIsProfiles,
    })
  }



}