import React, { useEffect, useRef } from 'react'
import useReproductor from '@/hooks/useReproductor'
import '@/components/partials/reproductor/index.css'
import 'react-h5-audio-player/lib/styles.css'
import useWidth from '@/hooks/useWidth'
import WideHUD from './wideHUD'
import MobileHUD from './mobileHUD'
import useProfile from '@/hooks/useProfile'

function Reproductor ({ setActiveBeat, setModalBeat, AxiosPrivate }) {
  const { reproductorData, setData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume, closeReproductor, toogleFav, favved } = useReproductor({ AxiosPrivate })

  const { saveBeat } = useProfile({ AxiosPrivate })
  const { width, breakpoints } = useWidth()
  const audioRef = useRef()
  const progressBarRef = useRef()

  useEffect(() => {
    if (reproductorData.song) {
      if (reproductorData.isPlaying === true) {
        console.log('Reproduciendo')
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [reproductorData.isPlaying])

  useEffect(() => {
    if (audioRef.current) { audioRef.current.volume = reproductorData.volume / 100 }
  }, [reproductorData.volume])

  useEffect(() => {
    if (reproductorData.song) {
      if (reproductorData.isMuted === true) {
        audioRef.current.muted = true
      } else {
        audioRef.current.muted = false
      }
    }
  }, [reproductorData.isMuted])

  const hdlClickComprar = () => {
    setModalBeat(true)
    setActiveBeat(reproductorData.song)
  }

  const handleLoopButton = (e) => {
    setLooping(!reproductorData.looping)
  }

  const handleFavButton = async (e) => {
    await toogleFav(reproductorData.song.id)
    await saveBeat(reproductorData.song.id)
  }
  const handleMuteButton = (e) => {
    toogleMute()
  }
  const handleTooglePlayButton = () => {
    tooglePlay()
  }

  const handleMoveProgressBar = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newTime = x / progressBarRef.current.offsetWidth * reproductorData.totalDuration

    // Pausar el audio antes de cambiar la posición para evitar superposición
    const wasPlaying = !audioRef.current.paused
    audioRef.current.pause()

    // Cambiar la posición
    audioRef.current.currentTime = newTime

    // Si estaba reproduciéndose, reanudar la reproducción
    if (wasPlaying && reproductorData.isPlaying) {
      audioRef.current.play()
    }
  }

  if (reproductorData.song) {
    return (
      <>
        <audio
          src={reproductorData.song_file}
          controls={false}
          ref={audioRef}
          onEnded={() => setData({ ...reproductorData, isPlaying: false })}
          onTimeUpdate={(e) => setData({ ...reproductorData, currentDuration: e.target.currentTime })}
          onLoadedMetadata={(e) => setData({ ...reproductorData, totalDuration: e.target.duration, isPlaying: true })}
          loop={reproductorData.looping}
        />

        {width > breakpoints.md
          ? (
            <div className='audio-player w-full fixed bottom-4 flex justify-center items-center'>
              <WideHUD
                reproductorData={reproductorData}
                hdlClickComprar={hdlClickComprar}
                handleFavButton={handleFavButton}
                handleMuteButton={handleMuteButton}
                handleTooglePlayButton={handleTooglePlayButton}
                handleLoopButton={handleLoopButton}
                handleMoveProgressBar={handleMoveProgressBar}
                audioRef={audioRef}
                progressBarRef={progressBarRef}
                favved={favved}
                porcentajePlayed={porcentajePlayed}
                closeReproductor={closeReproductor}
                setVolume={setVolume}
              />
            </div>
            )
          : (
            <MobileHUD
              reproductorData={reproductorData}
              hdlClickComprar={hdlClickComprar}
              handleFavButton={handleFavButton}
              handleMuteButton={handleMuteButton}
              handleTooglePlayButton={handleTooglePlayButton}
              handleLoopButton={handleLoopButton}
              handleMoveProgressBar={handleMoveProgressBar}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              favved={favved}
              porcentajePlayed={porcentajePlayed}
              closeReproductor={closeReproductor}
            />
            )}
      </>
    )
  } else {
    return (<></>)
  }
}

export default Reproductor
