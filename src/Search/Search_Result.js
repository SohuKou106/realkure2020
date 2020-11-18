import React from 'react'
import noimage from '../images/noimage.png'
import back from '../images/back.png'
import './Search.css'
import '../Shop/Shop.css'
import '../Favorite/Favorite.css'
import {Search} from './Search'
import {l} from '../Language'
import {langNum} from '../MyPage'
import {ShopDetail} from '../Shop/ShopDetail'

export class Search_Result extends React.Component{
    constructor(props){
        super(props)
        this.state = {            
            shop_list: []
        }
        this.props.mapStatus
        this.props.search_res
        this.props.type
        this.props.shopLocate
        this.props.movePage(this.state)
        this.props.before_page
    }

    backPage(){      
      this.props.movePage({Component: Search})
    }

    shopDetail (e) { 
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
      this.props.before_page.set("Search_Result")
      this.props.movePage({shop_data: shop_data, Component: ShopDetail})
    }

    render(){
        var reslist = this.props.search_res.slice()

        var list = reslist.map(shop =>{
          return (
            <div key={`${shop.id}`} className="shop_Element" onClick={() => this.shopDetail(shop)}>
              <div className="shop_ImgField"><img src={'./images/stores/' + `${shop.id}` + '.jpg'} className="shop_Image" onError={e => e.target.src = noimage} /></div>
              <div className="shop_Name" onClick={() => this.shopDetail(shop)}>{shop.name}</div>
              <div className="shop_Detail" onClick={() => this.shopDetail(shop)}>{l[langNum].viewDetail}</div>
            </div>
            )
        })

        var noResText

        if(list.length === 0){
          noResText = <div>{l[langNum].nores}</div>
        }
        
        return(
            <div id='container'>
                <div className="backbtn">
                    <div type="button" name="back" onClick={this.backPage.bind(this)}><img src={back} alt="" className="navImage"/></div>
                </div>
                <div className="search_MenuText">{l[langNum].sResult + " : " + this.props.mapStatus.searchtext}</div>
                {noResText}
                <div className="content_List">
                  <div className="fav_List">
                    {list}
                  </div>
                </div>
            </div>
        )
    }
}