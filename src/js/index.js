import "../css/main.css";
import {SpyneApp, ViewStream} from 'spyne';
import goat from "imgs/goat.jpg";
import Data from "data/download.json";


const spyneApp = new SpyneApp();

const imgUrl = "//spynejs.org.s3.amazonaws.com/test2/animals_0002.jpg";

const app = new ViewStream({
  tagName: 'main',
  id: 'app'

});

app.appendToDom(document.body);

var n = Data.results[0],name;
console.log('data is ',n.name.first);



app.appendView(new ViewStream({
  tagName: 'h3',
  data: 'HOLA PLANETA! '+n.name.first

}));


let img = new ViewStream({
  tagName: 'img',
  src: imgUrl,
  width: 300

});


app.appendView(img);