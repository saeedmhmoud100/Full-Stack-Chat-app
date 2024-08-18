import {useDispatch, useSelector} from "react-redux";
import {ErrorNotifications, SuccessNotification} from "@/hooks/Notification";
import {createGroup} from "@/lib/slices/groupsStore/groupsActions";
import LoadingButton from "@mui/lab/LoadingButton";
import {useEffect} from "react";
import {setCreateSuccess} from "@/lib/slices/groupsStore/groupsSlice";


export default function CreateGroup({performClose}){
    const {friends} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {create_loading,create_success} = useSelector(state => state.groups)
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
        console.log(create_success)
        if(create_success){
            dispatch(setCreateSuccess(false))
            SuccessNotification("Group created successfully")
            performClose()
        }
    },[create_success])


    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Group Name" name='name' className="w-full p-2 border-2 border-gray-300 rounded-md"/>
            <textarea placeholder="Group Description" name='description' className="w-full p-2 border-2 border-gray-300 rounded-md my-2"/>
          <h3 className='my-3 w-max border-b-2 border-black'>Add to group:</h3>
            <div className="h-[300px] border border-gray-500 overflow-y-auto mb-3">
                <div className='items'>
                    {
                        friends?.map(friend => (

                            <div key={friend.id} className="item m-3 py-2 border-b border-black flex items-center">
                                <input className='mx-2' type="checkbox" name="users" id={friend.id} value={friend.id}/>
                                <label htmlFor={friend.id}>{friend.username}</label>
                            </div>
                            ))
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <LoadingButton type='submit' loading={create_loading} variant='contained' className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</LoadingButton>
            </div>
        </form>
    )
}