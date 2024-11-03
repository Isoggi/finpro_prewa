'use client';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axios.config';
import type { Properties } from '@prisma/client';
import { MdCreate } from 'react-icons/md';

const AddRoom = ({ properties }: { properties: Properties[] }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [property_id, setPropertyId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !price || !capacity || !property_id) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('property_id', property_id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('capacity', capacity);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await api.post('/room', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setSuccess('Room created successfully!');
        router.refresh();
        setName('');
        setDescription('');
        setPrice('');
        setCapacity('');
        setPropertyId('');
        setSelectedFile(null);

        setTimeout(() => {
          setIsOpen(false);
          setSuccess(null);
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while creating the room';
      setError(errorMessage);
      console.error('Error creating room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        Add Room
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Room</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">
                Property <span className="text-red-500">*</span>
              </label>
              <select
                value={property_id}
                onChange={(e) => setPropertyId(e.target.value)}
                className="select select-bordered"
                required
              >
                {properties.map((property: Properties) => (
                  <option value={property.id} key={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Room Name"
                required
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
              <label className="label font-bold">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="Room Price"
                required
                min="0"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="input input-bordered"
                placeholder="Room Capacity"
                required
                min="1"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Image</label>
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
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
