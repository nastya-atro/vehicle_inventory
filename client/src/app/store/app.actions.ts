import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../core/models/user.model';

export const enum AppActionsTypes {
  UserFindProfileSuccess = '[UserSession] Find User Session Success',
  ClearStoreData = '[APP] Clear Store Data',
}

export const findUserProfileSuccess = createAction(
  AppActionsTypes.UserFindProfileSuccess,
  props<{ user: CurrentUser }>()
);

export const clearStoreData = createAction(AppActionsTypes.ClearStoreData);
