// サーバー起動
const express = require('express')
//const fs = require('fs')
//const https = require('https')
const app = express()
const bodyParser = require('body-parser');
const { response, Router } = require('express');

/*
const options = {
  key: fs.readFileSync('./private/real-kure.key'),
  cert: fs.readFileSync('./private/real-kure.crt')
}
*/

//https.createServer(options, app).listen(443)

/*app.options('/posts', function(req, res){  
  console.log("writing headers only");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.end('');
});*/

app.listen(3002, () => console.log('demo server open'))

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//*************************************************
//  日本語
//*************************************************
const knex_ja = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: 'realkure2.sqlite3'
  },
  useNullAsDefault: true
})
var Bookshelf_ja = require('bookshelf')(knex_ja)
var StoreList_ja = Bookshelf_ja.Model.extend({
  tableName: 'store_list'
})
var PlaceList_ja = Bookshelf_ja.Model.extend({
  tableName: 'place_list'
})
var StoreList_en = Bookshelf_ja.Model.extend({
  tableName: 'store_list_en'
})
var PlaceList_en = Bookshelf_ja.Model.extend({
  tableName: 'place_list_en'
}) 

app.get('/api/find_ja', (req, res) => {
  new StoreList_ja().where('id', '=', req.query.sid).fetch()
  .then((collection)=> {
    res.json({status: true, content: collection})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/restaurant_ja', (req, res) => {
  new StoreList_ja().where('genre', '=', '食事').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/cafe_ja', (req, res) => {
  new StoreList_ja().where('genre', '=', 'カフェ').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/tavern_ja', (req, res) => {
  new StoreList_ja().where('genre', '=', '居酒屋').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/hotel_ja', (req, res) => {
  new PlaceList_ja().where('genre', '=', '宿泊').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/other_ja', (req, res) => {
  new PlaceList_ja().where('genre', '=', 'その他').fetchAll()
  .then((collection) => {
    var collection_place = collection.toArray()
    new StoreList_ja().where('genre', '=', 'その他').fetchAll()
      .then((collection) => {
        var collection_store = collection.toArray()
        var collection_concat = collection_place.concat(collection_store)
        res.json({status: true, content: collection_concat})
      })
      .catch((err) => {
      })
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/data_ja', (req,res) => {
  new PlaceList_ja().fetchAll()
  .then((collection) => {
    var collection_place = collection.toArray()
    new StoreList_ja().fetchAll()
    .then((collection) => {
      var collection_store = collection.toArray()
      var collection_concat = collection_place.concat(collection_store)
      res.json({status:true, content: collection_concat})
    })
    .catch((err) => {
    })
  })
  .catch((err) => {
    res.json({status: false})
  })
})


//*************************************************
//  英語
//*************************************************
app.get('/api/find_en', (req, res) => {
  new StoreList_en().where('id', '=', req.query.sid).fetch()
  .then((collection)=> {
    res.json({status: true, content: collection})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/restaurant_en', (req, res) => {
  new StoreList_en().where('genre', '=', '食事').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/cafe_en', (req, res) => {
  new StoreList_en().where('genre', '=', 'カフェ').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/tavern_en', (req, res) => {
  new StoreList_en().where('genre', '=', '居酒屋').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/hotel_en', (req, res) => {
  new PlaceList_en().where('genre', '=', '宿泊').fetchAll()
  .then((collection) => {
    res.json({status: true, content: collection.toArray()})
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/other_en', (req, res) => {
  new PlaceList_en().where('genre', '=', 'その他').fetchAll()
  .then((collection) => {
    var collection_place = collection.toArray()
    new StoreList_en().where('genre', '=', 'その他').fetchAll()
      .then((collection) => {
        var collection_store = collection.toArray()
        var collection_concat = collection_place.concat(collection_store)
        res.json({status: true, content: collection_concat})
      })
      .catch((err) => {
      })
  })
  .catch((err) => {
    res.json({status: false})
  })
})

app.get('/api/data_en', (req,res) => {
  new PlaceList_en().fetchAll()
  .then((collection) => {
    var collection_place = collection.toArray()
    new StoreList_en().fetchAll()
    .then((collection) => {
      var collection_store = collection.toArray()
      var collection_concat = collection_place.concat(collection_store)
      res.json({status:true, content: collection_concat})
    })
    .catch((err) => {
    })
  })
  .catch((err) => {
    res.json({status: false})
  })
})



// 静的ファイルを自動的に返すようルーティングする
app.use('/public', express.static('./public'))
app.use('/camera', express.static('./public'))
app.use('/', express.static('./public'))
