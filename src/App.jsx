import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'

import HomeLayout from './layout/HomeLayout'
import RestrictedAdminRoutes from '@/pages/restrictedroutes/RestrictedAdminRoutes'
import VerifyAccount from '@/pages/verifyaccount/'

// home pages  & dashboard
// import Dashboard from "./pages/dashboard";

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const ForgotPassword = lazy(() => import('./pages/forgotpassword'))
const ResetPassword = lazy(() => import('./pages/forgotpassword/ResetPassword'))

const AdminDashboard = lazy(() => import('./pages/admindashboard'))
const EditBeat = lazy(() => import('./pages/admindashboard/BeatDashboard/EditBeat'))
const ShowBeat = lazy(() => import('./pages/admindashboard/BeatDashboard/ShowBeat'))

const BeatDashboard = lazy(() => import('./pages/admindashboard/BeatDashboard/BeatDashboard'))
const Newbeat = lazy(() => import('./pages/admindashboard/BeatDashboard/NewBeat'))

const UserDashboard = lazy(() => import('./pages/admindashboard/UserDashboard/UserDashboard'))
const ShowUser = lazy(() => import('./pages/admindashboard/UserDashboard/ShowUser'))
const EditUser = lazy(() => import('./pages/admindashboard/UserDashboard/EditUser'))

const ProjectDashboard = lazy(() => import('./pages/admindashboard/ProjectDashboard/ProjectDashboard'))
const NewProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/NewProject'))
const ShowProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/ShowProject'))
const EditProject = lazy(() => import('./pages/admindashboard/ProjectDashboard/EditProject'))

const ContactDashboard = lazy(() => import('./pages/admindashboard/ContactDashboard/ContactDashboard'))
const ShowContact = lazy(() => import('./pages/admindashboard/ContactDashboard/ShowContact'))

const PurchasesDashboard = lazy(() => import('./pages/admindashboard/PurchasesDashboard/PurchasesDashboard'))

const ManageMoods = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageMoods'))
const ManageGenres = lazy(() => import('./pages/admindashboard/BeatDashboard/ManageGenres'))

const CouponDashboard = lazy(() => import('./pages/admindashboard/CouponDashboard/CouponDashboard'))
const NewCoupon = lazy(() => import('./pages/admindashboard/CouponDashboard/NewCoupon'))
const EditCoupon = lazy(() => import('./pages/admindashboard/CouponDashboard/EditCoupon'))

const PlayerAnalyticsDashboard = lazy(() => import('./pages/admindashboard/PlayerAnalyticsDashboard/PlayerAnalyticsDashboard'))

const Error = lazy(() => import('./pages/404'))
const ComingSoonPage = lazy(() => import('./pages/utility/coming-soon'))
const UnderConstructionPage = lazy(() =>
  import('./pages/utility/under-construction')
)
function App () {
  return (
    <main className='App relative'>
      <Routes>

        <Route path='/*' element={<HomeLayout />}>
          <Route index element={<Login />} />
          <Route path='verify' element={<VerifyAccount />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />

          <Route path='dashboard' element={<RestrictedAdminRoutes />}>
            <Route index element={<AdminDashboard />} />

            <Route path='beats'>
              <Route index element={<BeatDashboard />} />
              <Route path='new' element={<Newbeat />} />
              <Route path='edit/:id' element={<EditBeat />} />
              <Route path='show/:id' element={<ShowBeat />} />
              <Route path='moods' element={<ManageMoods />} />
              <Route path='genres' element={<ManageGenres />} />
            </Route>

            <Route path='contacts'>
              <Route index element={<ContactDashboard />} />
              <Route path='show/:id' element={<ShowContact />} />
            </Route>

            <Route path='projects'>
              <Route index element={<ProjectDashboard />} />
              <Route path='new' element={<NewProject />} />
              <Route path='show/:id' element={<ShowProject />} />
              <Route path='edit/:id' element={<EditProject />} />
            </Route>

            <Route path='users'>
              <Route index element={<UserDashboard />} />
              <Route path=':id' element={<ShowUser />} />
              <Route path='edit/:id' element={<EditUser />} />
            </Route>

            <Route path='purchases'>
              <Route index element={<PurchasesDashboard />} />
            </Route>

            <Route path='coupons'>
              <Route index element={<CouponDashboard />} />
              <Route path='new' element={<NewCoupon />} />
              <Route path='edit/:id' element={<EditCoupon />} />
            </Route>

            <Route path='analytics'>
              <Route index element={<PlayerAnalyticsDashboard />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/404' />} />
        </Route>
        <Route
          path='/404'
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path='/coming-soon'
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path='/under-construction'
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  )
}

export default App
