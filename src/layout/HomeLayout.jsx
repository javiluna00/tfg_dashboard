import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import HomeHeader from '@/components/partials/homeheader'
import { Outlet } from 'react-router-dom'
import Loading from '@/components/Loading'
import Reproductor from '@/components/partials/reproductor'
import Footer from '@/components/partials/footer'
import useAuthBien from '@/hooks/useAuthBien'
import CustomAxios from '@/components/api/axios'

function HomeLayout () {
  const [modalBeat, setModalBeat] = React.useState(false)
  const [activeBeat, setActiveBeat] = React.useState({})
  const { AxiosPrivate } = CustomAxios()

  const { auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin, sendForgotPassword, sendNewPassword } = useAuthBien()

  if (AxiosPrivate) {
    return (
      <>

        <ToastContainer className='mt-[64px]' />
        <HomeHeader isAuthenticated={isAuthenticated} isAdmin={isAdmin} AxiosPrivate={AxiosPrivate} auth={auth} />
        <Suspense fallback={<Loading />}>
          <Outlet context={{ setActiveBeat, setModalBeat, auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin, AxiosPrivate, sendForgotPassword, sendNewPassword }} />
        </Suspense>
        <Reproductor setActiveBeat={setActiveBeat} setModalBeat={setModalBeat} AxiosPrivate={AxiosPrivate} />
        <Footer />

      </>
    )
  }
}

export default HomeLayout
