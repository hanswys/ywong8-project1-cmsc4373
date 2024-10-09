import {
    getFirestore,
    collection, addDoc,
    query, where, orderBy, getDocs, deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"

import { app } from "./firebase_core.js";

const DiceRollGameCollection  = 'dicegame_collection';
const db = getFirestore(app);

export async function addDiceRollGameRecord(gameRecord){
    await addDoc(collection(db, DiceRollGameCollection), gameRecord);
}

export async function getAllPlayRecords(email){
    let history = [];

    const q = query(
        collection(db, DiceRollGameCollection),
        where('email', '==', email),
        orderBy('timestamp', 'desc'),
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const {balance, bet, email, timestamp, win} = doc.data();
        history.push({balance, bet, email, timestamp, win});
    });

    return history;
}

export async function deleteHistory(email) {
    const q = query(
        collection(db, DiceRollGameCollection),
        where('email', '==', email)
    );

    const snapShot = await getDocs(q);

    snapShot.forEach(async (doc) => {
        await deleteDoc(doc.ref); 
    });
}
