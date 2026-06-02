import React from 'react'

const Card = ({
  children,
  title,
  subtitle,
  headerslot,
  className = 'custom-class',
  bodyClass = 'p-6',
  noborder,
  titleClass = 'custom-class'
}) => {
  return (
    <div
      className={`
      w-72
        card rounded-lg  dark:bg-slate-800   
        }
   
    ${className}
        `}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? 'no-border' : ''}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className='card-subtitle'>{subtitle}</div>}
          </div>
          {headerslot && <div className='card-header-slot'>{headerslot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass} w-auto`}>{children}</main>
    </div>
  )
}

export default Card
