import {ViewStream} from 'spyne';
import {HeaderView} from './header-view';
import {HomePageView} from '../page-home/home-page-view';
import {PageHolderView} from './page-holder';

export class MainView extends ViewStream {

  constructor(props = {}) {
      props.tagName='main';
      props.id = 'app';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
    ];
  }

  onDataEvent(e){

    console.log("data is ",e);
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  loadContent(){

    this.appendView(new ViewStream({
      tagName: 'h3',
      data: 'HELLO WORLD! '

    }));

    const imgUrl = "//spynejs.org.s3.amazonaws.com/test2/animals_0005.jpg";

    let img = new ViewStream({
      tagName: 'img',
      src: imgUrl,
      width: 300

    });


    this.appendView(img);



  }


  afterRender() {
    //this.loadContent();
    this.appendView(new HeaderView());
    this.appendView(new PageHolderView());



  }

}