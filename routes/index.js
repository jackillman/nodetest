var express = require('express');
var router = express.Router();
const request = require('request');
const bodyParser = require("body-parser");
var staticContent = require('../DATA/mock.js');


var fs = require('fs');
let channelsData = [];
let channelsDataArr = [];
// let channels = [];
fs.readFile('/holliday/land/DATA/stat.json', 'utf8', function (err, data) {
  if (err) throw err;
   channelsData = JSON.parse(data);
 // console.log(channelsData)
  for(let entity in channelsData) {
    let channelEntity = {}
    channelEntity.id = entity;
    channelEntity.name = channelsData[entity].lang.ru.name
    channelEntity.imgSrc = `https://static.lanet.tv/tv/logo/${entity}.svg`;
    channelEntity.uri = channelsData[entity].uri;
    channelEntity.quality = channelsData[entity].quality;
    channelEntity.format_id = channelsData[entity].format_id;
    channelEntity.description = channelsData[entity].lang.ru.desc;
    channelEntity.format = channelsData[entity].lang.ru.format;
    channelEntity.uri = channelsData[entity].uri;
    channelEntity.formatTitle = checkFormat(channelEntity.format_id);
    channelEntity.language = "ru";
    channelsDataArr.push(channelEntity)

  }

})


router.get('/:id', function(req, res, next) {
 
  // console.log(channelsDataArr)
let dataPage = {}
// options for GET request.get("http://10.10.90.90/api/meta/channels", (error, response, body) => {
 // var bodyObj;
  //fs.readFile('/holliday/land/DATA/stat.json', 'utf8', function (err, data) {
  //  if (err) throw err;
   // bodyObj = JSON.parse(data);
   // console.log(bodyObj)
    // for(let item in bodyObj) {
    //   if(req.params.id == bodyObj[item].uri) { 
    //     dataPage.imgSrc = `https://static.lanet.tv/tv/logo/${item}.svg`;
    //     dataPage.formatId = bodyObj[item].format_id;
    //     dataPage.formatTitle = checkFormat(dataPage.formatId)
    //     dataPage.description = bodyObj[item].lang.ru.desc;
    //     dataPage.name = bodyObj[item].lang.ru.name;
    //     dataPage.format = bodyObj[item].lang.ru.format;
    //     dataPage.static = staticContent["ru"];
    //   }
    // }
    channelsDataArr.forEach((el,i)=> {
    //  console.log(el)
      if(req.params.id == el.uri) { 
        dataPage.imgSrc = `https://static.lanet.tv/tv/logo/${el.id}.svg`;
        dataPage.formatId = el.format_id;
        dataPage.formatTitle = checkFormat(dataPage.formatId)
        dataPage.description = el.description;
        dataPage.name = el.name;
        dataPage.format = el.format;
        dataPage.static = staticContent["ru"];
        dataPage.language = "ru";
      }
    })
  
    res.render('index', {data:dataPage,  allArr:JSON.stringify(channelsDataArr)});

 
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
