import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { deleteHistory } from "./firebase_controller.js";
import { PlayHistoryPageView } from "../view/playhistory_page.js";

export async function onClickClearHistory(e){
    const email = currentUser.email;
    e.preventDefault();
    if (!confirm("Confirm to delete history?")) return;
    try {
        await deleteHistory(email);
    } catch (e) {
        if (DEV) console.log('Failed to delete: ', e);
        alert('Failed to delete history: ' + JSON.stringify(e));
    }
    await PlayHistoryPageView();
}