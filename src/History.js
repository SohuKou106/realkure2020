import React from 'react'
import './History.css'
import './Shop/Shop.css'
import { MyPage } from './MyPage'
import back from './images/back.png' 

export class History extends React.Component{
    constructor (props) {
        super(props)
        this.state = {

        }
        this.props.movePage(this.state)
    }

    backPage(){
        this.props.movePage({Component: MyPage})
    }

    render(){
        return(
            <div id='container' className="content_List">
                <div className="backbtn">
                    <div type="button" name="back" onClick={this.backPage.bind(this)}><img src={back} alt="" className="navImage"/></div>
                </div>           
                <div id="site-box">
                <div id="site-in-box">
                    <h1>呉市屋台の歴史</h1>
                    <div id="line">
                        <div id="vertical-text">
                            <div id="text-box1"></div>
                            <div id="text-box2">1924</div>
                            <div id="text-box3">1945</div>
                            <div id="text-box4">1965</div>
                            <div id="text-box5">1990</div>
                            <div id="text-box6">2000</div>
                            <div id="text-box7">2001</div>
                            <div id="text-box8">2002</div>
                        </div>
                        <div id="vertical-line">
                            <div id="radius-box1">
                            </div>
                            <div id="radius-box2">
                                <div id="radius"></div>
                            </div>
                            <div id="radius-box3">
                                <div id="radius"></div>
                            </div> 
                            <div id="radius-box4">
                                <div id="radius"></div>
                            </div> 
                            <div id="radius-box5">
                                <div id="radius"></div>
                            </div> 
                            <div id="radius-box6">
                                <div id="radius"></div>
                            </div> 
                            <div id="radius-box7">
                                <div id="radius"></div>
                            </div> 
                            <div id="radius-box8">
                                <div id="radius"></div>
                            </div> 
                        </div>
                    </div>
                    <div id="main">
                        <div id="heading">
                            <h3><span>屋台の始まり</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>「大呉市民史」大正篇（上巻）に「夜なきうどん営業者呉署管内に二十六」とある（26軒存在）</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>闇市出現から屋台へ発展</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>闇市,屋台は戦後の混乱から落ち着いてくると,通常店舗の営業妨害になると問題視され始める</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>屋台が社会問題に</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>道路法改正で道路での営業が規制</div>
                                <div>当時堺川一帯の車道で営業していた屋台は全面禁止となる</div>
                                <div>　　　→蔵本通の歩道へと移る</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>ルール改正</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>一定の条件下で屋台の存続が可能に</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>存続に向けて</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>連合広島呉地域協議会から蔵本通の屋台を観光資源として扱うように要望</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>規制の影響</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>屋台の数が8軒まで減少</div>
                                <div>↓</div>
                                <div>2001年：呉商工会議所「蔵本通の屋台営業の規制緩和を求める声」</div>
                                <div>and観光客,企業関係者,関係団体（呉商工会議所・連合広島呉地域協議会）から屋台再生の声が上がる</div>
                                <div>　　　→呉市「呉市の賑わい創出のために屋台の存続再生を図る」</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                        <div id="heading">
                            <h3><span>現状</span></h3>
                        </div>
                        <div id="text">
                            <div id="text-right">
                                <div>営業場所（現在屋台のある場所）を道路区域から公園区域に変更</div>
                                <div>→これで呉都市公園条例が適用できるようになった</div>
                                <div>↓</div>
                                <div>2002年：「蔵本通の屋台に関する要綱」の制定→新規屋台の営業を可能に</div>
                                <div>↓</div>
                                <div>2002年：営業区域を公園内に移し,15軒で営業スタート</div>
                                <div>内訳（2007年時点）↓</div>
                                <div>既存（営業場所が公園になる前からあった）：</div>
                                <div>　　清龍軒,冨士さん,八起,一二三,かさ,龍王</div>
                                <div>新規（公募により選定）</div>
                                <div>　　燻（KUN）,華智,三ツ星屋台,呉空,MARUMAN,おばちゃん</div>
                            </div>
                        </div>
                        <div id="clear"></div>
                    </div>
                </div>
                </div>                   
            </div>
        )

        /*return(
            <div id='container' className="content_List">
                <div className="backbtn">
                    <div type="button" name="back" onClick={this.backPage.bind(this)}><img src={back} alt="" className="navImage"/></div>
                </div>                
                <div id="site-box">
                    <h1>呉市屋台の歴史</h1>
                    <div id="heading">
                        <h3><span>1. 屋台の始まり</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">1924年</div>
                        <div id="text-right">
                            <div>「大呉市民史」大正篇（上巻）に「夜なきうどん営業者呉署管内に二十六」とある</div>
                            <div>26軒存在</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>闇市の出現→屋台へと発展</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">1945年</div>
                        <div id="text-right">
                            <div>闇市、屋台は戦後の混乱から落ち着いてくると,通常店舗の営業妨害になると問題視され始める</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>3. 屋台が社会問題に</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">1965年</div>
                        <div id="text-right">
                            <div>道路法改正で道路での営業が規制</div>
                            <div>当時堺川一帯の車道で営業していた屋台は全面禁止となる</div>
                            <div>　　　→蔵本通の歩道へと移る</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>4. ルール改正</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">1990年</div>
                        <div id="text-right">
                            <div>一定の条件下で屋台の存続が可能に</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>5. 存続に向けて</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">2000年</div>
                        <div id="text-right">
                            <div>連合広島呉地域協議会から蔵本通の屋台を観光資源として扱うように要望</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>6. 規制の影響</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">2001年</div>
                        <div id="text-right">
                            <div>屋台の数が8軒まで減少</div>
                            <div>↓</div>
                            <div>2001年：呉商工会議所「蔵本通の屋台営業の規制緩和を求める声」</div>
                            <div>and観光客,企業関係者,関係団体（呉商工会議所・連合広島呉地域協議会）から屋台再生の声が上がる</div>
                            <div>　　　→呉市「呉市の賑わい創出のために屋台の存続再生を図る」</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                    <div id="heading">
                        <h3><span>7. 現状</span></h3>
                    </div>
                    <div id="text">
                        <div id="text-left">2002年</div>
                        <div id="text-right">
                            <div>営業場所（現在屋台のある場所）を道路区域から公園区域に変更</div>
                            <div>→これで呉都市公園条例が適用できるようになった</div>
                            <div>↓</div>
                            <div>2002年：「蔵本通の屋台に関する要綱」の制定→新規屋台の営業を可能に</div>
                            <div>↓</div>
                            <div>2002年：営業区域を公園内に移し,15軒で営業スタート</div>
                            <div>内訳（2007年時点）↓</div>
                            <div>既存（営業場所が公園になる前からあった）：</div>
                            <div>　　清龍軒,冨士さん,八起,一二三,かさ,龍王</div>
                            <div>新規（公募により選定）</div>
                            <div>　　燻（KUN）,華智,三ツ星屋台,呉空,MARUMAN,おばちゃん</div>
                        </div>
                    </div>
                    <div id="clear"></div>
                </div>                   
            </div>
        )*/
    }
}