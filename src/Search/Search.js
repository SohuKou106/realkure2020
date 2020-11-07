import React from 'react'
import request from 'superagent'
import noimage from '../images/noimage.png' 
import back from '../images/back.png'
import './Search.css'
import '../Shop/Shop.css'
import {Search_Radio} from './Search_Radio'
import {l} from '../Language'
import {langNum} from '../MyPage'
import {ShopDetail} from '../Shop/ShopDetail'
import {Search_Result} from './Search_Result'

export class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            radioChecked: false,
            shop_list: [],
            res_list: [],
            cafe_list: [],
            bar_list: [],
            res:[],
            searchTextButton : <button className="search_TextSearchBtn" disabled>{l[langNum].search}</button>,
            searchText: null,
        }
        this.props.movePage(this.state)
        this.props.favId
        this.props.before_page
    }

    //最初に非同期通信を行う時は，componentDidMountにした方が良い
    //(componentWillMountだと，render()が呼び出される前に通信が完了するとは限らないため)
    componentDidMount (){  
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

    backPage (e){
      this.props.before_page.backPage()
      //this.props.movePage({Component: this.props.before_page.page})
    }

    textChanged(e){
      var btn
      if(e.target.value){
        btn = <button className="search_TextSearchBtn" onClick={this.searchWithText.bind(this)}>{l[langNum].search}</button>
      }
      else{
        btn = <button className="search_TextSearchBtn" disabled>{l[langNum].search}</button>
      }
      this.setState({searchTextButton: btn, searchText: e.target.value})
    }

    searchWithText(e) {
      var searchText = this.state.searchText
      var shop_list = this.state.shop_list.slice()
      var search_res = shop_list.filter(shop => {
        if(shop.name.indexOf(searchText) != -1){
          return shop
        }
      })
      this.props.movePage({Component: Search_Result, search_res: search_res, type:"Text"})
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
      this.props.before_page.set("Search")
      this.props.movePage({shop_data: shop_data, Component: ShopDetail})
    }

    render(){
        var searchTextButton = this.state.searchTextButton

        var searchRadioBox = <Search_Radio movePage={this.props.movePage.bind(this)} shop_list={this.state.shop_list}/>

        var shoplist = this.state.shop_list.slice()
        var recshopList
        var random = Math.random()
        //非同期通信が完了していない場合おすすめリストは表示しないようにする
        if(shoplist.length > 0){
          var recList = []
          
          var favList = this.props.favId.fId.slice()
          var favShopList = []
          var rest_num = 0, cafe_num = 0, bar_num = 0
          //お気に入りに登録しているお店があるなら
          if(favList.length !== 0){
            //rest,cafe,barのみお店情報を取得(hotel, otherはスルー)
            for(var id in favList){
              if(Number(favList[id]) < 10000){
                var shop = shoplist.filter(shop => {
                  return shop.id === Number(favList[id])
                })
                favShopList.push(shop[0])
              }
            }
            //お気に入りリストにrest,cafe,barがあれば
            if(favShopList.length !== 0){
              //ジャンルごとにお店の一覧を取得しておく
              var rest_list = shoplist.filter(shop => {
                return shop.genre === "食事"
              })
              var cafe_list = shoplist.filter(shop => {
                return shop.genre === "カフェ"
              })
              var bar_list = shoplist.filter(shop => {
                return shop.genre === "居酒屋"
              })
              console.log(rest_list)
              console.log(cafe_list)
              console.log(bar_list)

              //rest,cafe,barそれぞれでお気に入りに登録してある店の数を数える
              for(var shop in favShopList){
                console.log(favShopList[shop].genre)
                switch(favShopList[shop].genre){
                  case "食事":
                    rest_num++;
                    break;
                  case "カフェ":
                    cafe_num++;
                    break;
                  case "居酒屋":
                    bar_num++;
                    break;
                }
              }
              console.log(rest_num)
              console.log(cafe_num)
              console.log(bar_num)

              //4つピックアップ
              if(rest_num == cafe_num && cafe_num == bar_num){
                console.log("random")
                recList.push(shoplist[Math.round(Math.random() * 143) + 34])
                recList.push(shoplist[Math.round(Math.random() * 143) + 34])
                recList.push(shoplist[Math.round(Math.random() * 143) + 34])
                recList.push(shoplist[Math.round(Math.random() * 143) + 34])
              }
              //rest & cafe
              else if(rest_num == cafe_num && rest_num > bar_num){
                console.log("rest & cafe")
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
              }
              //rest & bar
              else if(rest_num == bar_num && rest_num > cafe_num){
                console.log("rest & bar")
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
              }
              //cafe & bar
              else if(cafe_num == bar_num && cafe_num > rest_num){
                console.log("cafe & bar")
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
              }
              //rest
              else if(rest_num > cafe_num && rest_num > bar_num){
                console.log("rest")
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
                recList.push(rest_list[Math.round(Math.random() * (rest_list.length - 1))])
              }
              //cafe
              else if(cafe_num > rest_num && cafe_num > bar_num){
                console.log("cafe")
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
                recList.push(cafe_list[Math.round(Math.random() * (cafe_list.length - 1))])
              }
              //bar
              else if(bar_num > rest_num && bar_num > cafe_num){
                console.log("bar")
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
                recList.push(bar_list[Math.round(Math.random() * (bar_list.length - 1))])
              }
            }
            //お気に入りリストにrest,cafe,barがなければ
            else{
              console.log("random")
              recList.push(shoplist[Math.round(Math.random() * 143) + 34])
              recList.push(shoplist[Math.round(Math.random() * 143) + 34])
              recList.push(shoplist[Math.round(Math.random() * 143) + 34])
              recList.push(shoplist[Math.round(Math.random() * 143) + 34])
            }
          }
          //各ジャンル（hotel, other以外）の個数を取得
          //1番多いものから3つ，2番目に多いものから1つランダムにピックアップ
          //ただし3つのうちジャンルが1種類しかなかったらその中から4つピックアップする

          //お気に入りに登録しているお店がないもしくはhotel, otherしかお気に入りに入れていなかったら
          //ランダムにお店を4つピックアップ
          else{
            recList.push(shoplist[Math.round(Math.random() * 143) + 34])
            recList.push(shoplist[Math.round(Math.random() * 143) + 34])
            recList.push(shoplist[Math.round(Math.random() * 143) + 34])
            recList.push(shoplist[Math.round(Math.random() * 143) + 34])            
          }
          console.log(favShopList)
          //recList.push(shoplist[0])
          //recList.push(shoplist[1])
          //recList.push(shoplist[2])
          //recList.push(shoplist[3])
          
          recshopList = recList.map(e => {
            var tag1 = null, tag2 = null, tag3 = null
            tag1 = <span className="shop_Tag">{"#" + e.tag1}</span>
            if(e.tag2 != null) tag2 = <span className="shop_Tag">{"#" + e.tag2}</span>
            if(e.tag3 != null) tag3 = <span className="shop_Tag">{"#" + e.tag3}</span>

            return (
              <div key={`${e.id}`} className="shop_Element" onClick={() => this.shopDetail(e)}>
                <div className="shop_ImgField"><img src={'./images/stores/' + `${e.id}` + '.jpg'} className="shop_Image" onError={e => e.target.src = noimage} /></div>
                <div className="shop_Name" onClick={() => this.shopDetail(e)}>{e.name}</div>
                <div className="shop_Detail" onClick={() => this.shopDetail(e)}>{l[langNum].viewDetail}</div>
              </div>
            )
          })
        }
        
        return (            
            <div id='container' className="content_List">
                <div className="backbtn">
                  <div type="button" name="back" onClick={this.backPage.bind(this)}><img src={back} alt="" className="navImage"/></div>
                </div>
                <div className="search_MenuText">{l[langNum].sByText}</div>
                <div className="search_Form">
                  <input type="text" id="search_Text" placeholder={l[langNum].search} className="search_TextBox" onKeyUp={this.textChanged.bind(this)}/>
                  {searchTextButton}
                </div>
                <div className="search_MenuText">{l[langNum].sByHash}</div>
                {searchRadioBox}
                <div className="search_MenuText">{l[langNum].sByRec}</div>
                <div className='search_RecList'>
                  {recshopList}
                </div>
            </div>
        )
    }
}