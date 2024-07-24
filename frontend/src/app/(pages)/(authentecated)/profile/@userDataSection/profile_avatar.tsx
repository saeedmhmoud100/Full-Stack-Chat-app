import Modal from "@/app/_components/modal";
import {useEffect, useState} from "react";
import {backendUrl} from "@/hooks/serverActions/methods/customFeatch";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import Avatar from "react-avatar-edit";
import LoadingButton from "@mui/lab/LoadingButton";
import {performChangeImage, performUpdateToken} from "@/lib/slices/accountActions/accountActions";
import {resetChangeImageState} from "@/lib/slices/accountActions/accountSlice";
import {SuccessNotification} from "@/hooks/Notification";
import ProfileAvatarHook from "@/hooks/profile/ProfileAvatar-Hook";


export default function ProfileAvatar() {
    const {profile_image, changeImageLoading,changeImageModal,croppedImage,setChangeImageModal, setCroppedImage,handleOnCrop, handleImageModalClose, handleSaveImage} = ProfileAvatarHook()


    return (
        <>
            <img src={profile_image} alt="profile image" style={{width: "300px"}}/>
            <div className="layout absolute w-full h-full top-0 left-0 rounded-full flex items-center justify-center">
                <Button variant="contained" color='primary' size="large" onClick={_ => setChangeImageModal(true)}>
                    edit
                </Button>
            </div>
            <Modal open={changeImageModal} onClose={handleImageModalClose} title="Change Image">
                <div className="w-full h-full flex sm:flex-col md:flex-row sm:items-center sm:px-8">
                    <div className="md:w-2/4 sm:w-full  h-full mt-4 flex items-center flex-col items-center">
                        <img src={croppedImage} alt="profile image" style={{width: "300px"}}/>
                        <p>preview</p>
                    </div>
                    <div className="md:w-2/4 sm:w-full h-full mt-4 flex items-center ms-4 sm:my-4">
                        <Avatar
                                width={300}
                                height={300}
                                onCrop={handleOnCrop}
                                onClose={_ => setCroppedImage(profile_image)}
                                minCropRadius={2}
                                maxCropRadius={4}

                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <LoadingButton variant="contained" color='primary' size="large" onClick={handleSaveImage} loading={changeImageLoading}>
                        <span className='px-6 py-1 text-lg'>Save</span>
                    </LoadingButton>
                </div>
            </Modal>
        </>

    )
}