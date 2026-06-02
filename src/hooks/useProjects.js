import { useState } from 'react'
import { toast } from 'react-toastify'

function useProjects ({ AxiosPrivate }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllProjects = async () => {
    setIsLoading(true)
    await AxiosPrivate.get('/project/').then((res) => {
      setProjects(res.data)
    }).catch((err) => {
      toast.error(err.response.data.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const createProject = async (data) => {
    setIsLoading(true)
    AxiosPrivate.post('/project', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      toast.success(res.data.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const deleteProject = async (id) => {
    setIsLoading(true)
    await AxiosPrivate.delete(`/project/${id}`).then((res) => {
      setProjects(projects.filter((project) => project.id !== id))
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const updateProject = async (id, data) => {
    setIsLoading(true)
    await AxiosPrivate.post(`/project/${id}?_method=PATCH`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      toast.success(res.data.message)
      getAllProjects()
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getOneProject = async (id) => {
    setIsLoading(true)
    return await AxiosPrivate.get(`/project/${id}`).then((res) => {
      return res.data
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return { projects, getAllProjects, createProject, deleteProject, updateProject, getOneProject, isLoading }
}

export default useProjects
