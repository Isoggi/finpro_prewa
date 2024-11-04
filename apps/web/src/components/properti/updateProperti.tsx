'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { FaEdit } from 'react-icons/fa';
type Category = {
  id: number;
  name: string;
};

interface Address {
  id: number;
  detail: string | null | undefined;
}

type Properties = {
  id: number;
  name: string;
  description: string | null | undefined;
  category_id: number;
  address_id: number;
  image: string | null;
  category?: {
    name: string;
  };
  address?: {
    detail: string | null | undefined;
  };
};

const UpdateProperti = ({
  addresses,
  properties,
  categories,
}: {
  categories: Category[];
  addresses: Address[];
  properties: Properties;
}) => {
  const [name, setName] = useState(properties.name);
  const [description, setDescription] = useState(properties.description);
  const [category, setCategory] = useState(properties.category_id);
  const [address, setAddress] = useState(properties.address_id);
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', (description ?? '').toString());
      formData.append('category_id', category.toString());
      formData.append('address_id', address.toString());
      if (image) formData.append('image', image);

      await api.put(`/properti/${properties.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating property:', error);
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn bg-[#62CDFF] btn-sm" onClick={handleModal}>
        <FaEdit size={20} />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {properties.name}</h3>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <div className="form-control w-full">
              <label className="label font-bold">Property Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Property Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={description ?? ''}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                className="select select-bordered"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Address</label>
              <select
                value={address}
                onChange={(e) => setAddress(Number(e.target.value))}
                className="select select-bordered"
              >
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.detail}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperti;
