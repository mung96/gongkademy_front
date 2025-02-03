import auth from '@/store/auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ auth });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
