'use client'
import { useAppSelector } from "@/app/redux/store";
import testModal from "./testModal";
import TestModal from "./testModal";
import AddImage from "./addImageDocument";
import DeleteModal from "./deleteModal";

const ShowAllModals = () => {
    
    type ModalKeys = keyof typeof Modals;


    const Modals = {
        TestModal:TestModal,
        AddImage:AddImage,
        DeleteModal:DeleteModal
    }
    const show = useAppSelector(state => state.utils.show)

    if (show !== null) {

        const CurrentModal = Modals[show as ModalKeys]

        if (CurrentModal) {
            return <CurrentModal />
        } else {
            return null;
        }
    }


    return null;
}

export default ShowAllModals