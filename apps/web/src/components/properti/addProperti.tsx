'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import type { Categories, Address } from '@prisma/client';
import React from 'react';
import { api } from '@/config/axios.config';
interface AddPropertiProps {
  categories: Categories[];
  addresses: Address[];
}

const AddProperti = ({ categories, addresses }: AddPropertiProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setSelectedAddress('');
    setSelectedFile(null);
    setError(null);
    setSuccess(null);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetForm();
    }
  };
  const validateForm = () => {
    if (!name.trim()) return 'Property name is required';
    if (!description.trim()) return 'Description is required';
    if (!category) return 'Category is required';
    if (!selectedAddress) return 'Address is required';
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
    formData.append('category_id', category);
    formData.append('address_id', selectedAddress);
    const tenant_id = localStorage.getItem('tenant_id') || '1';
    formData.append('tenant_id', tenant_id);
    const slug_address = name.toLowerCase().replace(/\s+/g, '-');
    formData.append('slug_address', slug_address);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    try {
      const response = await api.post('/properti', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        setSuccess('Property created successfully!');
        resetForm();
        router.refresh();
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(null);
        }, 1500);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create property');
      console.error('Error creating property:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button className="btn bg-[#62CDFF]" onClick={handleModal}>
        Add
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Property</h3>
          <form onSubmit={handleSubmit}>
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
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Property Description"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Category
                </option>
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
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select an Address
                </option>
                {addresses.map((address) => (
                  <option value={address.id} key={address.id}>
                    {address.detail || `${address.lat}, ${address.lng}`}
                  </option>
                ))}
              </select>
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
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button
                type="submit"
                className={`btn bg-[#62CDFF] ${isLoading ? 'loading' : ''}`}
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
export default AddProperti;
