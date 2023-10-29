import React from "react";

const Modal = ({ styles, Button, data, modalBody }) => {
  return (
    <div className={`flex items-center ${styles}`}>
      <button onClick={() => document.getElementById(data?.id).showModal()}>
        {Button}
      </button>
      <dialog id={data?.id} className="modal">
        <div className="modal-box bg-[#1d1836]">{modalBody}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
