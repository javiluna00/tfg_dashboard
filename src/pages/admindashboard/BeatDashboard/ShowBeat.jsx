import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect, useState } from 'react'
import ShowBeatForm from './components/ShowBeatForm'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import useBeats from '@/hooks/useBeats'
import SkeletionTable from '@/components/skeleton/Table'
function ShowBeat() {

    const {id} = useParams()
    const {AxiosPrivate} = useOutletContext()
    const {getOneBeat} = useBeats({AxiosPrivate})

    const [beat, setBeat] = useState(null)

    useEffect(() => {
        getOneBeat(id, "full").then((res) => {
            setBeat(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    return (
        <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
            <div className='container'>
                <Breadcrumbs/>
                {beat != null ? <ShowBeatForm beat={beat} editable={false} AxiosPrivate={AxiosPrivate}/> : <SkeletionTable/>}
            </div>
        </div>
    )
}

export default ShowBeat