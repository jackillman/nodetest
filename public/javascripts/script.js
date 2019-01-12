
let listChannels = document.getElementById('list-channels');
let listGenres = document.getElementById('list-genres');
let selectGenres = document.getElementById('select-genres');
let checkedGenre = 0;
let newArrChannels = [];
let search = document.getElementById('search');
let genreEntity = {
  title: "Все",
  formatId : 0,
  isActive : true
}
let arrGenres = [];
//добавляем категорию "все"
arrGenres.push(genreEntity);

  // чекаем жанр
function checkFormat(formatid,lang) {
  let formatName;

  switch(formatid) {
    case 0:
      if(lang == "ru") {
        formatName = "Все каналы";
      } else  {
        formatName = "Всi канали";
      }
    break;
    case 1:
      if(lang == "ru") {
        formatName = "Общеформатные";
      } else  {
        formatName = "Загальноформатнi";
      }
      
    break;
    case 2:
      if(lang == "ru") {
        formatName = "Информационные";
      } else {
        formatName = "Iнформаційні";
      }
    break;
    case 3:
      if(lang == "ru") {
        formatName = "Развлекательные";
      } else {
        formatName = "Розважальні";
      }
    break; 
    case 4:
      if(lang == "ru") {
        formatName = "Познавательные";
      } else {
        formatName = "Пізнавальні";
      }
    break;
    case 5:
      if(lang == "ru") {
        formatName = "Кино и сериалы";
      } else {
        formatName = "Кіно та серіали";
      }
    break;
    case 6:
      if(lang == "ru") {
        formatName = "Mузыкальные";
      } else {
        formatName = "Mузичнi";
      }
    break;
    case 7:
      if(lang == "ru") {
        formatName = "Спортивные";
      } else {
        formatName = "Спортивні";
      }
    break;
    case 8:
      if(lang == "ru") {
        formatName = "Детские";
      } else {
        formatName = "Дитячі";
      }
    break;
    default:
    if(lang == "ru") {
      formatName = "Общеформатные";
    } else {
      formatName = "Загальноформатнi";
    }
  }
  return formatName;
}
//начальный рендер каналов 
renderListChannels(arrChannels)
newArrChannels = arrChannels;
genresInit();



let strGenre = "";
arrGenres.forEach(element => {
  let spanSmall = document.createElement('span');
  let optionSmall = document.createElement('option');
  optionSmall.value = element.formatId;
  spanSmall.innerHTML = element.title
  optionSmall.appendChild(spanSmall);

  let li = document.createElement('li');
  li.classList.add("genre")
  if(element.isActive) {
    li.classList.add("active-genre");
  } else {
    li.classList.remove("active-genre");
  }
  let span = document.createElement('span');
  span.innerHTML = element.title;
  li.addEventListener('click',function(){
    checkedGenre = element.formatId;
    document.querySelectorAll(".genre").forEach(el=> {
      el.classList.remove("active-genre");
    })
    li.classList.add("active-genre");
    newArrChannels = arrChannels.filter(el => {
      if(checkedGenre == 0) {
        return true;
      }
      return el.format_id == checkedGenre;
    })
    renderListChannels(newArrChannels);
  })
  li.appendChild(span)
  selectGenres.appendChild(optionSmall);
  listGenres.appendChild(li);		
});

// рендер списка каналов
function renderListChannels(arr) {
  let str = "";
  arr.forEach(element => {
    str +=  `<li class="channel__item"> 
          <a href="${element.uri}">
            <img src="${element.imgSrc}" alt="${element.name}">
          </a>
        </li>`
              
  });
  listChannels.innerHTML = str;
}


// вешаем событие на инпут поиска
search.oninput = function(e) {
  let val = e.target.value.toLowerCase();
  let arr = [];
  renderListChannels(newArrChannels);
    if(val.length > 2) {
      newArrChannels.forEach(el=> {
      if(el.name.toLowerCase().includes(val)) {
        arr.push(el);
        renderListChannels(arr);    
      } 
    })
  } 
}
// выборка в селекте 
function selectingGenres(e){
  checkedGenre = e.value;
  newArrChannels = arrChannels.filter(el => {
    if(checkedGenre == 0) {
      return true
    }
    return el.format_id == checkedGenre
  })
    renderListChannels(newArrChannels)
}

function genresInit() {
  let language
  arrChannels.forEach(i=> {
    language = i.language
  })
  arrChannels.map(p=>p.format_id).filter((c,index,array)=> {
    if(array.indexOf(c) == index) {
      let genreEntity = {}
      genreEntity.title = checkFormat(c,language);
      genreEntity.formatId = c;
      genreEntity.isActive = false;
      arrGenres.push(genreEntity)
    }
  }).sort();
}
