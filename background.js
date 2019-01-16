var count = 0;

chrome.cookies.getAll({},function(cookies){
    count=cookies.length;
    document.getElementById("cookie-counter").innerHTML = count;
});



function displayCookies(){
  var tableLog = document.getElementById("cookieslog");
  tableLog.innerHTML = null;
  var domain = document.getElementById("url").value;
  chrome.cookies.getAll({url:domain},function(cookies){
    for(var i in cookies){
      var row = tableLog.insertRow(-1);
      console.log(cookies[i]);
      //var row = "<tr><td>"+cookies[i].name+"</td><td>"+cookies[i].value+"</td></tr>";
      row.insertCell(0).innerHTML = cookies[i].name;
      var value = cookies[i].value;
      if(value.length>10){
        value = value.substring(0,10);
      }
      row.insertCell(1).innerHTML = value;
    }
  });
  
}

function setCookies(){
  var domain = document.getElementById("url").value;
  var name = document.getElementById("key").value;
  var value = document.getElementById("value").value;
  chrome.cookies.set({url:domain,name:name,value:value,expirationDate : 1610701693},function(cookie){
    console.log("cookie is set");
    console.log(cookie);
  });
}
 //displayCookies();
 //setCookies();
function onCookieChanged(){
  chrome.cookies.onChanged.addListener(function(cookies){
      console.log("cookies are being changed ", cookies.cookie.domain);
      console.log(cookies);
  });
}

onCookieChanged();

  function clearAllCookies(){
    console.log("cookies cleared");
    chrome.cookies.getAll({}, function(cookies) {
        for (var i in cookies) {
          removeCookie(cookies[i]);
        }
      });
  }
  
  function removeCookie(cookie) {
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
              cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
  }

  document.addEventListener('DOMContentLoaded', function() {
    var clearCookies = document.getElementById('clear-cookies');
    var set_Cookies = document.getElementById("set-cookies");
    var display_Cookies = document.getElementById("display-cookies");
    // onClick's logic below:
    clearCookies.addEventListener('click', function() {
        clearAllCookies();
    });
    set_Cookies.addEventListener('click',function(){
        setCookies();
    });
    display_Cookies.addEventListener('click',function(){
        displayCookies();
    });
});