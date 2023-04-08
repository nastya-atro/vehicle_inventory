import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

export function appInitializer(store: Store<AppState>): () => Promise<any> {
  return () => {
    return new Promise(resolve => {});
  };
}
