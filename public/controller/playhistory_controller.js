import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { deleteHistory } from "./firebase_controller.js";
import { PlayHistoryPageView } from "../view/playhistory_page.js";

export async function onClickClearHistory(e){
    const email = currentUser.email;
    e.preventDefault();
    console.log("hi");
    if (!confirm("Confirm to delete the reply?")) return;
    try {
        await deleteHistory(email);
        // update web browser to remove reply
        // <tr><td><form>
        // const tr = e.target.parentElement.parentElement;
        // tr.remove();
    } catch (e) {
        if (DEV) console.log('Failed to delete: ', e);
        alert('Failed to delete reply: ' + JSON.stringify(e));
    }
    await PlayHistoryPageView();
}