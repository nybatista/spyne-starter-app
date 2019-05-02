import {SpyneTrait} from 'spyne';
import {HomePageView} from '../components/page-home/home-page-view';
import {ProfilesPageView} from '../components/page-profiles/profiles-page-view';
import {AboutPageView} from '../components/page-about/about-page-view';

export class PageTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = "pageTrait$";
    super(context, traitPrefix);

  }

  static pageTrait$GetPageClass(pageId='home'){
    const classHashObj = {
      'home' : HomePageView,
      'profiles' : ProfilesPageView,
      'about' :  AboutPageView
    };

    return classHashObj[pageId];

  }


  static pageTrait$CheckToDispose(e){
    let {pageId} = e.props();
    if (pageId!==this.props.pageId){
      this.disposeViewStream();
    }

  }


  static pageTrait$InitPage(){
    this.addChannel("CHANNEL_STARTER_ROUTE");

  }

  static pageTrait$TestMethod(){
    console.log('testing method ',this);
  }
}