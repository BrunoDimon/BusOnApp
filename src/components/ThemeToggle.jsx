import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/themeSlice';
import { Switch } from '@gluestack-ui/themed';

export default ThemeToggle = () => {
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    return (
        <Switch onToggle={handleThemeToggle} value={theme === 'dark'} offTrackColor="dark.200" onTrackColor="light.200" onThumbColor="dark.500" offThumbColor="light.300" />
    );
};
