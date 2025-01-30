import DarkModeContext from './darkmode-context';
import { get, save } from '../tools/storage';
import { useState, useEffect, useMemo } from 'react';

export const DarkModeProvider = ({children}:any) => {
    //const storedValue = get("isEnabled").then((value) => { value == 'dark' ? 'dark' : 'light' });
    const [isEnabled, setIsEnabled] = useState('light');

    const toggleSwitch = () => {
        setIsEnabled((preValue)=>(preValue === 'dark' ? 'light' : 'dark'));
        console.log('toggled!!')
        console.log(isEnabled);
        save("isEnabled", isEnabled);
    }

    const value = useMemo(() => ({ isEnabled, toggleSwitch }), [isEnabled]);

    return (
        
        <DarkModeContext.Provider value={value}>
            {children}
        </DarkModeContext.Provider>
    );
};