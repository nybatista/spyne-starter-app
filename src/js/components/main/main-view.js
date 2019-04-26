import {ViewStream} from 'spyne';

export class MainView extends ViewStream {

  constructor(props = {}) {
      props.tagName='main';
      props.id = 'app';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_RANDOM_USERS_DATA_EVENT', 'onDataEvent']
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
    this.loadContent();
    this.addChannel("CHANNEL_RANDOM_USERS");

  }

}