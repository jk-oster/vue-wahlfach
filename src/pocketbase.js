import PocketBase from 'pocketbase';

const pbUrl = 'https://jet-escape.pockethost.io';

export const pb = new PocketBase(pbUrl);

export function getFileUrl(collection, recordId, filename) {
    return pbUrl + '/api/files/' + collection + '/' + recordId + '/' + filename;
}
