import {SpyneTrait} from 'spyne';

export class PageTraits extends SpyneTrait {

  constructor(context) {
    let methodPrefix = "page";
    super(context, methodPrefix);

  }

  static pageTestMethod(){
    console.log('testing method ',this);
  }
}