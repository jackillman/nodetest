console.log("hello")



  var elem = document.getElementById("genre__list");
        elem.onclick = function (e){
          var li = event.srcElement || e.target;
          while(li.tagName != "LI" && li ) {
           li = li.parentNode;
          }

          let promise = fetch(location.href,{
            method: "POST",
            body: JSON.stringify({ format: li.dataset.format }),
            headers:{
              'Content-Type': 'application/json'
           }
    
        })
            
        promise.then(res=> {
            console.log(res)
        })
 
        };
  