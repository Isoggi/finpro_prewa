'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';

type Category = {
  id: number;
  name: string;
};

interface Address {
  id: number;
  lng: number;
  lat: number;
  province_id: number;
  district_id: number;
  detail: string | null;
}
type Properties = {
  id: number;
  name: string;
  image: string;
  description: string;
  addressId: number;
  categoryId: number;
  category: {
    name: string;
  };
  address: {
    detail: string;
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
  const [category, setCategory] = useState(categories?.[0]?.id);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/properti/${properties.id}`, {
        name: name,
        description: description,
        categoryId: Number(category),
        addressesId: Number(selectedAddress),
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
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {properties.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Properti Name</label>
              <input
                type="text"
                name="name"
                value={properties.name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Property Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                name="description"
                value={properties.description}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Category</label>
              <select
                name="categoryId"
                value={properties.categoryId}
                onChange={(e) => setCategory(Number(e.target.value))}
                className="select select-bordered"
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Address</label>
              <select
                name="addressId"
                value={properties.addressId}
                onChange={(e) => setSelectedAddress(Number(e.target.value))}
                className="select select-bordered"
              >
                {addresses.map((address) => (
                  <option value={address.id} key={address.id}>
                    {address.detail}
                  </option>
                ))}
              </select>
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
