import { root } from "./element.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";

export async function PlayHistoryPageView(){
    if (!currentUser){
        root.innerHTML = await protectedView();
        return;
    }
    root.innerHTML = '<h1>Game Play History Records</h1';
}