import {SpyneTrait} from 'spyne';

export class RouteTrait extends SpyneTrait {

  constructor(context) {
    let methodPrefix = 'route';
    super(context, methodPrefix);

  }


  static routeTestMethod(){
    console.log('route test method ',this);
  }
}