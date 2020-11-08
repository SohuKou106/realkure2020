import React from 'react'
import axios from 'axios'
import back from '../images/back.png'
import {l} from '../Language'
import {langNum} from '../MyPage'
import './Shop.css'
import './Review.css'
import { ShopDetail } from './ShopDetail'

export class WriteReview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            review_title: null,
            review_text: null,
            guide_Title: <div className='review_titleText'>{l[langNum].title + "(0/30)"}</div>,
            guide_Text: <div className='review_titleText'>{l[langNum].review + "(0/360)"}</div>,
            postButton: <button className='review_Button' onClick={this.submitReview.bind(this)} disabled>{l[langNum].send}</button>,
        }
        this.props.review_id
        this.props.movePage(this.state)
        this.props.firebaseRef
        this.props.posts
    }

    backPage(e){
        this.props.movePage({Component: ShopDetail})
    }

    submitReview(e){
        const title = this.state.review_title
        const text = this.state.review_text

        //firebaseへのデータ送信
        this.props.firebaseRef.push({
            shopid: this.props.review_id,
            title: title,
            text: text,
        })
        this.props.movePage({Component: ShopDetail})
    }


    textChanged(e){
        const textType = e.target.id
        var btn, guide_title, guide_text
        var text = e.target.value
        const title_max = 30;
        const text_max = 360;

        //現在編集しているのがタイトルの場合
        if(textType=="titleText"){
            guide_title = <div className='review_titleText'>{l[langNum].title + "(" + String(text).length + "/30)"}</div>
            if(text && this.state.review_text && String(text).length <= title_max && this.state.review_text.length <= text_max){
                btn = <button className='review_Button' onClick={this.submitReview.bind(this)}>{l[langNum].send}</button>
            }
            else {
                btn = <button className='review_Button' onClick={this.submitReview.bind(this)} disabled>{l[langNum].send}</button>
            }
            this.setState({review_title: text, guide_Title:guide_title, postButton: btn})    
        }
        //現在編集しているのがテキストの場合
        if(textType=="reviewText"){
            guide_text = <div className='review_titleText'>{l[langNum].review + "(" + String(text).length + "/360)"}</div>
            if(text && this.state.review_title && this.state.review_title.length <= title_max && String(text).length <= text_max){
                btn = <button className='review_Button' onClick={this.submitReview.bind(this)}>{l[langNum].send}</button>
            }
            else {
                btn = <button className='review_Button' onClick={this.submitReview.bind(this)} disabled>{l[langNum].send}</button>
            }
            this.setState({review_text: text, guide_Text: guide_text, postButton: btn}) 
        }        
    }

    render(){
        return(
            <div id='container' className='content_List'>
                <div className='backbtn'>
                    <div type='button' name='back' onClick={this.backPage.bind(this)}><img src={back} alt='' className='navImage'/></div>
                </div>
                <div className='shopD_NameText'>{l[langNum].writeReview}</div>
                {this.state.guide_Title}
                <div>
                    <input type="text" id="titleText" placeholder={l[langNum].title} className="review_titleBox" onChange={this.textChanged.bind(this)}/>
                </div>
                {this.state.guide_Text}
                <div>
                    <textarea type="text" id="reviewText" placeholder={l[langNum].review} className="review_textBox" onChange={this.textChanged.bind(this)}/>
                </div>
                {this.state.postButton}
            </div>
        )

        /*return(
            <div id='container' className='content_List'>
                <div className='backbtn'>
                    <div type='button' name='back' onClick={this.backPage.bind(this)}><img src={back} alt='' className='navImage'/></div>
                </div>
                <div className='shopD_NameText'>{l[langNum].writeReview}</div>
                <div className='review_titleText'>{l[langNum].title}</div>
                <div>
                    <input type="text" id="titleText" placeholder={l[langNum].title} className="review_titleBox" onChange={this.textChanged.bind(this)}/>
                </div>
                <div className='review_titleText'>{l[langNum].review}</div>
                <div>
                    <textarea type="text" id="reviewText" placeholder={l[langNum].review} className="review_textBox" onChange={this.textChanged.bind(this)}/>
                </div>
                {this.state.postButton}
            </div>
        )*/
    }
}