import React from 'react'
import classNames from 'classnames'
import request from 'superagent'
import noimage from '../images/noimage.png'
import './Shop.css'
import {langNum} from '../MyPage'
import {Search} from '../Search/Search'
import {l} from '../Language'
import search from '../images/search.png'
import { TrianglesDrawMode } from 'three'
import { ShopDetail } from './ShopDetail'

export class Shop extends React.Component {
  constructor (props) {
    super(props)
    this.shopTabTapHandler = this.shopTabTapHandler.bind(this)
    this.state = {
      nav: [true, false, false, false, false],
      shop_list: []
    }
    this.props.movePage(this.state)
    this.props.before_page
    this.props.firebaseRef
    this.props.posts
    this.props.loading
  }
  componentWillMount () {
    if(langNum == 0){
      request
      .get('/api/restaurant_ja')
      .accept('application/json')
      .end((err, res) => {
        if (err) return
        this.setState({shop_list: res.body.content})
      })
    }
    else if(langNum == 1){
      request
      .get('/api/restaurant_en')
      .accept('application/json')
      .end((err, res) => {
        if (err) return
        this.setState({shop_list: res.body.content})
      })
    }
  }
  
  shopDetail (e) {
    console.log("Shop")
    console.log(e)
    const shop_data = {
      lat: e.latitude,
      lng: e.longitude,
      id: e.id,
      name: e.name,
      address1: e.address1,
      address2: e.address2,
      intro: e.intro,
      tag1: e.tag1,
      tag2: e.tag2,
      tag3: e.tag3,
      week: e.hours_weekday,
      holi: e.hours_holiday,
      reg_holi: e.regular_holiday,
    }
    //console.log(shop_data)    
    this.props.before_page.set("Shop")
    this.props.movePage({shop_data: shop_data, Component: ShopDetail})
  }

  shopTabTapHandler (e) {
    const navCopy = this.state.nav.slice()
    const k = Number(e.currentTarget.getAttribute('nav-num'))
    for (var i = 0; i < 5; i++) {
      if (i === k) {
        navCopy[i] = true
      } else {
        navCopy[i] = false
      }
    }
    this.setState({nav: navCopy, shop_list: []})
    if(langNum == 0){
      switch (k) {
        case 0:
          request
            .get('/api/restaurant_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 1:
          request
            .get('/api/cafe_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 2:
          request
            .get('/api/tavern_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 3:
          request
            .get('/api/hotel_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 4:
          request
            .get('/api/other_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        default:
          request
            .get('/api/restaurant_ja')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
      }
    }
    else if(langNum == 1){
      switch (k) {
        case 0:
          request
            .get('/api/restaurant_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 1:
          request
            .get('/api/cafe_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 2:
          request
            .get('/api/tavern_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 3:
          request
            .get('/api/hotel_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        case 4:
          request
            .get('/api/other_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
        default:
          request
            .get('/api/restaurant_en')
            .accept('application/json')
            .end((err, res) => {
              if (err) return
              this.setState({shop_list: res.body.content})
            })
          break;
      }
    }
  }

  movePage (){
    this.props.before_page.set("Shop")
    this.props.movePage({Component: Search})
  }

  render () {
    if(this.props.loading !== null){
      console.log(this.props.posts)
    }
    var Restaurant = classNames({'shop-Current': this.state.nav[0]}, {'shop-None': !this.state.nav[0]})
    var Cafe = classNames({'shop-Current': this.state.nav[1]}, {'shop-None': !this.state.nav[1]})
    var Tavern = classNames({'shop-Current': this.state.nav[2]}, {'shop-None': !this.state.nav[2]})
    var Hotel = classNames({'shop-Current': this.state.nav[3]}, {'shop-None': !this.state.nav[3]})
    var Other = classNames({'shop-Current': this.state.nav[4]}, {'shop-None': !this.state.nav[4]})

    const shop_list = this.state.shop_list.map(e => {
      var tag1 = null, tag2 = null, tag3 = null
      tag1 = <span className="shop_Tag">{"#" + e.tag1}</span>
      if(e.tag2 != null) tag2 = <span className="shop_Tag">{"#" + e.tag2}</span>
      if(e.tag3 != null) tag3 = <span className="shop_Tag">{"#" + e.tag3}</span>
      return (
        <div key={`${e.id}`} className="shop_Element" onClick={() => this.shopDetail(e)}>
          <div className="shop_ImgField"><img src={'./images/stores/' + `${e.id}` + '.jpg'} className="shop_Image" onError={e => e.target.src = noimage}/></div>
          <div className="shop_Name" onClick={() => this.shopDetail(e)}>{e.name}</div>   
          <div className="shop_Detail" onClick={() => this.shopDetail(e)}>{l[langNum].viewDetail}</div>
        </div>
      )
    })

    return(
      <div id='container'>        
        <div className='menubtn' onClick={this.searchBarSubmitHandler}>
          <div type="button" name="search" onClick={this.movePage.bind(this)}><img src={search} alt="" className="navImage"/></div>          
        </div>
        <div className='shop_Tab'>
          <div className={Restaurant} onClick={this.shopTabTapHandler} nav-num="0">{l[langNum].restaurant}</div>
          <div className={Cafe} onClick={this.shopTabTapHandler} nav-num="1">{l[langNum].cafe}</div>
          <div className={Tavern} onClick={this.shopTabTapHandler} nav-num="2">{l[langNum].bar}</div>
          <div className={Hotel} onClick={this.shopTabTapHandler} nav-num="3">{l[langNum].hotel}</div>
          <div className={Other} onClick={this.shopTabTapHandler} nav-num="4">{l[langNum].other}</div>
        </div>
        <div className='shop_List'>
          {shop_list}
        </div>
      </div>
    )
  }
}