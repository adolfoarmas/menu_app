import React, { useEffect, useState } from "react";
import {
  BtnClose,
  ModalArea,
  ModalBackArea,
  ModalHeader,
  Title,
} from "../styles/css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function useModal(textTitle) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Modal");
  // const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTitle(textTitle);
  }, []);

  const changeShow = () => {
    setShow(!show);
  };

  return {
    changeShow,
    show,
    title,
  };
}

function ModalHook({ modalHook, content }) {
  // Estado actual modalHook.show
  // Cambio del estado modalHook.changeShow

  return modalHook.show ? (
    <ModalBackArea onClick={modalHook.changeShow}>
      <ModalArea onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title> {modalHook.title} </Title>
          <BtnClose onClick={modalHook.changeShow}><FontAwesomeIcon icon={faTimes} /></BtnClose>
        </ModalHeader>
        {content}
      </ModalArea>
    </ModalBackArea>
  ) : null;
}

export default ModalHook;

export { useModal };
