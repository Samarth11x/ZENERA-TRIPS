import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [modal, setModal] = useState({ show: false, title: '', content: null, onConfirm: null });

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const showModal = useCallback((title, content, onConfirm = null) => {
        setModal({ show: true, title, content, onConfirm });
    }, []);

    const hideModal = useCallback(() => {
        setModal(prev => ({ ...prev, show: false }));
    }, []);

    return (
        <UIContext.Provider value={{ toasts, showToast, modal, showModal, hideModal }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within a UIProvider');
    return context;
};
