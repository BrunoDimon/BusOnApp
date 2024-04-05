import React, { createContext, useCallback, useContext, useState } from 'react';
import Dialog from './Dialog';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});
    const [dialogType, setDialogType] = useState(null);

    const openDialog = useCallback((type, config) => {
        setDialogConfig(config);
        setDialogType(type);
        setShowDialog(true);
    });

    const closeDialog = useCallback(() => {
        setDialogConfig({});
        setShowDialog(false);
    });

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            {showDialog && <Dialog type={dialogType} config={dialogConfig} onClose={closeDialog} />}
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};