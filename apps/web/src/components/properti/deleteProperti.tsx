'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IProperties } from '@/interfaces/property.interface';
import { api } from '@/config/axios.config';
const DeleteProperti = ({ properties }: { properties: IProperties }) => {
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
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete {properties.name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(properties.id)}
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
