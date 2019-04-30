import {css} from "./scss/main.scss";
import {SpyneApp, ViewStream, ChannelFetch} from 'spyne';
import {MainView} from './app/components/main/main-view';
import {ChannelStarterRoute} from './app/channels/channel-starter-route';


const spyneApp = new SpyneApp({

  debug:true,

  channels: {


    ROUTE: {

      routes: {

        routePath: {
          routeName: 'pageId',
          home: '^$|index.html',
          about: 'about',
          profiles: {
            routePath: {
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
spyneApp.registerChannel(new ChannelFetch("CHANNEL_PROFILES", randUserData))
