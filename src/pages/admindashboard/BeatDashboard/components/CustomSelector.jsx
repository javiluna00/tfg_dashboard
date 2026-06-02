import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import React, { useEffect, useState } from 'react'



function CustomSelector({name, values, setSelected, selected, disabled = false}) {


    const [buttons, setButtons] = useState([])

    useEffect(() => {
        if(values) {
            setButtons(values.map((value) => {
                return {text: value.name, value: value.name, active: selected.includes(value.name), key: value.id}
            }))
        }
    }, [values, selected])


    return (
        <div className='w-full flex flex-col justify-start items-start'>
            <Modal
            title={`Selecciona los ${name}`}
            label={name}
            disabled={disabled}
            centered
            labelClass="bg-white text-slate-900 btn-outline-dark"
            uncontrol
            >
                <div className='flex flex-wrap gap-2'>
                    {buttons.map((button, index) => {
                        return (
                            <Button
                            key={index}
                            text={button.text}
                            className={`btn-outline-dark btn-sm ${selected.includes(button.value) ? "active" : ""}`}
                            disabled={disabled}
                            onClick={() => {
                            setSelected(selected.includes(button.value) ? selected.filter(m => m !== button.value) : [...selected, button.value])
                            }}
                            />
                        )
                    })}
                </div>
            </Modal>

            <div className='w-full'>
                <span className='text-xs text-slate-900 font-medium'>Seleccionados : </span>
                {selected.length === 0 && <span className='text-xs text-slate-900 font-medium mb-2.5 ml-2'>Ninguno</span>}
                {selected.map((select, index) => {
                    return (
                        <span key={index} className='text-xs text-slate-900 font-medium mb-2.5 ml-2'>{select}</span>
                    )
                })}
            </div>
        </div>

    )
}

export default CustomSelector