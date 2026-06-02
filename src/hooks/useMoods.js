import CustomAxios from '@/components/api/axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function useMoods () {
  const { AxiosPrivate } = CustomAxios()
  const [moods, setMoods] = useState([])
  const loadMoodsFromAPI = async () => {
    AxiosPrivate.get('/mood/').then((res) => {
      setMoods(res.data)
    })
  }

  const addMood = async (mood) => {
    await AxiosPrivate.post('/mood/', mood).then((res) => {
      setMoods([...moods, res.data.mood])
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const deleteMood = async (id) => {
    await AxiosPrivate.delete(`/mood/${id}`).then((res) => {
      setMoods(moods.filter((mood) => mood.id !== id))
      loadMoodsFromAPI()
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const updateMood = async (mood) => {
    await AxiosPrivate.patch(`/mood/${mood.id}`, mood).then((res) => {
      setMoods(moods.map((mood) => mood.id === res.data.mood.id ? res.data.mood : mood))
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  return { moods, loadMoodsFromAPI, addMood, deleteMood, updateMood }
}

export default useMoods
