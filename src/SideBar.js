import React from 'react'
import {langNum} from './MyPage'
import {l} from './Language'
import './LMap.css'
import res_icon from './assets/rest.png'
import cafe_icon from './assets/cafe.png'
import bar_icon from './assets/bar_3.png'
import hotel_icon from './assets/hotel.png'
import other_icon from './assets/other_2.png'
import { RGBADepthPacking } from 'three'

export class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.bindCheckBoxChangedHandler = this.checkBoxChangedHandler.bind(this)
        this.state = {

        }
        this.props.state
        this.props.updateCheck(this.state);
    }

    checkBoxChangedHandler(e){
        var num = Number(e.currentTarget.getAttribute("box-num"))
        var checked_Copy = this.props.checked.slice()
        for (var i = 0; i< 5; i++){
            if(i == num){
                checked_Copy[i] = !checked_Copy[i]
            }
            else{
                checked_Copy[i] = checked_Copy[i]
            }
        }
        this.props.updateCheck(checked_Copy)
    }

    render(){
        const styles = {
            list : {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                background : 'rgba(200,200,200,0.5)',
                boxshadow: '2px 2px #555555'
            },
            button : {
                width: '10px',
                heigth: '30px',

            },
            checkBox : {
                fontSize : '40px',
                margin : '20px'
            }
        }


        /*
        <div style={styles.list}>
                    <div >
                        <img src={res_icon} alt='' className='sideBar_Marker'/>
                        <label><input type='checkbox' checked={this.props.checked[0]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="0" />{l[langNum].restaurant}</label>
                    </div>
                    <div>
                        <img src={cafe_icon} alt='' className='sideBar_Marker'/>
                        <label><input type='checkbox' checked={this.props.checked[1]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="1"/>{l[langNum].cafe}</label>
                    </div>
                    <div>
                        <img src={bar_icon} alt='' className='sideBar_Marker'/>
                        <label><input type='checkbox' checked={this.props.checked[2]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="2"/>{l[langNum].bar}</label>
                    </div>
                    <div>
                        <img src={hotel_icon} alt='' className='sideBar_Marker'/>
                        <label><input type='checkbox' checked={this.props.checked[3]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="3"/>{l[langNum].hotel}</label>
                    </div>
                    <div>
                        <img src={other_icon} alt='' className='sideBar_Marker'/>
                        <label><input type='checkbox' checked={this.props.checked[4]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="4"/>{l[langNum].other}</label>
                    </div>
                </div>
         */
        return(
            <div>
                <table class='sideBar'>
                    <tr>
                        <td><img src={res_icon} alt='' className='sideBar_Marker' onClick={this.bindCheckBoxChangedHandler} box-num="0"/></td>
                        <td><label><input type='checkbox' checked={this.props.checked[0]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="0" />{l[langNum].restaurant}</label></td>
                    </tr>
                    <tr>
                        <td><img src={cafe_icon} alt='' className='sideBar_Marker' onClick={this.bindCheckBoxChangedHandler} box-num="1"/></td>
                        <td><label><input type='checkbox' checked={this.props.checked[1]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="1"/>{l[langNum].cafe}</label></td>
                    </tr>
                    <tr>
                        <td><img src={bar_icon} alt='' className='sideBar_Marker' onClick={this.bindCheckBoxChangedHandler} box-num="2"/></td>
                        <td><label><input type='checkbox' checked={this.props.checked[2]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="2"/>{l[langNum].bar}</label></td>
                    </tr>
                    <tr>
                        <td><img src={hotel_icon} alt='' className='sideBar_Marker' onClick={this.bindCheckBoxChangedHandler} box-num="3"/></td>
                        <td><label><input type='checkbox' checked={this.props.checked[3]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="3"/>{l[langNum].hotel}</label></td>
                    </tr>
                    <tr>
                        <td><img src={other_icon} alt='' className='sideBar_Marker' onClick={this.bindCheckBoxChangedHandler} box-num="4"/></td>
                        <td><label><input type='checkbox' checked={this.props.checked[4]} style = {styles.checkBox} onClick={this.bindCheckBoxChangedHandler} box-num="4"/>{l[langNum].other}</label></td>
                    </tr>
                </table>
            </div>
        )
    }
}