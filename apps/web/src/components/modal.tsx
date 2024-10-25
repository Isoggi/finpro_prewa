import React from 'react';

type Props = {
  id: string;
  btnTitle: string;
  modalTitle?: string;
  modalDesc?: string;
  form?: React.FC;
};

export default function ModalComponent({
  id,
  btnTitle,
  modalTitle,
  modalDesc,
}: Props) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  return (
    <>
      <div
        className="hover:cursor-pointer hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          if (dialog) dialog.showModal();
        }}
      >
        {btnTitle}
      </div>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{modalDesc}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">close</button>
        </form>
      </dialog>
    </>
  );
}
