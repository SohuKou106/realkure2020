//現在地からお店までの経路を表示するroutingMachine ウェイポイントは始端と終端の2つ
import {MapLayer, withLeaflet} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

class RoutingMachine extends MapLayer {
  createLeafletElement (props) {
    const {map, from, to} = this.props;  
    console.log("map : " + map)
    console.log("from: " + from)
    console.log("to  : " + to)  
    //経路の始端と終端の座標
    var waypoints = [
      L.latLng(from[0], from[1]),
      L.latLng(to[0], to[1]),
    ]

    //mapに追加する経路要素 各オプションを設定
    var leafletElement = L.Routing.control({
      //始端と終端      
      waypoints: waypoints,
      //ルートを計算するために使用するrouterの種類
      router: new L.Routing.OSRMv1({
        serviceUrl: 'https://osrm.real-kure.net/route/v1'
        //serviceUrl: 'http://router.project-osrm.org/route/v1'
        //serviceUrl: 'http://localhost:3002/route/v1'
      }),
      //経路の線に関する設定　新しいポイントをユーザが任意で追加できるかの設定，スタイルなど
      lineOptions: {
        addWaypoints: false //線をドラッグして新しいウェイポイントを追加できないようにする
      },
      //ルート探索の計画を編集するためのUI?
      //plan(ウェイポイント, オプション)でインスタンスを生成
      plan: new L.Routing.plan(waypoints, {
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            opacity: 0
          })
        }
      })      
    }).addTo(map.leafletElement);   //経路要素を地図に追加
    return leafletElement.getPlan();;
  }
}

export default withLeaflet(RoutingMachine);

//エラー
//***serviceURLを「http://...」にした場合***
//・Origin http://localhost:3002 is not allowed by Access-Control-Allow-Origin.
//・XMLHttpRequest cannot load http://osrm.real-kure.net/route/v1/driving/
//  {from};{to}?overview=false&alternatives=true&steps=true&hints=;
//  due to access control checks.
//・Routing error: {message "HTTP request failed:... "}
//・http://... Failed to load resource: Origin http://localhost:3002 is not
//  allowed by Access-Control-Allow-Origin.

//***serviceURLを「https://...」にした場合***
//・Routing error: {message "HTTP request failed:... "}
//・http://... Failed to load resource: このサーバの証明書は無効です．
//  "osrm.real-kure.net"に偽装したサーバに接続している可能性があり，
//  機密情報が漏えいするおそれがあります．