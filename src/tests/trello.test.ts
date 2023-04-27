import { Data } from "../data/data";
import { expect } from 'chai';
import trelloService from "../services/trello.services";

describe('Create a List', () => {
  let boardId: string = "";

  beforeAll(async () => {
    const newBoard: boardResponse = await trelloService.postBoard(Data.BoardName);
    console.log("Board", newBoard);
    boardId = newBoard.data.id;
  });

  afterAll(async () => {
    await trelloService.deleteBoard(boardId);
  });

  test("Should archive all the lists", async () => {
    const achieveList = await trelloService.archiveLists(boardId);
    console.log("AchieveList", achieveList);
    expect(achieveList).deep.equal(Data.TrueArray)
  });

  test("Should create multiple lists: To Do, In Progress, and Done", async () => {
    const arrayOfLists: string[][] = await trelloService.createLists(Data.Lists, boardId);
    console.log("Lists", arrayOfLists);
    expect(arrayOfLists[1]).deep.equal(Data.Lists)
  });
});
