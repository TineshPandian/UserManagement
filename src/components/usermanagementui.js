const userManagement = {
  addUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  },

  getUserById(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.id === parseInt(id));
  },

  updateUser(updatedUser) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
  },

  sortUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('users', JSON.stringify(users));
  },

  filterUsers(searchTerm) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

export default userManagement;
