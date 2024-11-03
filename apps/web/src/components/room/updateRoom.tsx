'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import type { IRooms } from '@/interfaces/property.interface';
import type { IProperties } from '@/interfaces/property.interface';

interface UpdateRoomProps {
  room: IRooms;
  properties: IProperties[];
}

const UpdateRoom = ({ room, properties }: UpdateRoomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [price, setPrice] = useState(room.price.toString());
  const [capacity, setCapacity] = useState(room.capacity.toString());
  const [selectedProperty, setSelectedProperty] = useState(
    room.properties?.id.toString(),
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const validateForm = () => {
    if (!name.trim()) return 'Room name is required';
    if (!description.trim()) return 'Description is required';
    if (!price || isNaN(Number(price))) return 'Valid price is required';
    if (!capacity || isNaN(Number(capacity)))
      return 'Valid capacity is required';
    if (!selectedProperty) return 'Property is required';
    return null;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('capacity', capacity);
    formData.append('property_id', selectedProperty);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await api.put(`/room/${room.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccess('Room updated successfully!');
        router.refresh();
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(null);
        }, 1500);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Room</h3>
          <form onSubmit={handleSubmit}>
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
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Room Description"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="Room Price"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="input input-bordered"
                placeholder="Room Capacity"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Property</label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="select select-bordered"
              >
                {properties.map((property) => (
                  <option value={property.id} key={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">New Image (Optional)</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
            </div>

            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success mt-4">
                <span>{success}</span>
              </div>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
