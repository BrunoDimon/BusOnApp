import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api/api';



const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Onde irá armazenar
    whitelist: ['theme', 'auth'], // Reducers que você deseja persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
store.subscribe(() => {
    const state = store.getState();
    const { token } = state.auth;

    if (token) {
        api.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
});
export const persistor = persistStore(store);
