import {User} from "../../common/models/user";

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_LIST_ERROR = 'user list error';
export const USER_ADD = 'user add';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';

export class UserListRequestAction{
  readonly type = USER_LIST_REQUEST;
}

export class UserListSuccessAction{
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload?: {data : User[]}) {
  }
}

export class UserListErrorAction{
  readonly type = USER_LIST_ERROR;
}
