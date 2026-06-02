import { atom } from "recoil";



export const reproductorState = atom({
  key: "actualSongState",
  default: {song:null, isPlaying : false, currentDuration : 0, totalDuration : 0, percentagePlayed : 0, looping : false, volume : 0, isMuted : false},
});

