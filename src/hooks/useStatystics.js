import CustomAxios from '@/components/api/axios'
import { useState } from 'react'

function useStatystics () {
  const [isLoading, setIsLoading] = useState(false)
  const [statistics, setStatistics] = useState({})

  const { AxiosPrivate } = CustomAxios()

  const loadStatysticsFromAPI = () => {
    setIsLoading(true)
    AxiosPrivate.get('/statistic/').then((res) => {
      setStatistics({
        totalMoney: res.data.totalMoney,
        soldBeats: res.data.soldBeats,
        mensualGrowthByMoney: res.data.mensualGrowthByMoney,
        mensualGrowthByNumberOfPurchases: res.data.mensualGrowthByNumberOfPurchases,
        earnsByMonthLastSixMonths: res.data.earnsByMonthLastSixMonths.reverse(),
        soldBeatsByMonthLastSixMonths: res.data.soldBeatsByMonthLastSixMonths.reverse()
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return { isLoading, loadStatysticsFromAPI, statistics }
}

export default useStatystics
