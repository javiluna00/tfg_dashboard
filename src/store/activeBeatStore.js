import { atom } from "recoil";



export const activeBeatState = atom({
  key: "activeBeatState",
  default: {
    id: null, 
    name: null, 
    image: null, 
    bpm: null, 
    escala: null, 
    precio: null, 
    duration: null, 
    new: null
  },
});

