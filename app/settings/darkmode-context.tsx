import { createContext } from 'react';
import { get } from '../tools/storage';

const storedValue = get("isEnabled").then((value) => { value == 'dark' ? 'dark' : 'light' });
const DarkModeContext = createContext({
    isEnabled: 'light', 
    toggleSwitch: () => {}
});

export default DarkModeContext;