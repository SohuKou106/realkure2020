import {LMap} from './LMap'
import {Shop} from './Shop/Shop'
import {FavList} from './Favorite/FavList'
import {Search} from './Search/Search'
import {Search_Result} from './Search/Search_Result'

//*******複数のページからアクセスできるページに移動する前に前の画面を保存しておく*******
export class BeforePage{    
    constructor(page, movePage){
        this.page = page
        this.movePage = movePage
    }

    set(page_name){        
        this.page = page_name
    }

    backPage(){
        switch(this.page){
            case "LMap": this.movePage({shop_data:{lat:null, lng:null, id:null, name:null,
                                        address1: null, address2:null, intro:null,
                                        tag1: null, tag2: null, tag3: null, week: null,
                                        holi: null, reg_holi: null,},
                                        Component: LMap}); break;
            case "Shop": this.movePage({Component: Shop}); break;
            case "FavList": this.movePage({Component: FavList}); break;
            case "Search": this.movePage({Component: Search}); break;
            case "Search_Result": this.movePage({Component: Search_Result}); break;
        }
    }
}

//*******LMapの中心，拡大情報を記憶しておく*******
export class Status{
    constructor(center, zoom, checked, searchtext, tab_num){
        this.center = center
        this.zoom = zoom
        this.checked = checked
        this.searchtext = searchtext
        this.tab_num = tab_num
    }
    setMapStatus(center, zoom, checked){
        this.center = center
        this.zoom = zoom
        this.checked = checked
    }

    setText(searchtext){
        this.searchtext = searchtext
    }

    setTabNum(tab_num){
        this.tab_num = tab_num
    }
}
