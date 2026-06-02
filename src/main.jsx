import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'simplebar-react/dist/simplebar.min.css'
import 'flatpickr/dist/themes/light.css'
import './assets/scss/app.scss'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Elements stripe={stripePromise}>
      <GoogleOAuthProvider clientId='580307751006-9umaamkk0nmhadd739l92f1gacv4pqmm.apps.googleusercontent.com'>
        <BrowserRouter>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Elements>
  </>
)
