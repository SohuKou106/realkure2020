import React from 'react'
import './App.css'
import {LMap} from './LMap'
import {l} from './Language'
import {langNum} from './MyPage'
import MapLogo from './images/map.png'
import ShopLogo from './images/shop.png'
import MyPageLogo from './images/setting.png'
import HelpImage from './images/helpImage.png'
import HelpImage2 from './images/helpImage2.png'
import back from './images/back.png'

export class Help extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.props.before_page
    }

    backPage(e){
        this.props.movePage({Component: LMap})
    }

    render(){
        return(
            <div id='container'>
                <div className='backbtn'>
                    <div type='button' name='back' onClick={this.backPage.bind(this)}><img src={back} alt='' className='navImage'/></div>
                </div>
                <div className='content_List'>
                <div className='help_fontTitle'>{l[langNum].help1}</div>
                    <table>
                        <tbody>
                            <tr>
                                <td><div className='help_tab'><img src={MapLogo} alt="" className="help_image"></img></div></td>
                                <td><div className='help_fontName'>{l[langNum].help2}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='help_fontDesc'>{l[langNum].help3}</div>
                    <table className='help_Table'>
                        <tbody>
                            <tr>
                                <td><div className='help_tab'><img src={ShopLogo} alt="" className="help_image"></img></div></td>
                                <td><div className='help_fontName'>{l[langNum].help4}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='help_fontDesc'>{l[langNum].help5}</div>
                    <table className='help_Table'>
                        <tbody>
                            <tr>
                                <td><div className='help_tab'><img src={MyPageLogo} alt="" className="help_image"></img></div></td>
                                <td><div className='help_fontName'>{l[langNum].help6}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='help_fontDesc'>{l[langNum].help7}</div>

                    <div className='help_fontTitle'>{l[langNum].help8}</div>
                    <img src={HelpImage} alt='' className='help_shopDImage'/>
                    <div className='help_fontDesc'>{l[langNum].help9}</div>
                    <div className='help_fontDesc'>{l[langNum].help10}</div>
                    <div className='help_fontDesc'>{l[langNum].help11}</div>
                    <div className='help_fontDesc'>{l[langNum].help12}</div>
                    <div className='help_fontDesc'>{l[langNum].help13}</div>

                    <div className='help_fontTitle'>{l[langNum].help14}</div>
                    <div className='help_fontDesc'>{l[langNum].help15}</div>
                    <img src={HelpImage2} alt='' className='help_shopDImage'/>
                    <div className='help_fontDesc'>{l[langNum].help16}</div>
                    <div className='help_fontDesc'>{l[langNum].help17}</div>
                    <div className='help_fontDesc'>{l[langNum].help18}</div>
                    <div className='help_fontDesc'>{l[langNum].help19}</div>
                </div>
            </div>
        )
    }
}