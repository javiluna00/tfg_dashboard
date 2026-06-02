import { useState } from 'react'

function usePlayerAnalytics ({ AxiosPrivate }) {
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadAnalytics = (days = null) => {
    setIsLoading(true)
    const params = days ? `?days=${days}` : ''
    AxiosPrivate.get(`/analytic/player${params}`)
      .then((res) => setAnalytics(res.data))
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }

  return { analytics, isLoading, loadAnalytics }
}

export default usePlayerAnalytics
