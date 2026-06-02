import CustomAxios from '@/components/api/axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

function useGenres () {
  const { AxiosPrivate } = CustomAxios()
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadGenresFromAPI = async () => {
    setIsLoading(true)
    AxiosPrivate.get('/genre/').then((res) => {
      setGenres(res.data)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const addGenre = async (genre) => {
    setIsLoading(true)
    await AxiosPrivate.post('/genre/', genre).then((res) => {
      setGenres([...genres, res.data.genre])
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const deleteGenre = async (id) => {
    setIsLoading(true)
    await AxiosPrivate.delete(`/genre/${id}`).then((res) => {
      setGenres(genres.filter((genre) => genre.id !== id))
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const updateGenre = async (genre) => {
    setIsLoading(true)
    await AxiosPrivate.patch(`/genre/${genre.id}`, genre).then((res) => {
      setGenres(genres.map((genre) => genre.id === res.data.genre.id ? res.data.genre : genre))
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return { genres, loadGenresFromAPI, addGenre, deleteGenre, updateGenre, isLoading }
}

export default useGenres
