import React from 'react'
import './Search.css'
import {l, radio_lng} from '../Language'
import {langNum} from '../MyPage'
import {Search_Result} from './Search_Result'

export class Search_Radio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            radioCheck : []
        }
        this.props.mapStatus
        this.props.movePage(this.state)
        this.props.shop_list
    }

    componentWillMount(){
        //ハッシュタグの数分の要素数を持つradioCheckを作っておく
        var radio_langs = radio_lng[langNum]
        var radio_Check = []
        for(var name in radio_langs){
            radio_Check.push(false)
        }
        this.setState({radioCheck : radio_Check})
    }

    updateRadioState(e){
        //押されたボタンの箇所をTrueにしておく
        var check = this.state.radioCheck
        const k = e.currentTarget.getAttribute("radio-num")
        check[k] = !check[k]

        this.setState({radioCheck : check})
    }

    searchWithRadio(e) {
        var check = this.state.radioCheck
        //チェックされているタグを確認
        var tags = []        
        for(var num in check){
            if(check[num] == true){
                tags.push(radio_lng[langNum][num])
            }
        }        
        console.log(tags)
        //チェックされているタグから検索する
        var shop_list = this.props.shop_list
        console.log(shop_list)        
        var search_res = shop_list.filter(shop => {            
            for(var num in tags){
                if(shop.tag1 == tags[num] || shop.tag2 == tags[num] || shop.tag3 == tags[num]){
                    return shop
                }
            }
        })        
        
        var text = ""
        for(var tag in tags){
            text += " #" + tags[tag]
        }
        this.props.mapStatus.setText(text)
        this.props.movePage({Component: Search_Result, search_res: search_res, type:"Tag"})
    }

    render(){
        const styles = {
            tagBox: {
                border: "solid",
                borderColor: '#75BAD0',
                borderWidth: '3px',
                backgroundColor: '#FFFFFF',
                padding: '0px 0',
                margin: '5px 30px',
                boxShadow: '2px 2px #CCCCCC',
            },
            translateRadio: {
                margin: '10px',
                fontSize: '3vw',
            }
        }

        var radio_langs = radio_lng[langNum]  //ハッシュタグボタンのテキスト
        var radioButtons = []   //作成したボタンを入れておく配列

        var existCheckedRadio = false   //チェックされているボタンがあるか？
        var i = 0

        for(var name in radio_langs){
            if(this.state.radioCheck[i] == true) existCheckedRadio=true

            radioButtons.push(
                <label className="search_RadioBtn" style={styles.translateRadio}>
                <input  type="radio"
                        checked={this.state.radioCheck[i]}
                        onClick={this.updateRadioState.bind(this)}
                        radio-num={i}/>{radio_langs[name]}</label>
            )
            i++
        }
        
        var searchButton
        //検索ボタン　ラジオボタンが1つもチェックされていなかったら押せない
        if(existCheckedRadio){
            searchButton = <button className="search_HashSearchBtn" onClick={this.searchWithRadio.bind(this)}>{l[langNum].search}</button>
        }
        else{
            searchButton = <button className="search_HashSearchBtn" disabled>{l[langNum].search}</button>
        }


        return (
            <div style={styles.tagBox}>
                <div className='search_RadioBtnBox'>
                    {radioButtons}
                </div>
                <div>
                    {searchButton}
                </div>
            </div>
        )
    }
}