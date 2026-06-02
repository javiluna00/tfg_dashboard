import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useNavigate } from 'react-router-dom'

function MobileHUD ({
  reproductorData,
  hdlClickComprar,
  handleFavButton,
  handleLoopButton,
  handleMoveProgressBar,
  handleTooglePlayButton,
  progressBarRef,
  favved,
  porcentajePlayed,
  closeReproductor
}) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='fixed bottom-6 left-3 right-3 z-[100]'>

      {/* Panel expandido — aparece encima del mini-player */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[600px] opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0 pointer-events-none'
        }`}
      >
        <div className='bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800'>
          {/* Header del panel */}
          <div className='flex justify-between items-center px-5 pt-4 pb-2'>
            <button
              className='text-zinc-400 hover:text-white transition duration-200 p-1'
              onClick={() => setExpanded(false)}
            >
              <Icon icon='ic:baseline-expand-more' className='w-7 h-7' />
            </button>
            <div className='w-10 h-1 bg-zinc-700 rounded-full mx-auto' />
            <button
              className='text-zinc-400 hover:text-red-500 transition duration-200 p-1'
              onClick={(e) => { setExpanded(false); closeReproductor(e) }}
            >
              <Icon icon='ic:baseline-close' className='w-5 h-5' />
            </button>
          </div>

          {/* Portada */}
          <div className='flex justify-center px-5 mt-1 mb-5'>
            <img
              className='w-44 h-44 object-cover rounded-2xl shadow-xl cursor-pointer'
              src={reproductorData.song.cover_path}
              onClick={() => navigate(`/beat/${reproductorData.song.id}`)}
            />
          </div>

          {/* Nombre + info */}
          <div className='text-center px-5 mb-4'>
            <Marquee gradient={false}>
              <span
                className='text-white font-bold text-base cursor-pointer hover:underline mr-10'
                onClick={() => navigate(`/beat/${reproductorData.song.id}`)}
              >
                {reproductorData.song.name}
              </span>
            </Marquee>
            <div className='flex justify-center items-center gap-5 mt-2'>
              <div className='flex items-center gap-1 text-zinc-400 text-xs'>
                <Icon icon='ic:baseline-speed' className='w-3.5 h-3.5' />
                <span>{reproductorData.song.bpm} bpm</span>
              </div>
              <div className='flex items-center gap-1 text-zinc-400 text-xs'>
                <Icon icon='ic:baseline-music-note' className='w-3.5 h-3.5' />
                <span>{reproductorData.song.scale}</span>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className='px-5 mb-5'>
            <div
              className='relative w-full h-8 flex items-center cursor-pointer'
              ref={progressBarRef}
              onClick={handleMoveProgressBar}
            >
              <div className='w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-red-500 rounded-full transition-all duration-100'
                  style={{ width: `${porcentajePlayed}%` }}
                />
              </div>
              <div
                className='absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transition-all duration-100'
                style={{ left: `calc(${porcentajePlayed}% - 7px)` }}
              />
            </div>
          </div>

          {/* Controles principales */}
          <div className='flex justify-center items-center gap-8 px-5 mb-5'>
            <button onClick={handleFavButton}>
              {favved
                ? <Icon icon='ic:baseline-favorite' className='h-6 w-6 text-red-500' />
                : <Icon icon='ic:baseline-favorite-border' className='h-6 w-6 text-zinc-400 hover:text-red-500 transition duration-200' />}
            </button>

            <button onClick={handleTooglePlayButton}>
              {!reproductorData.isPlaying
                ? <Icon icon='ic:baseline-play-circle' className='text-white w-16 h-16 hover:text-red-500 transition duration-200' />
                : <Icon icon='ic:baseline-pause-circle' className='text-white w-16 h-16 hover:text-red-500 transition duration-200' />}
            </button>

            <button onClick={handleLoopButton}>
              <Icon
                icon='ic:twotone-loop'
                className={`w-6 h-6 transition duration-200 ${reproductorData.looping ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'}`}
              />
            </button>
          </div>

          {/* Botón comprar */}
          <div className='px-5 pb-5'>
            <Button
              className='w-full bg-red-500 text-white hover:bg-red-600 border-transparent justify-center'
              onClick={hdlClickComprar}
            >
              <div className='flex items-center justify-center gap-2'>
                <Icon icon='ic:round-shopping-cart' />
                <span className='text-sm font-semibold'>Comprar — {reproductorData.song.licenses[0].pivot.price}€</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mini-player (siempre visible) */}
      <div
        className='bg-zinc-900/95 backdrop-blur-md rounded-2xl flex items-center gap-3 px-3 py-2.5 shadow-2xl border border-zinc-700/60 cursor-pointer active:scale-[0.98] transition-transform duration-150'
        onClick={() => setExpanded(!expanded)}
      >
        {/* Portada pequeña */}
        <img
          className='h-11 w-11 object-cover rounded-xl flex-shrink-0'
          src={reproductorData.song.cover_path}
        />

        {/* Nombre + mini progress */}
        <div className='flex-1 min-w-0 overflow-hidden'>
          <Marquee gradient={false} speed={30}>
            <span className='text-white font-semibold text-sm mr-8'>{reproductorData.song.name}</span>
          </Marquee>
          <div className='w-full h-1 bg-zinc-700 rounded-full mt-1.5 overflow-hidden'>
            <div
              className='h-full bg-red-500 rounded-full transition-all duration-200'
              style={{ width: `${porcentajePlayed}%` }}
            />
          </div>
        </div>

        {/* Chevron indicador de expansión */}
        <Icon
          icon='ic:baseline-keyboard-arrow-up'
          className={`text-zinc-400 w-5 h-5 flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`}
        />

        {/* Play/Pause */}
        <button
          className='flex-shrink-0'
          onClick={(e) => {
            e.stopPropagation()
            handleTooglePlayButton()
          }}
        >
          {!reproductorData.isPlaying
            ? <Icon icon='ic:baseline-play-circle' className='text-white w-10 h-10 hover:text-red-500 transition duration-200' />
            : <Icon icon='ic:baseline-pause-circle' className='text-white w-10 h-10 hover:text-red-500 transition duration-200' />}
        </button>
      </div>
    </div>
  )
}

export default MobileHUD
