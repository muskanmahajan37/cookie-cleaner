var count = 0;

chrome.cookies.getAll({},function(cookies){
    count=cookies.length;
    document.getElementById("cookie-counter").innerHTML = count;
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('clear-cookies').addEventListener('click', clearAllCookies);
   
//   });

  

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
    var link = document.getElementById('clear-cookies');
    // onClick's logic below:
    link.addEventListener('click', function() {
        clearAllCookies();
    });
});