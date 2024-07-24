import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {backendUrl} from "@/hooks/serverActions/methods/customFeatch";
import {performChangeImage, performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {resetChangeImageState} from "@/lib/slices/accountActions/accountSlice";
import {SuccessNotification} from "@/hooks/Notification";
import {setAccessToken, setUserToken} from "@/hooks/localStorage";


export default function ProfileAvatarHook() {
    const {userData: {image}, changeImageLoading, changeImageSuccess,refresh_token} = useSelector(state => state.account)
    const [changeImageModal, setChangeImageModal] = useState(false)
    const [croppedImage, setCroppedImage] = useState(null)
    const [resetAccessToken, setResetAccessToken] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        setCroppedImage(backendUrl + image)
    }, [])
    const handleImageModalClose = () => {
        setChangeImageModal(false)
    }
    const handleOnCrop = (image) => {
        setCroppedImage(image)
    }

    const handleSaveImage = async () => {
        await dispatch(performChangeImage({profile_image: croppedImage}))
        setChangeImageModal(false)


    }


    useEffect(() => {
        if (changeImageSuccess) {
            dispatch(resetChangeImageState())
            SuccessNotification("Image Changed Successfully")
            setResetAccessToken(true)
        }
    }, [changeImageSuccess])

    useEffect(() => {
        if (resetAccessToken) {
            setResetAccessToken(false)
            // dispatch(performUpdateToken({refresh: refresh_token}))
        }
    }, [resetAccessToken])

    return {image, changeImageLoading,changeImageModal,croppedImage,setChangeImageModal, setCroppedImage,handleOnCrop, handleImageModalClose, handleSaveImage}
}