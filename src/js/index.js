import  { CSS } from "css/main.css";
import {SpyneApp, ViewStream, ChannelFetch} from 'spyne';
import {MainView} from './components/main/main-view';
import {ChannelStarterRoute} from './channels/channel-starter-route';


const spyneApp = new SpyneApp({

  devMode:true,

  channels: {


    ROUTE: {

      routes: {

        routeLevel: {
          routeName: 'pageId',
          home: '^$|index.html',
          profiles: {
            routeLevel: {
              routeName: 'profileId'
            }
          }


        }



      }



    }


  }




});
const app = new MainView();

app.appendToDom(document.body);



let randUserData = {
  url: "//assetscontainer.com/starter-app/random-users.json",
  mapFn: (p)=>p.users
};

spyneApp.registerChannel(new ChannelStarterRoute());
spyneApp.registerChannel(new ChannelFetch("CHANNEL_RANDOM_USERS", randUserData));