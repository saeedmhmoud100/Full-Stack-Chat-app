import {useDispatch, useSelector} from "react-redux";
import {ErrorNotifications, SuccessNotification} from "@/hooks/Notification";
import {createGroup} from "@/lib/slices/groupsStore/groupsActions";
import {useEffect} from "react";
import {setCreateSuccess} from "@/lib/slices/groupsStore/groupsSlice";


export default function CreateGroupHook({performClose}){
    const {create_loading,create_success} = useSelector(state => state.groups)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        const users = Array.from(e.target.users).filter(item => item.checked).map(item => item.value)
        const name = e.target.name.value.trim()
        const description = e.target.description.value
        const image = e.target.image.files[0]
        formData.append('name', name)
        formData.append('description', description)
        if(image) formData.append('image', image)
        users.forEach(user => {
            formData.append('users', user)
        })

        if (!name) {
            ErrorNotifications("Group name is required")
        } else {
            dispatch(createGroup(formData))
        }
    }

    useEffect(() => {
        if(create_success){
            dispatch(setCreateSuccess(false))
            SuccessNotification("Group created successfully")
            performClose()
        }
    },[create_success])


    return {create_loading,handleSubmit}
}