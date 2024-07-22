import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {performLogout} from "@/lib/slices/accountActions/accountSlice";


export const LogoutHook = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = () => {
        dispatch(performLogout());
        router.push('/');
    }

    return {logout}
}