import { atom, selector } from 'recoil';

// Definición del estado inicial del carrito
export const profileState = atom({
  key: 'profileState', // identificador único
  default: {
    user: {},
    saves: [],
    purchases: []
  },
});



