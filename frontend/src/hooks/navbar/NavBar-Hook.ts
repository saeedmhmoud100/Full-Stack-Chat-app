import {useSelector} from "react-redux";


export default function NavBarHook () {
    const {isLogged} = useSelector((state) => state.account);

    return [isLogged];
}