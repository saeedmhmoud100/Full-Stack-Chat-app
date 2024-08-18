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
        const form = new FormData(e.target)
        const users = form.getAll('users')
        const data ={
            name:form.get('name'),
            description:form.get('description'),
            users
        }
        if(!data.name){
            ErrorNotifications("Group name is required")
        }

        dispatch(createGroup(data))
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