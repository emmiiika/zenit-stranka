function on() {
  document.getElementById("loginForm").style.display = "flex";
}
function off() {
  document.getElementById("loginForm").style.display = "none";
}

function countdown() {
    var countDownDate = new Date("Nov 23, 2023 09:00:00").getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timeCountdown").innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);
        document.getElementById("dateCountdown").innerHTML = days + " " + dayFormat(days);
    }, 1000);
}

function checkTime(t){
    if (t < 10){
        return "0" + t;
    }
    return t;
}
function dayFormat(d){
    d = Math.abs(d);
    if (d === 0 || d >= 5){
        return "dní";
    }
    else if (d === 1){
        return "deň";
    }
    else if (d === 2 || d === 3 || d === 4){
        return "dni";
    }
}
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {elmnt.innerHTML = this.responseText;}
          if (this.status === 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function displayTask(fileName){
    document.getElementById('taskText').setAttribute("include-html", fileName);
    includeHTML()

    // includeHTML()
}

