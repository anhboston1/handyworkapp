import { ActionReducerMap } from '@ngrx/store';

import * as fromChat from '../chat-ngrx/store/chat.reducers';

export interface AppState {
  chat: fromChat.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  chat: fromChat.chatReducer
};
