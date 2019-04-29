import {Subject} from "rxjs";
import {filter} from "rxjs/operators";
import {cond} from 'ramda';
describe('index root test', ()=>{

  it('should run tests', ()=>{
  	console.log('tests are being runc ',{Subject,filter,cond});
    return true;

  });


});