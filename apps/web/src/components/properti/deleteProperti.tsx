'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
import { MdDelete } from 'react-icons/md';
const DeleteProperti = ({ id, name }: { id: number; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (propertiesId: number) => {
    try {
      setIsLoading(true);
      await api.delete(`/properti/${propertiesId}`);
      setIsLoading(false);
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Error deleting properti:', error);
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={() => setIsOpen(true)}>
        <MdDelete size={20} />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {name}?</h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProperti;
