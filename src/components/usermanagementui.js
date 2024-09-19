import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManagement from './usermanagement';

const UserManagementUI = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(userManagement.getUsers());
  }, []);

  const handleDelete = (userId) => {
    userManagement.deleteUser(userId);
    setUsers(userManagement.getUsers());
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = () => {
    userManagement.sortUsers();
    setUsers(userManagement.getUsers());
  };

  const handleAddUser = () => {
    navigate('/add-user');
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const filteredUsers = userManagement.filterUsers(search);

  return (
    <div className="min-h-screen bg-teal-300 p-6 md:px-28 ">
      <div className="container mx-auto">
        <div className="md:flex justify-between mb-4 mt-5 ">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="p-2 md:w-1/3 border border-gray-300 rounded"
          />
          <div className="space-x-2 mt-5 md:mt-0">
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
            <button
              onClick={handleSort}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Sort
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                className="w-20 h-20 rounded-full object-cover mb-4"
                src={user.image}
                alt={user.name}
              />
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2">{user.name}</h2>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Phone: {user.contact}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagementUI;
