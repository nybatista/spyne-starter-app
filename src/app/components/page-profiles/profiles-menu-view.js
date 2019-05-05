import {ViewStream} from 'spyne';
import {ProfilesMenuItemView} from './profiles-menu-item-view';
import {filter} from 'rxjs/operators';

export class ProfilesMenuView extends ViewStream {

  constructor(props = {}) {
    props.tagName='ul';
    props.id='profiles-menu';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_UI_ANIMATIONEND_EVENT', 'onAnimationEnd', '#profiles-menu'],
      ['CHANNEL_USERS_DATA_EVENT', 'onMenuDataEvent'],
      ['CHANNEL_PROFILES_MENU_EVENT', 'slideIn'],
      ['CHANNEL_PROFILES_ITEM_EVENT', 'slideOut']
    ];
  }

  scrollWindowY(n=0){
    window.scrollTo({top:n});
  }

  slideIn(e){
    this.props.el$.removeClass('hide');
    this.props.el$.inline='';

    console.log("SLIDE IN ",this.props.scrollY);
    if (this.props.scrollY!==undefined){
      this.scrollWindowY(this.props.scrollY);
      //this.props.scrollY=undefined;
    } else if (this.props.profileNum!==undefined){
      let sel = `.profile-num-${this.props.profileNum}`;
      if (this.props.el$(sel).exists === true){
        this.props.el$(sel).el.scrollIntoView();
      }
    }
  }

  slideOut(e){
    let {profileNum} = e.props();
    console.log("menu slide out ",{profileNum, e},this.props.scrollY);
    if (this.props.scrollY!==undefined){
      this.scrollWindowY(this.props.scrollY);
    }

    this.props.profileNum = profileNum;

    this.props.el$.addClass('hide');
  }

  onAnimationEnd(e){
    this.hideMenu();
  }

  hideMenu(){
    this.props.el$.inline='display:none';
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
      ['ul', 'animationend']
    ];
  }

  listenToWindow(p){
    this.getChannel('CHANNEL_WINDOW')
    .pipe(filter(p=>p.action==='CHANNEL_WINDOW_SCROLL_EVENT'))
    .subscribe(this.onWindowScroll.bind(this));
  }

  onWindowScroll(e){
    let {scrollY} = e.props();
    if (scrollY!==0) {
      this.props.scrollY = scrollY;
    }
    console.log("Scroll Y IS ",scrollY,this.props.scrollY);


  }


  onMenuDataEvent(e){
    const addMenuItems = (data)=>{
      this.appendView(new ProfilesMenuItemView({data}))
    };
    e.payload.forEach(addMenuItems);
    this.listenToWindow();

  }

  afterRender() {
    this.hideMenu();
    this.addChannel("CHANNEL_PROFILES");
    this.addChannel("CHANNEL_USERS");
    this.addChannel('CHANNEL_UI');
  }

}