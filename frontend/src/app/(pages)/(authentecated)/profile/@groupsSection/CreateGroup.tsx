import {useDispatch, useSelector} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import CreateGroupHook from "@/hooks/groups/CreateGroup-Hook";


export default function CreateGroup({performClose}){
    const {friends} = useSelector(state => state.user)
    const {create_loading,handleSubmit} = CreateGroupHook({performClose})


    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Group Name" name='name' className="w-full p-2 border-2 border-gray-300 rounded-md"/>
            <textarea placeholder="Group Description" name='description' className="w-full p-2 border-2 border-gray-300 rounded-md my-2"/>
            <label htmlFor="group_image">group_image</label>
            <input type='file' id='group_image' name='image' />
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