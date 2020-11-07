import React from 'react'
import { Map, Marker, Popup, TileLayer, Rectangle } from 'react-leaflet'
import './leaflet.css'
import CameraLogo from './images/camera.png'
import MenuLogo from './images/menu.png'
import './LMap.css'
import './leaflet-routing-machine.css'
import Routing from './RoutingMachine'
import Routing2 from './RoutingMachine2'
import noimage from './images/noimage.png'
import request from 'superagent'
import {SideBar} from './SideBar'
import {FavButton} from './Favorite/FavButton'
import {l} from './Language'
import {langNum} from './MyPage'
import {Search} from './Search/Search'
import {ShopDetail} from './Shop/ShopDetail'
import search from './images/search.png'

//import '@babel/polyfill';

//Leaflet.Icon.Default.imagePath =
  //"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/";

export class LMap extends React.Component { 
  constructor (props) {
    super(props)
    this.state = {
      position: [34.244659, 132.557402], zoom: 15, mobile_lat: null, mobile_lng: null,
      rectangle: [[34.194218, 132.495934], [34.268731, 132.651786]],
      route1: [
        [34.244798, 132.557611],
        [34.242135,	132.55538],
        [34.241212, 132.555849],
        [34.241557, 132.557417],
        [34.240356, 132.563925],
        [34.23694, 132.560114],
        [34.23242, 132.56245],
        [34.226287,	132.551026],
        [34.243057, 132.560435],
        [34.243225, 132.558662]
      ],
      route2: [
        [34.244798, 132.557611],
        [34.24346, 132.564575],
        [34.244911, 132.562928],
        [34.24624, 132.565571],
        [34.245107, 132.565012],
        [34.24397, 132.564987],
        [34.243609, 132.564175],
        [34.24346, 132.564575]
      ],
      route5: [
        [34.244798, 132.557611],
        [34.244657, 132.568804],
        [34.244015, 132.563857],
        [34.243609, 132.564175],
        [34.245759, 132.564613],
        [34.244779, 132.564183],
        [34.244657, 132.568804]
      ],
      shop_list: [],
      checked: [true, true, true, true, true],
      menuShow: false,
      favChanged: false,
      root: null,        
    }
    this.props.shop_data
    this.props.favId
    this.props.mapStatus
    this.props.movePage(this.state)
    this.props.before_page
    this.getCurrentPosition = this.getCurrentPosition.bind(this)
    this.mobilePosition = this.mobilePosition.bind(this)
    this.bindmenuClicked = this.menuClicked.bind(this)
    this.bindshowRoot = this.showRoot.bind(this)    
  }  

  //App.jsで実装するHome画面から画面そのものであるComponentを切り替えることでページ切り替えを実現
  //それぞれの画面の初期化などは，各スクリプトのcomponentWillMountで行っている
  componentWillMount () {
    if (navigator.geolocation) {
      //this.getCurrentPosition();
      setInterval(this.getCurrentPosition, 5000000000000)//5000
    }
    var lat = 34.231288
    var lng = 132.603037
    this.setState({position: this.props.mapStatus.center, 
                   zoom: this.props.mapStatus.zoom,
                   checked: this.props.mapStatus.checked})
      
    if(langNum == 0){
      request
      .get('/api/data_ja')
      .accept('application/json')
      .end((err, res) => {
        if (err) return
        this.setState({shop_list: res.body.content})
      })
    }
    else if(langNum == 1){
      request
      .get('/api/data_en')
      .accept('application/json')
      .end((err, res) => {
        if (err) return
        this.setState({shop_list: res.body.content})
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.getCurrentPosition) 
  }

  getCurrentPosition () {
    //Safariはhttps接続でないと，位置情報を取得できない
    //latとlngがnullのままなので，マーカーが表示されない
    navigator.geolocation.getCurrentPosition(
      this.mobilePosition
    )
  }

  mobilePosition (position) {
    var data = position.coords
    //var lat = data.latitude
    //var lng = data.longitude
    lat = 34.231288
    lng = 132.603037
    this.setState({mobile_lat: lat, mobile_lng: lng}) 
  }

  //サイドバー表示ボタンが押されたら呼び出される
  menuClicked () {
    if(this.state.menuShow == false){
      this.setState({menuShow:true})
    }
    else{
      this.setState({menuShow:false})
    }
  }

  //サイドバーのチェックボタンが変更されたら呼び出される
  updateCheck(checked_Copy){
    if(checked_Copy.length > 0){
      this.props.mapStatus.set(this.state.position, this.state.zoom, checked_Copy)
      this.setState({checked:checked_Copy})
    }    
  }

  //ポップアップのお気に入りボタンが押されたら呼び出される
  favChange(state){
    this.setState(state)
  }

  //ポップアップの経路表示ボタンが押されたら呼び出される
  showRoot(marker){
    var shopRouting = 
      <Routing map={this.refs.map}
               //from={[this.state.mobile_lat, this.state.mobile_lng]}
               from={[34.244798, 132.557611]}
               to={[marker.lat, marker.lng]}
               id={marker.id}>
      </Routing>
      this.setState({root: shopRouting})
  }

  //ポップアップの画像がタップされた時に詳細ページに移動
  moveShopDetail(marker){
    const shop_data = {
      lat: marker.lat,
      lng: marker.lng,
      id: marker.id,
      name: marker.name,
      address1: marker.address1,
      address2: marker.address2,
      intro: marker.intro,
      tag1: marker.tag1,
      tag2: marker.tag2,
      tag3: marker.tag3,
      week: marker.week,
      holi: marker.holi,
      reg_holi: marker.reg_holi
    }
    this.props.mapStatus.set(this.state.position, this.state.zoom, this.state.checked)
    this.props.before_page.set("LMap")
    this.props.movePage({shop_data: shop_data, Component: ShopDetail})
  }

  zoomEnd(e){ 
    var zoom = e.target.getZoom()
    this.setState({zoom: zoom})
    console.log("zoom Ended, zoom : " + zoom)
  }

  dragEnd(e){
    var center = e.target.getCenter()
    this.setState({position: center})
    console.log("drag Ended, position : " + center)
  }

  movePage (){
    this.props.mapStatus.set(this.state.position, this.state.zoom, this.state.checked)
    this.props.before_page.set("LMap")
    this.props.movePage({Component: Search})
  }

  render () {
    var Marker1, Marker2

    var shopRouting = this.state.root

    //デフォルトで表示されてるマーカー
    var markers_rest = new Array()
    var markers_cafe = new Array()
    var markers_bar = new Array()
    var markers_hotel = new Array()
    var markers_other = new Array()

    var shoplist = this.state.shop_list.slice()

    shoplist.forEach(function(shop,index) {
      var m = {
        title: shop.name,
        lat: shop.latitude,
        lng: shop.longitude,
        img: './images/stores/' + `${shop.id}` + '.jpg',
        name: shop.name,
        address1: shop.address1,
        address2: shop.address2,
        intro: shop.intro,
        id: shop.id,
        tag1: shop.tag1,
        tag2: shop.tag2,
        tag3: shop.tag3,
        week: shop.hours_weekday,
        holi: shop.hours_holiday,
        reg_holi: shop.regular_holiday,
      }

      switch(shop.genre){
        case "食事":
            markers_rest.push(m)
          break
        case "カフェ":
            markers_cafe.push(m)
          break
        case "居酒屋":
            markers_bar.push(m)
          break
        case "宿泊":
            markers_hotel.push(m)
          break
        case "その他":
            markers_other.push(m)
          break
      }
    })

    //サイドバーのオンオフを切り替えるボタン
    var searchButton = <div type="button" name="search" onClick={this.movePage.bind(this)}><img src={search} alt="" className="navImage"/></div>

    //サイドバーを表示するかどうか決める
    var sidebar    
    if(this.state.menuShow == true){
      sidebar = <SideBar updateCheck={this.updateCheck.bind(this)} checked={this.state.checked}/>
    }
    else{
      sidebar = null
    }

    //サイドバーで非表示にするジャンルがあったらそのmarkersを空にする
    if(this.props.mapStatus.checked[0] == false) markers_rest = []
    if(this.props.mapStatus.checked[1] == false) markers_cafe = []
    if(this.props.mapStatus.checked[2] == false) markers_bar = []
    if(this.props.mapStatus.checked[3] == false) markers_hotel = []
    if(this.props.mapStatus.checked[4] == false) markers_other = []

    //Shopタブ，検索結果，お気に入りリストでお店の項目をタップしたときにLMapに遷移して表示するポップアップ
    var shopClickedPopup

    if(this.props.shop_data != null){
      if(this.props.shop_data.lat != null && this.props.shop_data.lng != null){
        if(this.props.shop_data.tag2 != null){
          if(this.props.shop_data.tag3 != null){
            var tag = "#" + this.props.shop_data.tag1 + "  #" + this.props.shop_data.tag2 + "  #" + this.props.shop_data.tag3    
          }
          else{
            var tag = "#" + this.props.shop_data.tag1 + "  #" + this.props.shop_data.tag2
          }  
        }
        else{
          var tag = "#" + this.props.shop_data.tag1
        }
        
        //FavButtonの下
        //<button onClick={this.showRoot.bind(this, {coordinates:{lat:this.props.shop_data.lat, lng:this.props.shop_data.lng}, id:this.props.shop_data.id})} className="map_RootButton">{l[langNum].showRoot}</button>
        shopClickedPopup =       
        <Popup position={[this.props.shop_data.lat, this.props.shop_data.lng]}>          
          <div className='popup_ImgField'>
            <div className='popup_Name'>{this.props.shop_data.name}</div>
            <div className='popup_Tag'>{tag}</div>
            <img src={'./images/stores/' + `${this.props.shop_data.id}` + '.jpg'} className='popup_Image' onClick={() => this.moveShopDetail(this.props.shop_data)} onError={e => e.target.src = noimage} />            
            <div>
              <FavButton favChange={this.favChange.bind(this)} shopId={this.props.shop_data.id} favId={this.props.favId} page='LMap'/>
            </div>
          </div>          
        </Popup>
      }
    }

    //FavButtonの下
    //<button onClick={this.showRoot.bind(this, marker)} className="map_RootButton">{l[langNum].showRoot}</button>
    return (
      <div id='container'>
        <div className="menubtn">{searchButton}</div>
        <div className='sideBar'>{sidebar}</div>
        <Map ref='map'
             onzoomend={this.zoomEnd.bind(this)}
             ondragend={this.dragEnd.bind(this)}
             center={this.props.mapStatus.center} zoom={this.props.mapStatus.zoom} minZoom={14} maxZoom={18} maxBounds={this.state.rectangle}>                    
          {Marker1}
          {Marker2}
          {shopRouting}
          <TileLayer
            url="maptiles/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://www.thunderforest.com/transport/&quot;>Gravitystorm</a> / map data <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {markers_rest.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={restaurantPoint}>
             <Popup>          
              <div className='popup_ImgField'>
                <div className='popup_Name'>{marker.name}</div>
                <div className='popup_Tag'>{tag}</div>
                <img src={marker.img} className='popup_Image' onClick={() => this.moveShopDetail(marker)} onError={e => e.target.src = noimage} />            
                <div>
                  <FavButton favChange={this.favChange.bind(this)}
                             shopId={marker.id}
                             favId={this.props.favId}
                             page='LMap'/>
                </div>
              </div>          
            </Popup>
          </Marker>
          ))}         

          {markers_cafe.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={cafePoint}>
              <Popup>          
                <div className='popup_ImgField'>
                  <div className='popup_Name'>{marker.name}</div>
                  <div className='popup_Tag'>{tag}</div>
                  <img src={marker.img} className='popup_Image' onClick={() => this.moveShopDetail(marker)} onError={e => e.target.src = noimage} />            
                  <div>
                  <FavButton favChange={this.favChange.bind(this)}
                             shopId={marker.id}
                             favId={this.props.favId}
                             page='LMap'/>
                  </div>
                </div>          
              </Popup>
            </Marker>
          ))}    

          {markers_bar.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={barPoint}>
              <Popup>          
                <div className='popup_ImgField'>
                  <div className='popup_Name'>{marker.name}</div>
                  <div className='popup_Tag'>{tag}</div>
                  <img src={marker.img} className='popup_Image' onClick={() => this.moveShopDetail(marker)} onError={e => e.target.src = noimage} />            
                  <div>
                  <FavButton favChange={this.favChange.bind(this)}
                             shopId={marker.id}
                             favId={this.props.favId}
                             page='LMap'/>
                  </div>
                </div>          
              </Popup>
            </Marker>
          ))}

          {markers_hotel.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={hotelPoint}>
              <Popup>          
                <div className='popup_ImgField'>
                  <div className='popup_Name'>{marker.name}</div>
                  <div className='popup_Tag'>{tag}</div>
                  <img src={marker.img} className='popup_Image' onClick={() => this.moveShopDetail(marker)} onError={e => e.target.src = noimage} />            
                  <div>
                    <FavButton favChange={this.favChange.bind(this)}
                               shopId={marker.id}
                               favId={this.props.favId}
                               page='LMap'/>
                  </div>
                </div>          
              </Popup>
            </Marker>
          ))}

          {markers_other.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={otherPoint}>
              <Popup>          
                <div className='popup_ImgField'>
                  <div className='popup_Name'>{marker.name}</div>
                  <div className='popup_Tag'>{tag}</div>
                  <img src={marker.img} className='popup_Image' onClick={() => this.moveShopDetail(marker)} onError={e => e.target.src = noimage} />            
                  <div>
                  <FavButton favChange={this.favChange.bind(this)}
                             shopId={marker.id}
                             favId={this.props.favId}
                             page='LMap'/>
                  </div>
                </div>          
              </Popup>
            </Marker>
          ))}
          {shopClickedPopup}
        </Map> 
        <div className='map_navCamera' onClick={this.bindmenuClicked}><img src={MenuLogo} alt="" className="map_navCameraImage"></img></div>
      </div>
    )
  }
}

export const mobilePoint = new L.Icon({
  iconUrl: require('./assets/mobileIcon.png'),
  iconRetinaUrl: require('./assets/mobileIcon.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})

export const restaurantPoint = new L.Icon({
  iconUrl: require('./assets/rest.png'),
  iconRetinaUrl: require('./assets/rest.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})

export const cafePoint = new L.Icon({
  iconUrl: require('./assets/cafe.png'),
  iconRetinaUrl: require('./assets/cafe.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})

export const barPoint = new L.Icon({
  iconUrl: require('./assets/bar_3.png'),
  iconRetinaUrl: require('./assets/bar_3.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})

export const hotelPoint = new L.Icon({
  iconUrl: require('./assets/hotel.png'),
  iconRetinaUrl: require('./assets/hotel.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})

export const otherPoint = new L.Icon({
  iconUrl: require('./assets/other_2.png'),
  iconRetinaUrl: require('./assets/other_2.png'),
  iconAnchor: [10, 10],
  popupAnchor: [0, 10],
  iconSize: [20, 20],
  shadowUrl: require('./assets/marker-shadow.png'),
  shadowSize: [30, 30],
  shadowAnchor: [10, 15],
})