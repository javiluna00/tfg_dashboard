import { atom } from 'recoil';

const authAtom = atom({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    
    default: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token')
    }
});

export { authAtom };