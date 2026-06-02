import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function useUsers({AxiosPrivate}) {
  
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [updatedProgress, setUpdatedProgress] = useState(0)
    const navigate = useNavigate()

    const getAllUsers = async () => {
        setLoading(true)
        AxiosPrivate.get(`/user/`).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const getOneUser = async (id) => {
        return AxiosPrivate.get(`/user/${id}`).then((res) => {
            return res.data.user

        })
    }

    const getAllRoles = async () => {
        return AxiosPrivate.get(`/role/`).then((res) => {
            return res.data
        })
    }

    const updateUser = async (id, data) => {
        await AxiosPrivate.patch(`/user/${id}`, data, {
            onUploadProgress: ({loaded, total}) => {
                setUpdatedProgress(Math.round((loaded / total) * 100))
            }
        }).then((res) => {
            toast.success(res.data.message)
            navigate("/dashboard/users")
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }
  
  
    return {users, updateUser, loading, getAllUsers, getOneUser, setLoading, getAllRoles, updatedProgress}
}

export default useUsers