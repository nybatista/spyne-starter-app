import {css} from "./scss/main.scss";
import {SpyneApp, ViewStream, ChannelFetch} from 'spyne';
import {MainView} from './app/components/main/main-view';
import {ChannelPageRoute} from './app/channels/channel-page-route';
import {ProfileTraits} from './app/traits/profile-trait';
import {ChannelAppData} from './app/channels/channel-app-data';



const spyneApp = new SpyneApp({

  debug:true,

  channels: {


    ROUTE: {
        type: "slash",
      routes: {

        routePath: {
          routeName: 'pageId',
          home: '^$|index.html',
          about: 'about',
          profiles: {
            routePath: {
              routeName: 'profileId'
            }
          },
          404: ".*"


        }



      }



    }


  }




});
const app = new MainView();

app.appendToDom(document.body);




let randUserData = {
  url: "//assetscontainer.com/starter-app/random-users.json",
  mapFn: ProfileTraits.profileTraits$mapProfiles
};
spyneApp.registerChannel(new ChannelAppData());

spyneApp.registerChannel(new ChannelPageRoute());
spyneApp.registerChannel(new ChannelFetch("CHANNEL_USERS", randUserData))
