import React from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

function RestrictedAdminRoutes () {
  const { isAdmin, auth, AxiosPrivate } = useOutletContext()

  if (!isAdmin()) {
    return <Navigate to='/404' />
  } else {
    return (
      <Outlet context={{ auth, AxiosPrivate }} />
    )
  }
}

export default RestrictedAdminRoutes
