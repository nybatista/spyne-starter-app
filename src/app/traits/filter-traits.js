import {SpyneTrait, ChannelPayloadFilter} from 'spyne';
export class FilterTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'filters$';
    super(context, traitPrefix);
  }

  static filters$PageIdFilter(){
   return new ChannelPayloadFilter('', {
      routeData:  (val)=>['home','profiles','about'].indexOf(val.pageId)>=0
    })
  }


  static filters$PageChangeFilter(){
    return new ChannelPayloadFilter('', {
      pathsChanged: (arr)=>arr.indexOf('pageId')>=0
    })
  }

  static filters$ProfileEventFilter(){
    return new ChannelPayloadFilter('', {
      routeData: (obj)=>obj.pageId==='profiles',
    })
  }



}