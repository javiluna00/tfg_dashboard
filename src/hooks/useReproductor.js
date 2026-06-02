import { useRecoilState } from 'recoil'
import { reproductorState } from '@/store/reproductorStore'
import { useEffect, useRef, useCallback, useState } from 'react'
import useProfile from './useProfile'
import { authAtom } from '@/store/authStoreBien'
import CustomAxios from '@/components/api/axios'

const useReproductor = () => {
  const { AxiosPrivate } = CustomAxios()
  const [data, setData] = useRecoilState(reproductorState)
  const [shown, setShown] = useState(false)
  const [favved, setFavved] = useState()
  const [porcentajePlayed, setPorcentagePlayed] = useState(0)
  const { setSaves } = useProfile({ AxiosPrivate })
  const [auth] = useRecoilState(authAtom)

  // Analytics refs — evitan stale closures en beforeunload y entre renders
  const playIdRef    = useRef(null)
  const listenRef    = useRef({ percent: 0, seconds: 0 })

  // Mantener listenRef sincronizado con el estado de reproducción actual
  useEffect(() => {
    if (data.song != null && data.currentDuration != null && data.totalDuration != null && data.totalDuration > 0) {
      const pct = Math.round(data.currentDuration / data.totalDuration * 100)
      setPorcentagePlayed(pct)
      listenRef.current = { percent: Math.min(pct, 100), seconds: data.currentDuration }
    }
  }, [data.currentDuration, data.totalDuration])

  useEffect(() => {
    if (data?.song != null && auth?.user != null) {
      if (auth.user.saves.filter((beat) => beat.id === data.song.id).length > 0) {
        setFavved(true)
      } else {
        setFavved(false)
      }
    }
  }, [data.song])

  /**
   * Envía el resumen de escucha al backend.
   * Usa fetch con keepalive=true para que funcione también durante el unload.
   */
  const sendListenEnd = useCallback(() => {
    console.log("Entra aqui")
    const id = playIdRef.current
    const { percent, seconds } = listenRef.current
    if (!id || seconds < 2) return  // Ignorar escuchas < 2 segundos

    fetch(`${import.meta.env.VITE_API_URL}/api/beatAction/listen-end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ play_id: id, listen_seconds: seconds, listen_percent: percent }),
      keepalive: true,  // Permite que la petición survive al unload de la página
    }).catch(() => {})

    playIdRef.current = null
    listenRef.current = { percent: 0, seconds: 0 }
  }, [])

  // Enviar datos de escucha cuando el usuario cierra/recarga la pestaña
  useEffect(() => {
    window.addEventListener('beforeunload', sendListenEnd)
    return () => window.removeEventListener('beforeunload', sendListenEnd)
  }, [sendListenEnd])

  const setLooping = (value) => {
    setData({ ...data, looping: value })
  }
  const toogleMute = () => {
    setData({ ...data, isMuted: !data.isMuted })
  }
  const setVolume = (value) => {
    setData({ ...data, volume: value })
  }
  const tooglePlay = () => {
    setData({ ...data, isPlaying: !data.isPlaying })
  }

  const closeReproductor = () => {
    sendListenEnd()
    setData({ ...data, song: null, isPlaying: false, currentDuration: 0, totalDuration: 0, looping: false, volume: 100, isMuted: false })
    setShown(false)
  }

  const reproducirCancion = (song) => {
    console.log("VAMOS A VER")
    // Cerrar sesión de escucha anterior antes de iniciar la nueva
    sendListenEnd()

    if (song != null) {
      setData({
        ...data,
        song,
        isPlaying: false,
        currentDuration: 0,
        totalDuration: 0,
        looping: false,
        volume: 100,
        isMuted: false,
      })

      AxiosPrivate.get(`/beat/${song.id}/tagged`, { responseType: 'blob' })
        .then((res) => {
          const audioBlob = new Blob([res.data], { type: 'audio/mpeg' })
          const audioUrl  = URL.createObjectURL(audioBlob)

          setData(prevData => ({
            ...prevData,
            song_file: audioUrl,
            isPlaying: true,
          }))
          setShown(true)

          // Registrar reproducción y guardar play_id para analytics
          AxiosPrivate.post('/beatAction/play', { beat_id: song.id })
            .then((res) => {
              playIdRef.current = res.data?.play_id ?? null
              listenRef.current = { percent: 0, seconds: 0 }
            })
            .catch(() => {})
        })
        .catch(() => {
          setData({
            song: null,
            isPlaying: false,
            currentDuration: 0,
            totalDuration: 0,
            looping: false,
            volume: 100,
            isMuted: false,
          })
        })
    } else {
      setData({ song: null, isPlaying: false, currentDuration: 0, totalDuration: 0, looping: false, volume: 100, isMuted: false })
      setPorcentagePlayed(0)
      setShown(false)
    }
  }

  const toogleFav = () => {
    if (data.song != null) {
      setFavved(!favved)
      AxiosPrivate.post('/beatAction/save', { beat_id: data.song.id }).then((res) => {
        setSaves(res.data.saves)
      })
    }
  }

  return {
    reproductorData: data,
    setData,
    setReproductorData: () => {},
    porcentajePlayed,
    setLooping,
    toogleMute,
    tooglePlay,
    setVolume,
    shown,
    closeReproductor,
    reproducirCancion,
    toogleFav,
    favved,
  }
}

export default useReproductor
