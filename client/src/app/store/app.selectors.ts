import { createSelector } from '@ngrx/store';
import { AppState, RootState } from './app.state';
import { CurrentUser } from '../core/models/user.model';

export const selectRoot = (state: AppState): RootState => state.root;

export const selectUser = createSelector<AppState, RootState, CurrentUser | null>(
  selectRoot,
  (state: RootState) => state.user
);
