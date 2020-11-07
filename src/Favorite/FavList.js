import React from 'react'
import '../Shop/Shop.css'
import './Favorite.css'
import {l} from '../Language'
import request from 'superagent'
import noimage from '../images/noimage.png'
import back from '../images/back.png'
import { MyPage, langNum } from '../MyPage'
import { ShopDetail } from '../Shop/ShopDetail'

export class FavList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          shop_data: []
        }
        this.props.favId
    }

    componentWillMount(){
      if(langNum == 0){
        request
        .get('/api/data_ja')
        .accept('application/json')
        .end((err, res) => {
          if (err) return
          this.setState({shop_data: res.body.content})
        })
      }
      else if(langNum == 1){
        request
        .get('/api/data_en')
        .accept('application/json')
        .end((err, res) => {
          if (err) return
          this.setState({shop_data: res.body.content})
        })
      }
    }

    backPage(){
      this.props.movePage({Component: MyPage})
    }

    shopDetail (shop) {
      const shop_data = {
        lat: shop.latitude,
        lng: shop.longitude,
        id: shop.id,
        name: shop.name,
        address1: shop.address1,
        address2: shop.address2,
        intro: shop.intro,
        tag1: shop.tag1,
        tag2: shop.tag2,
        tag3: shop.tag3,
        week: shop.hours_weekday,
        holi: shop.hours_holiday,
        reg_holi: shop.regular_holiday,
      }
      this.props.before_page.set("FavList")
      this.props.movePage({shop_data: shop_data, Component: ShopDetail})
    }

    render(){
      var all_Shops = this.state.shop_data.slice()  //全てのお店データ
      var faved_Shops = new Array()
      if(all_Shops.length > 0){
        for(var i = 0; i < this.props.favId.fId.length; i++){
          for(var j = 0; j < all_Shops.length; j++){
            if(all_Shops[j].id == this.props.favId.fId[i]){
              faved_Shops.push(all_Shops[j])
            }            
          }
        }
      }

      const shop_list = faved_Shops.map(shop => {
          return(
            <div key={`${shop.id}`} className="shop_Element" onClick={() => this.shopDetail(shop)}>
              <div className="shop_ImgField"><img src={'./images/stores/' + `${shop.id}` + '.jpg'} className="shop_Image" onError={e => e.target.src = noimage} /></div>
              <div className="shop_Name" onClick={() => this.shopDetail(shop)}>{shop.name}</div>
              <div className="shop_Detail" onClick={() => this.shopDetail(shop)}>{l[langNum].viewDetail}</div>
            </div>
          )        
      })
      var noFavText

      if(this.props.favId.fId.length === 0){
        noFavText = <div>{l[langNum].nofavs}</div>
      }
      
      return(
          <div id='container'>
            <div className="backbtn">
              <div type="button" name="back" onClick={this.backPage.bind(this)}><img src={back} alt="" className="navImage"/></div>
            </div>     
            <div className='content_List'>
              <div className='fav_Text'>
                {l[langNum].favShops}
              </div>
              {noFavText}
              <div className='fav_List'>
                {shop_list}
              </div>
            </div>
          </div>
        )            
    }
}