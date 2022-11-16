import { action, makeObservable, observable } from "mobx";
import { v1 as uuidv1 } from "uuid";

export class MemoModel {
  id = uuidv1();
  content = "";
  x = 0;
  y = 0;
  width = 250;
  height = 300;
  constructor() {
    makeObservable(this, {
      content: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
    });
  }
}

export default class MemoStore {
  memos = [];
  constructor() {
    makeObservable(this, {
      memos: observable,
      addMemo: action,
      editMemo: action,
    });
  }
  addMemo() {
    this.memos.push(new MemoModel());
  }
  editMemo(id, content) {
    this.memos[this.getMemoIndex(id)].content = content;
  }
  getMemoIndex(id) {
    return this.memos.findIndex((memo) => memo.id === id);
  }
  set;
}
