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
        this.props.search_res
        this.props.type
        this.props.shopLocate
        this.props.movePage(this.state)
        this.props.before_page
    }

    backPage(){      
      this.props.movePage({Component: Search})
    }

    shopPosition (e) { 
      const shop_data = {
        lat: Number(e.currentTarget.getAttribute('lat')),
        lng: Number(e.currentTarget.getAttribute('lng')),
        id: Number(e.currentTarget.getAttribute('id')),
        name: e.currentTarget.getAttribute('name'),
        address1: e.currentTarget.getAttribute('address1'),
        address2: e.currentTarget.getAttribute('address2'),
        intro: e.currentTarget.getAttribute('intro'),
        tag1: e.currentTarget.getAttribute('tag1'),
        tag2: e.currentTarget.getAttribute('tag2'),
        tag3: e.currentTarget.getAttribute('tag3'),
        week: e.currentTarget.getAttribute('week'),
        holi: e.currentTarget.getAttribute('holi'),
        reg_holi: e.currentTarget.getAttribute('reg_holi'),
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
                <div className="search_MenuText">{l[langNum].sResult}</div>
                {noResText}
                <div className="fav_List">
                  {list}
                </div>
            </div>
        )
    }
}