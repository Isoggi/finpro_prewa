import React from 'react';
import ModalComponent from '../modal';
import { trx_src } from '@/config/images.config';
import Image from 'next/image';
import { api } from '@/config/axios.config';
import { showAlert } from '@/lib/utils';

type Props = {
  id: string;
  invoice_number: string;
  image: string | undefined;
  token: string | undefined;
};

export default function ModalVerifyProofComponent({
  id,
  invoice_number,
  image,
  token,
}: Props) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const status = (
      (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
    ).value;
    try {
      const response = await api.post(
        '/tenant/transaction/verifyOrder',
        {
          invoice_number: invoice_number,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      showAlert({
        title: 'Berhasil',
        text: `${response.data.message}`,
        icon: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        showAlert({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }

      console.log(error);
    }

    if (dialog) dialog.close();
  }

  return (
    <>
      <button
        type="button"
        title="Konfirmasi bayar"
        className="btn btn-sm btn-primary hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          if (dialog) dialog.showModal();
        }}
      >
        Konfirmasi
      </button>
      <dialog id={id} className="modal modal-bottom lg:modal-middle">
        <div className="modal-box">
          {/* <form method="dialog">
            <button
              type="button"
              title="closeX"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form> */}
          <h3 className="font-bold text-lg">Cek Bukti Bayar</h3>
          {image ? (
            <Image
              src={`${trx_src}${image}`}
              alt="image"
              width={100}
              height={100}
            ></Image>
          ) : (
            <p className="py-4 text-red-500">Belum ada bukti bayar</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-end">
              {image && (
                <button
                  type="submit"
                  value={1}
                  className="btn btn-sm btn-primary"
                >
                  Terima
                </button>
              )}
              <button
                type="submit"
                value={0}
                className="btn btn-sm btn-warning"
              >
                Tolak
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="button" title="close">
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
