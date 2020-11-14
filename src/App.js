//英訳対応していない部分
//・お気に入り，お気に入り解除
//・ShopDetailの「住所」など
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Cookies from 'js-cookie'
import './App.css';
import LoadingLogo from './images/loading.gif'
import MainLogo from './images/newlogo.png'
import MapLogo from './images/map.png'
import ShopLogo from './images/shop.png'
import MyPageLogo from './images/mypage.png'
import classNames from 'classnames'
import {LMap} from './LMap'
import {Shop} from './Shop/Shop'
import {MyPage} from './MyPage'
import {Camera} from './Camera'
import {Favorite} from './Favorite/Favorite'
import {BeforePage, LMapStatus, ShopData} from './Utilities'
import firebase from "firebase";
import config from './firebase-config'

//URLの状態によってホームかカメラかを分ける
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/camera' component={Camera} />
      </Switch>
    </div>
  </Router>
)

//**************************
//メイン画面
//**************************
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.bindFunc = this.func.bind(this)
    this.sbindFunc = this.sfunc.bind(this)
    this.bindShopLocate = this.shopLocate.bind(this)
    this.state = {
      nav: 0, navBool: [true, false, false],
      Component: LMap,
      shop_data: {
        lat: null,
        lng: null,  
        id: null,
        name: null,
        address1: null,
        address2: null,
        intro: null,
        tag1: null,
        tag2: null,
        tag3: null,
        week: null,
        holi: null,
        reg_holi: null,     
      },
      sightseeing: 0,
      checked: [true, true, true, true, true],
      favId : new Favorite(new Array()),
      mapStatus: new LMapStatus([34.244659, 132.557402], 15, [true, true, true, true, true]),
      before_page : new BeforePage(null, this.movePage.bind(this)),
      search_res: [],
      review_id: 0,
      firebaseRef: null,
      posts: null,
      loading: true,
    }
  }

  componentWillMount(){
    firebase.initializeApp(config);

    let postsRef = firebase.database().ref('posts');

    let _this = this

    postsRef.on('value', function(snapshot){
      console.log(snapshot.val());
      _this.setState({posts: snapshot.val(), loading: false})
    })
    
    const fav_str = Cookies.get('favId')
    if(fav_str){
      var favIds = fav_str.split('-')
      favIds.map(id => {return Number(id)})
      this.state.favId.set(favIds)
    }
  }

  //**** タブ（フッター）クリック時 ****
  func (nav) {
    const navCopy = this.state.navBool.slice()
    //-1:お店の情報をタップしてLMapを表示する場合（ポップアップを自動で表示させる）
    if(nav === -1){
      navCopy[0] = true; navCopy[1] = false; navCopy[2] = false;
    }
    else{
      for (var i = 0; i < 3; i++) {
        if (i == nav) {
          navCopy[i] = true
        } else {
          navCopy[i] = false
        }
      }
    }
    switch (nav) {
      case -1: this.setState({nav: 0, navBool: navCopy, Component: LMap}); break
      case 0: this.setState({shop_data:{lat:null, lng:null, id:null, name:null,
                             address1: null, address2:null, intro:null,
                             tag1: null, tag2: null, tag3: null, week: null,
                             holi: null, reg_holi: null,},
                            nav: nav, navBool: navCopy, Component: LMap}); break     
      case 1: this.setState({nav: nav, navBool: navCopy, Component: Shop}); break
      case 2: this.setState({nav: nav, navBool: navCopy, Component: MyPage}); break
      default: this.setState({nav: nav, navBool: navCopy, Component: LMap}); break
    }
  }

  //**** 観光ルート表示時 ****
  sfunc (n) {
    this.setState({sightseeing: n, nav: 0, navBool: [true, false, false], Component: LMap})
  }

  //**** お店の位置を地図上に表示 ****
  shopLocate(shop_data){
    this.setState({shop_data: shop_data, Component: LMap, nav: 0, sightseeing: 0})    
    this.bindFunc(-1)
  }

  //ページ遷移
  movePage (state) {
    this.setState(state)
  }

  render () {
    const {Component} = this.state

    var container
    if(this.state.loading){
      container = <div className='loading-container'>
                    <img src={LoadingLogo} alt="" className="loading-logo"></img>
                  </div>
    }
    else{
      container = 
        <div className="App">
          <Header />
          <Component            
              shop_data={this.state.shop_data}
              shopLocate={this.bindShopLocate}
              sfunc={this.sbindFunc}
              sightseeing={this.state.sightseeing}
              checked={this.state.checked}
              favId={this.state.favId}
              mapStatus={this.state.mapStatus}
              before_page={this.state.before_page}
              movePage={this.movePage.bind(this)}
              search_res={this.state.search_res}
              review_id={this.state.review_id}
              firebaseRef={firebase.database().ref('posts')}
              posts={this.state.posts}
              loading={this.state.loading}/>
          <Footer func={this.bindFunc} nav={this.state.navBool}/>
        </div>
    }
    return (
      container
    )    
  }
}

//**************************
//ヘッダー
//**************************
class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render () {
    return (
        <header className="App-header">
          <img src={MainLogo} alt="" className="header-logo"></img>
        </header>
    )
  }
}

//**************************
//フッター
//**************************
class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.navTapHandler = this.navTapHandler.bind(this);
  }
  navTapHandler (e) {
    const k = Number(e.currentTarget.getAttribute('nav-num'))
    this.props.func(k)
  }
  render () {
    var navMap = classNames({"current": this.props.nav[0]}, {"none": !this.props.nav[0]})
    var navShop = classNames({"current": this.props.nav[1]}, {"none": !this.props.nav[1]})
    var navMyPage = classNames({"current": this.props.nav[2]}, {"none": !this.props.nav[2]})
    return (
      <footer className="App-footer">
        <div className={navMap} onClick={this.navTapHandler} nav-num="0"><img src={MapLogo} alt="" className="navImage"></img></div>
        <div className={navShop} onClick={this.navTapHandler} nav-num="1"><img src={ShopLogo} alt="" className="navImage"></img></div>
        <div className={navMyPage} onClick={this.navTapHandler} nav-num="2"><img src={MyPageLogo} alt="" className="navImage"></img></div>
      </footer>
    )
  }
}

export default App;