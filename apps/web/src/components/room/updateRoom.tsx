'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import { FaEdit } from 'react-icons/fa';

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  property_id: number;
  image: string | null;
};

type Property = {
  id: number;
  name: string;
};

const UpdateRoom = ({
  room,
  properties,
}: {
  room: Room;
  properties: Property[];
}) => {
  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [price, setPrice] = useState(room.price);
  const [capacity, setCapacity] = useState(room.capacity);
  const [propertyId, setPropertyId] = useState(room.property_id);
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
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('capacity', capacity.toString());
      formData.append('property_id', propertyId.toString());
      if (image) formData.append('image', image);

      await api.put(`/room/${room.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="btn bg-[#62CDFF] btn-sm" onClick={handleModal}>
        <FaEdit size={20} />
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {room.name}</h3>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <div className="form-control w-full">
              <label className="label font-bold">Room Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Room Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Capacity"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Property</label>
              <select
                value={propertyId}
                onChange={(e) => setPropertyId(Number(e.target.value))}
                className="select select-bordered"
              >
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
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
              <button type="submit" className="btn btn-primary">
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
