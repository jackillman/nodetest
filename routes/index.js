var express = require('express');
var router = express.Router();
const request = require('request');
const bodyParser = require("body-parser");
var staticContent = require('../DATA/mock.js');


var fs = require('fs');

let channels = [];
var formatChecked

const urlencodedParser = bodyParser.urlencoded({extended: false});
//app.get('*.html', dom().load());
router.post('/*',urlencodedParser, (req, res) => {
  console.log(req.body.format)
  formatChecked = req.body.format
  //console.log(res)
    res.sendStatus(201);
    
  
});




router.get('/:id',urlencodedParser, function(req, res, next) {
console.log("req",req)
let dataPage = {}
// options for GET request.get("http://10.10.90.90/api/meta/channels", (error, response, body) => {
  var bodyObj;
  fs.readFile('/holliday/land/DATA/stat.json', 'utf8', function (err, data) {
    if (err) throw err;
    bodyObj = JSON.parse(data);
  

  //console.log(bodyObj)
    // if(error) {
    //     return console.dir(error);
    // }
    
   // let bodyObj = JSON.parse(body);
   
    
    // let genreEntity = {
    //   title: "",
    //   format_id: "",
    //   isActivate: false
    // }
    // let genres = ["Все каналы","Общеформатные","Информационные","Развлекательные","Познавательные","Кино и сериалы",
    //               "Mузыкальные","Спортивные","Детские","Общеформатные"];
    for(let item in bodyObj) {
      let channelEntitty = {}
      if(req.params.id == bodyObj[item].uri) { 
        dataPage.imgSrc = `https://static.lanet.tv/tv/logo/${item}.svg`;
        dataPage.formatId = bodyObj[item].format_id;
        dataPage.formatTitle = checkFormat(dataPage.formatId)
       
        dataPage.description = bodyObj[item].lang.ru.desc;
        dataPage.name = bodyObj[item].lang.ru.name;
        dataPage.format = bodyObj[item].lang.ru.format;
        dataPage.static = staticContent["ru"];

      }
     
       channelEntitty.id = item;
       channelEntitty.imgSrc = `https://static.lanet.tv/tv/logo/${item}.svg`;
       channelEntitty.uri = bodyObj[item].uri;
       channelEntitty.quality = bodyObj[item].quality;
       channelEntitty.format_id = bodyObj[item].format_id;
       channelEntitty.uri = bodyObj[item].uri;
     
       channelEntitty.formatTitle = checkFormat(channelEntitty.format_id)
     // console.log("--------", channelEntitty)

        channels.push(channelEntitty)

    }
  let genres = [];

  let chans = channels.map(p=>p.format_id).filter((c,index,array)=> {
    if(array.indexOf(c) == index) {
      let genreEntity = {}
      genreEntity.title = checkFormat(c);
      genreEntity.formatId = c;
      genreEntity.isActive = false;
      genres.push(genreEntity)
    }
  }).sort();

  let genreEntity = {
    title: "Все",
    formatId : 0,
    isActive : true
  }
    genres.unshift(genreEntity)
    
    res.render('index', {data:dataPage, dataChannels:channels, genres:genres});
  // })
});
 
console.log(formatChecked)

});

function checkFormat(formatid) {
  let formatName;

  switch(formatid) {
    case 1:
        formatName = "Общеформатные"
      break;
    case 2:
        formatName = "Информационные"
      break;
    case 3:
        formatName = "Развлекательные"  
      break; 
    case 4:
        formatName = "Познавательные"
      break;
    case 5:
        formatName = "Кино и сериалы"
      break;
    case 6:
        formatName = "Mузыкальные"
      break;
    case 7:
        formatName = "Спортивные"
      break;
    case 8:
        formatName = "Детские"
      break;
    default:
        formatName = "Общеформатные"
  }
  return formatName
}




module.exports = router;
