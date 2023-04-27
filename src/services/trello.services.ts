import { HTTP } from "./../utils/http/http";
import { AxiosRequestConfig } from 'axios';
import { environment } from '../../src/env/enviroment';

class TrelloService extends HTTP {
    constructor() {
        super({ baseURL: environment.API_URL });
    }

    public async getMember() {
        const url = '/members/me';
        return await super.get(url);
    }

    public async getBoard(boardId: number) {
        const url = `/boards/${boardId}`;
        return await super.get(url);
    }

    public async postBoard(boardName: string) {
        const url = '/boards/';
        const config: AxiosRequestConfig = { params: { name: boardName } };
        return await super.post(url, {}, config);
    }

    public async deleteBoard(boardId: string) {
        const url = `/boards/${boardId}`;
        return await super.delete(url);
    }

    public async getLists(boardId: string) {
        const url = `/boards/${boardId}/lists`;
        return await super.get(url);
    }

    public async postList(listName: string, position: number, boardId: string) {
        const url = '/lists/';
        const config: AxiosRequestConfig = { params: { name: listName, pos: position, idBoard: boardId } };
        return await super.post(url, {}, config);
    }

    public async archiveList(listId: string) {
        const url = `/lists/${listId}/closed`;
        const config: AxiosRequestConfig = { params: { value: true } };
        return await super.put(url, {}, config);
    }

    public async postCard(listId: number, cardName: string) {
        const url = '/cards/';
        const config: AxiosRequestConfig = { params: { name: cardName, idList: listId } };
        return await super.post(url, {}, config);
    }

    public async moveCard(cardId: string, listId: string) {
        const url = `/cards/${cardId}`;
        const config: AxiosRequestConfig = { params: { idList: listId } };
        return await super.put(url, {}, config);
    }

    public async createLists(lists: Array<string>, boardId: string) {
        let listsArray: string[] = [];
        let listsNameArray: string[]= [];
        for (let i = 0; i < lists.length; i++) {
            let result = lists[i];
            let result1 = await this.postList(result, i + 1, boardId);
            listsArray[i] = result1.data.id;
            listsNameArray[i] = result1.data.name;
        }
        return [listsArray,listsNameArray]
    }

    public async archiveLists(boardId: string) {
        let response
        let listResponse: string[] = [];
        let listArchive: string[] = [];
        let { data } = await this.getLists(boardId);
        listArchive = data.map((item: any) => { return item.id })
        for (let i = 0; i < listArchive.length; i++) {
            let result = listArchive[i];
            response = await this.archiveList(result);
            listResponse[i] = response.data.closed
        };
        return listResponse
    }
}

export default new TrelloService();