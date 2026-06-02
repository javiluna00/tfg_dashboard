import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { authAtom } from '@/store/authStoreBien';
import CustomAxios from '@/components/api/axios';

function useProfile() {

    const [auth, setAuth] = useRecoilState(authAtom)
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)
    const {AxiosPrivate} = CustomAxios()

    useEffect(() => {
        setProfileData(auth?.user)
    }, [auth])

    const loadProfileData = async () => {
        setLoading(true)
        AxiosPrivate.get(`/auth/profile`).then((response) => {
            const parsedData = {
                cart: response.data.cart,
                purchases: response.data.purchases,
                saves: response.data.saves,
                ...response.data.user
            }

            setProfileData(parsedData)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const setSaves = (saves) => {
        setAuth({
            ...auth,
            user: {
                ...auth.user,
                saves
            }
        })

        localStorage.setItem('user', JSON.stringify({
            ...auth.user,
            saves
        }))
    }

    const saveBeat = (id) => {
        console.log("id")
    }

    return {profileData, loadProfileData, saveBeat, loading, setSaves}

}

export default useProfile