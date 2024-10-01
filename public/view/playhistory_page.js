import { root } from "./element.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { DEV } from "../model/constants.js";
import { getAllPlayRecords } from "../controller/firebase_controller.js";

export async function PlayHistoryPageView(){
    if (!currentUser){
        root.innerHTML = await protectedView();
        return;
    }
    root.innerHTML = '<h1>Game Play History Records</h1'; const response = await fetch('/view/templates/playhistory_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4')
    root.innerHTML = '';
    root.appendChild(divWrapper);

    let playRecords;
    try {
        playRecords = await getAllPlayRecords(currentUser.email);
    } catch (e) {
        if (DEV) console.log('Failed to getAllPlayRecords', e);
        alert(`Failed to get play records: ${JSON.stringify(e)}`);
        return;
    }

    const tbody = divWrapper.querySelector('tbody');
    if (playRecords.length == 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan = "5" class="text-center fs-3">No play records found!</td>
        </tr>
        `;
    } else {
        playRecords.forEach((record, index) => tbody.appendChild(buildOnePlayRecordView(record, index + 1)));

    }
}

function buildOnePlayRecordView(record, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            ${index}
        </td>
        <td>
            ${record.bet}
        </td>
          <td>
            ${record.win}
        </td>
        <td>
            ${record.balance}
        </td>
          <td>
            ${new Date(record.timestamp).toLocaleString()}
        </td>
    `;
    return tr;
}