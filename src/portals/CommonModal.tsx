import React, {ChangeEvent, useState} from 'react';
import s from "./Portal.module.css";
import {useDispatch} from "react-redux";
import {addNewCardPackTC} from "../state/packs-reducer";
import ReactDOM from "react-dom";


type ModalPropsType = {
    onOpen: boolean | string;
    onClose: () => void;
    buttonTitle: string
    onAction: () => void
    title: string
    isDeleteModal: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onChange2?: (e: ChangeEvent<HTMLInputElement>) => void
    inputValue?: string
    inputValue2?: string
    isCardModal?: boolean | string
};

const CommonModal: React.FC<ModalPropsType> = ({
                                                   onOpen,
                                                   onClose,
                                                   buttonTitle,
                                                   onAction,
                                                   title,
                                                   onChange,
                                                   onChange2,
                                                   inputValue,
                                                   inputValue2,
                                                   isDeleteModal,
                                                   isCardModal
                                               }) => {
    let portal = document.getElementById('portal')
    const [packName, setPackName] = useState('')
    const dispatch = useDispatch<any>();


    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    return onOpen && portal ? ReactDOM.createPortal(
        <div className={s.modal}>
            <div className={s.modalContent}>
                <div>
                    <h2>{title}</h2>
                </div>
                {isDeleteModal
                    ? <div>
                        <div>Do you really want to remove <strong>Pack-Name&</strong></div>
                        <div>All cards will excluded from this course</div>
                    </div>
                    : isCardModal ? <div>
                            <div>
                                <label htmlFor="question">question</label>
                                <input type="text" id={'question'} value={inputValue} onChange={onChange}/>
                            </div>

                            <div>
                                <label htmlFor="answer">answer</label>
                                <input type="text" id={'answer'} value={inputValue2} onChange={onChange2}/>
                            </div>
                        </div> :
                        <div>
                            <label htmlFor="pack-name">Name Pack</label>
                            <input type="text" id={'pack-name'} value={inputValue} onChange={onChange}/>
                        </div>
                }
                <div className={s.buttonWrapper}>
                    <button className={s.cancelButton} onClick={onClose}>Cancel</button>
                    <button onClick={onAction}
                            className={isDeleteModal ? s.deleteButton : s.saveButton}>{buttonTitle}</button>
                </div>
            </div>
        </div>, portal
    ) : null;
};

export default CommonModal;