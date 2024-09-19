import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userManagement from './usermanagement';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const user = userManagement.getUserById(userId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setContact(user.contact);
        setRole(user.role);
        setExistingImage(user.image);
      }
    }
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: userId ? parseInt(userId) : Date.now(),
      name,
      email,
      contact,
      role,
      image: image || existingImage ,
    };

    if (userId) {
      userManagement.updateUser(newUser);
    } else {
      userManagement.addUser(newUser);
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-teal-300 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4">
          {userId ? 'Edit User' : 'Add New User'}
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {existingImage && !image && (
            <img
              src={existingImage}
              alt="Current profile"
              className="w-24 h-24 mt-4"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {userId ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
