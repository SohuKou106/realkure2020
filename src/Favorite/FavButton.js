import React from 'react'
import classNames from 'classnames'
import Cookies from 'js-cookie'
import {l} from '../Language'
import {langNum} from '../MyPage'
import './Favorite.css'
import { CullFaceFront } from 'three'

export class FavButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
        this.bindfavClicked = this.favClicked.bind(this)
        this.props.favChange(this.state)
        this.props.datas
        this.props.shopId
        this.props.favId
        this.props.page
    }

    //**** ボタンクリック時 **** 
    favClicked (e) {
        var id = this.props.favId.fId
        var selectid = e.currentTarget.getAttribute('btn-id')   //クリックされたお店の名前を取得
        const check = id.filter(value =>  value == selectid)    //お気に入りリストにすでにないかチェック (=== : 型を考慮した等価演算子)
        //お気に入りに登録
        if(check.length <= 0){          //被りがなかったら
            id.push(e.currentTarget.getAttribute('btn-id'))
        }
        //お気に入りから削除
        else {
            id.map((id_, index) => {
                if(id_ == selectid){                    
                    id.splice(index, 1)
                }
            })
        }
        this.props.favId.set(id)
        this.props.favChange({favChanged: true})
        var ids = this.props.favId.fId.slice()
        var cookie_id = ""
        for(var index in ids){
            cookie_id += ids[index] + "-"
        }
        cookie_id = cookie_id.slice(0, -1)
        Cookies.set('favId', cookie_id)
    }

    render(){
        var shopId = this.props.shopId
        var button 
        var id = this.props.favId.fId
        
        var addButton = classNames({'fav_AddButton_L': (this.props.page === 'LMap')}, {'fav_AddButton_D': (this.props.page === 'ShopDetail')})
        var removeButton = classNames({'fav_RemoveButton_L': (this.props.page === 'LMap')}, {'fav_RemoveButton_D': (this.props.page === 'ShopDetail')})
    
        const dupCheck = id.filter(value => value == shopId)    //お気に入りリストにすでにないかチェック (=== : 型を考慮した等価演算子)
        if(dupCheck.length <= 0) {          //被りがなかったら           
            button = <button className={addButton}
                             onClick={this.bindfavClicked}
                             btn-id={shopId}>{l[langNum].fav}</button>  
        }
        else {           
            button = <button className={removeButton}
                             onClick={this.bindfavClicked}
                             btn-id={shopId}>{l[langNum].rem}</button>
        }

        return (            
            button
        )        
    }
}