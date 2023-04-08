import { CurrentUser } from '../core/models/user.model';

export interface AppState {
  root: RootState;
}

export interface RootState {
  user: CurrentUser | null;
}

export const initialState: RootState = {
  user: null,
};
