import Modal from "@/app/_components/modal";
import {useEffect, useState} from "react";
import {backendUrl} from "@/hooks/serverActions/methods/customFeatch";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import Avatar from "react-avatar-edit";


export default function ProfileAvatar() {
    const {userData: {image}} = useSelector(state => state.account)
    const [changeImageModal, setChangeImageModal] = useState(false)
    const [croppedImage, setCroppedImage] = useState(null)

    useEffect(() => {
        setCroppedImage(backendUrl + image)
    }, [])

    const handleImageModalClose = () => {
        setChangeImageModal(false)
    }


    const handleOnCrop = (image) => {
        setCroppedImage(image)
    }


    return (
        <>
            <img src={backendUrl + image} alt="profile image" style={{width: "300px"}}/>
            <div className="layout absolute w-full h-full top-0 left-0 rounded-full flex items-center justify-center">
                <Button variant="contained" color='primary' size="large" onClick={_ => setChangeImageModal(true)}>
                    edit
                </Button>
            </div>
            <Modal open={changeImageModal} onClose={handleImageModalClose} title="Change Image">
                <div className="w-full h-full flex">
                    <div className="w-2/4 h-full mt-4 flex items-center flex-col items-center">
                        <img src={croppedImage} alt="profile image" style={{width: "300px"}}/>
                        <p>preview</p>
                    </div>
                    <div className="w-2/4 h-full mt-4 flex items-center ms-4">
                        <Avatar
                                width={300}
                                height={300}
                                onCrop={handleOnCrop}
                                onClose={_ => setCroppedImage(backendUrl + image)}
                                minCropRadius={2}
                                maxCropRadius={4}

                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button variant="contained" color='primary' size="large" onClick={_ => setChangeImageModal(false)}>
                        <span className='px-6 py-1 text-lg'>Save</span>
                    </Button>
                </div>
            </Modal>
        </>

    )
}