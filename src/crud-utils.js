import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const URL = 'https://n4jyxgzlt8.execute-api.us-east-2.amazonaws.com/default/crud';

export async function callAPIPost(data) {
    return await axios.post(URL, data);
}

export async function callAPIListe(tableName) {
    const action = 'list';
    return await callAPIPost({ action, tableName });
}

export async function callAPIGetKayit(tableName, id) {
    const action = 'get';
    return await callAPIPost({ action, tableName, id });
}

export async function callAPIUpsert(tableName, item) {
    const action = 'upsert';
    return await callAPIPost({ action, tableName, item });
}

export async function callAPIAddKayit(tableName, item) {
    item.id = uuidv4();
    return await callAPIUpsert(tableName, item);
}

export async function callAPIUpdateKayit(tableName, item) {
    return await callAPIUpsert(tableName, item);
}

export async function callAPIDeleteKayit(tableName, id) {
    const action = 'delete';
    return await callAPIPost({ action, tableName, id });
}
