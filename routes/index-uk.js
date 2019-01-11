var express = require('express');
var router = express.Router();
const request = require('request');
var staticContent = require('../DATA/mock.js');

router.get('/:id', function(req, res, next) {
  //console.log(req.params.id)
  console.log(req.params)
  let dataPage = {}

// options for GET
request.get("http://10.10.90.90/api/meta/channels", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    
    let bodyObj = JSON.parse(body);
    for(let item in bodyObj) {
    // console.log(bodyObj[item].uri)
      if(req.params.id == bodyObj[item].uri) { 
        dataPage.imgSrc = `/img/channels/${item}.svg`;
        dataPage.formatId = bodyObj[item].format_id;
        dataPage.formatTitle = checkFormat(dataPage.formatId)

        dataPage.description = bodyObj[item].lang.uk.desc;
        dataPage.name = bodyObj[item].lang.uk.name;
        dataPage.static = staticContent["uk"];
        dataPage.format = bodyObj[item].lang.uk.format;
        
      }
      
    }
    // console.log(dataPage)
    res.render('index', {data: dataPage});
  })

    function checkFormat(formatid) {
      let formatName;
   
      switch(formatid) {
        case 1:
            formatName = "Загальноформатнi"
          break;
        case 2:
            formatName = "Iнформаційні"
          break;
        case 3:
            formatName = "Розважальні"
          break; 
        case 4:
            formatName = "Пізнавальні"
          break;
        case 5:
            formatName = "Кіно та серіали"
          break;
        case 6:
            formatName = "Mузыкальные"
          break;
        case 7:
            formatName = "Спортивні"
          break;
        case 8:
            formatName = "Дитячі"
          break;
        default:
            formatName = "Загальноформатнi"
      }
      return formatName
    }
 
  
});


module.exports = router;
