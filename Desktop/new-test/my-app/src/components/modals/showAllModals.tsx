'use client'
import { useAppSelector } from "@/app/redux/store";

const ShowAllModals = () => {
    
    type ModalKeys = keyof typeof Modals;


    const Modals = {
        test:''
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