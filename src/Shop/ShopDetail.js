import React from 'react'
import axios from 'axios'
import back from '../images/back.png'
import noimage from '../images/noimage.png'
import {l} from '../Language'
import {langNum} from '../MyPage'
import {FavButton} from '../Favorite/FavButton'
import './Shop.css'
import { WriteReview } from './WriteReview'

export class ShopDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            review_list: []
        }
        this.props.before_page
        this.props.shop_data
        this.props.favId
        this.props.shopLocate
        this.props.firebaseRef
        this.props.posts
    }

    componentWillMount(){
        this.updateReviewState()
    }

    backPage(e){
        this.props.before_page.backPage()
    }

    //お気に入りボタンが押されたら呼び出される
    favChange(state){
        this.setState(state)
    }

    //「マップで確認」ボタンに変更？
    moveLMap(e){
        var shop_data = this.props.shop_data
        this.props.shopLocate(shop_data)
    }    

    //ポップアップのレビュー表示ボタンが押されたら呼び出される
    showReview(id){
        //console.log("show Review, id : " + id)
        this.props.movePage({Component: WriteReview, review_id: this.props.shop_data.id})
    }

    updateReviewState() {
        const posts = this.props.posts
        var postDatas = Object.keys(posts).map(function(key){
            return {shopid: posts[key].shopid, title: posts[key].title, text: posts[key].text}
        })
        this.getReviewDataHandler(postDatas)

        /*  //axiosによるデータ受信
        const ROOT_ENDPOINT = "http://localhost:3011"; //'http://192.168.3.6:3011';
        axios.get(ROOT_ENDPOINT + "/review")        
        .then((results) => {
            console.log(results.data)
            this.getReviewDataHandler(results.data)
        })
        .catch((error) => {
            console.log("通信に失敗しました！！！！！！！！ごめん！！！！！！！！！")
        })
        */
    }

    getReviewDataHandler(data){
        var nowReview = data.filter(data => {
            console.log(data)
            console.log("data.shopid : " + data.shopid + " props.id : " + this.props.shop_data.id)
            return data.shopid === this.props.shop_data.id;
        })
        console.log(nowReview)
        this.setState({review_list: nowReview})
    }

    render(){
        var container
        var shopData = this.props.shop_data
        var tag1 = null, tag2 = null, tag3 = null
        tag1 = <span className='shop_Tag'>{"#" + shopData.tag1}</span>
        if(shopData.tag2 != null) tag2 = <span className='shop_Tag'>{"#" + shopData.tag2}</span>
        if(shopData.tag3 != null) tag3 = <span className='shop_Tag'>{"#" + shopData.tag3}</span>

        var reviews

        /*
        var all_review = this.state.review_list.slice()
        //console.log(all_review)
        console.log("props  id : " + shopData.id)
        var review_list = all_review.filter(review => {
            console.log("review id : " + review.shop_id)
            return review.shop_id === shopData.id
        })*/

        var review_list = this.state.review_list.slice()
        //console.log(review_list.length)

        if(review_list.length == 0){
            reviews = <div className='shopD_NoReview'>レビューはありません。</div>
        }
        else{
            reviews = review_list.map(review => {
                return(
                    <div className='shopD_ReviewItems'>
                        <div className='shopD_ReviewTitle'>{review.title}</div>
                        <div className='shopD_ReviewText'>{review.text}</div>
                    </div>
                )
            })
        }
        //console.log(reviews)

        return (
            <div id='container'>
                <div className='backbtn'>
                    <div type='button' name='back' onClick={this.backPage.bind(this)}><img src={back} alt='' className='navImage'/></div>
                </div>
                <div className='shopD_NameText'>{shopData.name}</div>
                <div className='shopD_Buttons'>
                    <FavButton favChange={this.favChange.bind(this)} 
                                    shopId={shopData.id}
                                    favId={this.props.favId}
                                    page='ShopDetail'/>
                    <button onClick={this.moveLMap.bind(this)} className='shopD_MapButton'>{l[langNum].showMaps}</button>
                    <button onClick={this.showReview.bind(this, this.props.shop_data.id)} className='shopD_ReviewButton'>{l[langNum].showReview}</button>
                </div>
                <div className='content_List'>
                    <div>
                        <img className='shopD_Image' src={'./images/stores/' + `${shopData.id}` + '.jpg'} onError={e => e.target.src = noimage} />
                    </div>
                    <div className='shopD_Tags'>{tag1}{'  '}{tag2}{'  '}{tag3}</div>
                    <div className='shopD_Intro'>{shopData.intro}</div>
                    <div className='shopD_InfoTitle'>{l[langNum].d_address}</div>
                    <div className='shopD_InfoText'>{shopData.address1 + shopData.address2}</div>
                    <div className='shopD_InfoTitle'>{l[langNum].d_hours}</div>
                    <table className='shopD_Table'>
                        <tbody>
                            <tr>
                                <td>{l[langNum].d_week}</td>
                                <td>{shopData.week}</td>
                            </tr>
                            <tr>
                                <td>{l[langNum].d_holi}</td>
                                <td>{shopData.holi}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='shopD_InfoTitle'>{l[langNum].d_regholi}</div>
                    <div className='shopD_InfoText'>{shopData.reg_holi}</div>
                    <div className='shopD_InfoTitle'>{l[langNum].showReview}</div>
                    <div className='shopD_Reviews'>
                            {reviews}
                    </div>
                </div>
            </div>
        )
    }
}