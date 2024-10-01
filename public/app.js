import { onClickHomeMenu, onClickPlayHistory, onClickSignoutMenu } from "./controller/menueventhandlers.js";
import { attachAuthStateChangeObserver } from "./controller/firebase_auth.js";
import { routing } from "./controller/route_controller.js";

// menu button handler 
document.getElementById('menu-home').onclick = onClickHomeMenu;
document.getElementById('menu-playhistory').onclick = onClickPlayHistory;
document.getElementById('menu-signout').onclick = onClickSignoutMenu;

attachAuthStateChangeObserver();

window.onload = function(e) {
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    console.log(pathname, hash);
    routing(pathname, hash);
}

window.onpopstate = function(e){
    e.preventDefault();
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    routing(pathname, hash);
}