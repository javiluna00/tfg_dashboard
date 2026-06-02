import { authAtom } from '@/store/authStoreBien'
import Axios from 'axios'
import { useRecoilState } from 'recoil'

function useRefresh () {
  const [, setAuth] = useRecoilState(authAtom)

  const refresh = () => {
    const token = window.localStorage.getItem('token') // localStorage siempre tiene el último token aunque Recoil se haya reiniciado
    return Axios.get('http://localhost:8000/api/auth/refresh', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const newToken = res.data.access_token
      setAuth((prev) => ({ ...prev, token: newToken }))
      window.localStorage.setItem('token', newToken)
      return newToken
    }).catch((err) => {
      console.log('Error del refresh : ', err?.response?.data?.message)
    })
  }

  return { refresh }
}

export default useRefresh
