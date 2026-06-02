import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { authAtom } from '@/store/authStoreBien'
import { useRecoilState } from 'recoil'
import CustomAxios from '@/components/api/axios'

const useAuthBien = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(authAtom)
  const { Axios, AxiosGoogle, AxiosPrivate } = CustomAxios()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('Auth es : ', auth)
  }, [auth])

  const isAdmin = () => {
    if (isAuthenticated() && jwtDecode(auth?.token).roles?.some((role) => role === 'admin')) { return true }

    return false
  }

  const logOut = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    setAuth(null)
    navigate('/')
  }

  const logIn = ({ email, password }) => {
    setLoading(true)

    return Axios.post('/auth/login', {
      email,
      password
    })
      .then((res) => {
        setLoading(false)

        const parsedData = {
          token: res.data.token,
          user: {
            saves: res.data.saves,
            purchases: res.data.purchases,
            ...res.data.user
          }
        }
        window.localStorage.setItem('token', parsedData.token)
        window.localStorage.setItem('user', JSON.stringify(parsedData.user))
        setAuth(parsedData)
        navigate('/dashboard')
        return { message: 'Sesión iniciada', error: null }
      })
      .catch((err) => {
        setLoading(false)
        // toast.error(err.response.data.error)
        return { message: null, error: err.response.data.error }
      })
  }

  const googleLogin = async (accessToken) => {
    return AxiosGoogle.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      }
    )
      .then((resGoogle) => {
        return Axios.post('/auth/check-user-google', {
          google_id: resGoogle.data.id,
          email: resGoogle.data.email
        })
          .then((res) => {
            if (Object.keys(res.data).length === 0) {
              return {
                message: 'not registered',
                resGoogle,
                accessToken
              }
            } else {
              endGoogleLogin(accessToken, res.data)
              return 'registered'
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })
      })
      .catch((err) => toast.error(err))
    // Llamada a la función del hook
  }

  const endGoogleLogin = (accessToken, res, artistName) => {
    const { id, google_id, ...userWithoutId } = res

    const user = {
      ...userWithoutId,
      artist_name: artistName || null,
      google_id
    }

    Axios.post('/auth/login-oauth', {
      user,
      token: accessToken
    }).then((res) => {
      const parsedData = {
        token: res.data.token,
        user: {
          saves: res.data.saves,
          purchases: res.data.purchases,
          ...res.data.user
        }
      }
      setAuth(parsedData)
      window.localStorage.setItem('token', parsedData.token)
      window.localStorage.setItem('user', JSON.stringify(parsedData.user))
      navigate('/dashboard')
      toast.success('Sesión iniciada')
    })
  }

  const register = async ({
    email,
    name,
    password,
    artistName,
    passwordConfirmation
  }) => {
    setLoading(true)
    return await Axios.post('/auth/register', {
      email,
      name,
      password,
      artistName,
      passwordConfirmation
    })
      .then((res) => {
        setLoading(false)
        return { err: null, message: res.data.message }
      })
      .catch((err) => {
        setLoading(false)
        return { err: err.response.data, message: null }
      })
  }

  const isAuthenticated = () => {
    return !!auth?.token
  }

  const verifyAccount = (token) => {
    setLoading(true)
    return Axios.post('/auth/verify/', {
      token
    })
      .then((res) => {
        console.log('Res : ', res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const sendForgotPassword = ({ email }) => {
    return AxiosPrivate.post('/auth/forgot-password', {
      email
    }).then((res) => {
      return { err: null, message: res.data.message }
    }).catch((err) => {
      return { err: err.response.data, message: null }
    })
  }

  const sendNewPassword = ({ token, password, passwordConfirmation }) => {
    return AxiosPrivate.post('/auth/reset-password', {
      reset_password_token: token,
      password,
      password_confirmation: passwordConfirmation
    }).then((res) => {
      return { err: null, message: res.data.message }
    }).catch((err) => {
      return { err: err.response.data, message: null }
    })
  }

  return {
    auth,
    logIn,
    logOut,
    register,
    isAuthenticated,
    loading,
    isAdmin,
    endGoogleLogin,
    googleLogin,
    verifyAccount,
    sendForgotPassword,
    sendNewPassword
  }
}

export default useAuthBien
