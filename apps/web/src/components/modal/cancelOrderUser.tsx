import { api } from '@/config/axios.config';
import { showAlert } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = { id: string; invoice_number: string; token: string };

export default function cancelOrderUser({ id, invoice_number, token }: Props) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const status = (
      (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
    ).value;
    if (!status) {
      dialog?.close();
      return;
    }
    try {
      const response = await api.post(
        '/order/cancel',
        {
          invoice_number: invoice_number,
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
          <h3 className="font-bold text-lg text-warning">
            Batalkan pesanan ini?
          </h3>
          <p className="text-info-content">
            Anda tidak bisa melanjutkan pesanan ini jika anda membatalkan.
            Pembatalan ini tidak bisa ditangguhkan.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-end">
              (
              <button
                type="submit"
                value={1}
                className="btn btn-sm btn-primary"
              >
                Konfirmasi
              </button>
              )
              <button
                type="submit"
                value={0}
                className="btn btn-sm btn-warning"
              >
                Kembali
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
