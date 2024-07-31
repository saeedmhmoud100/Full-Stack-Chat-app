import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {performUserSearch} from "@/lib/slices/usersStore/userActions";


export default function NavbarSearch() {
    const [prevUrl, setPrevUrl] = React.useState('/')
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const handleFocusOut = (e) => {
        if(e.target.value === '')
            router.push(prevUrl)
    }

    const handleOnChange = (e) => {
        if (e.target.value === '')
            router.push(prevUrl)
        else{
        if(pathname !== '/search'){
            setPrevUrl(pathname)
            router.push('/search')
        }
        dispatch(performUserSearch({q:e.target.value}))
        }
    }

    return(
        <input
            size='small'
            onBlur={handleFocusOut}
            onChange={handleOnChange}
            className='w-full h-full px-4 text-black'
            placeholder={'Search...'}
        />
    )
}
