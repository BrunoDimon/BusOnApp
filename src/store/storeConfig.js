import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';



const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Onde irá armazenar
    whitelist: ['theme'], // Reducers que você deseja persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
