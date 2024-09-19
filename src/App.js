import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserManagementUI from './components/usermanagementui';
import AddUserForm from './components/addform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserManagementUI />} />
        <Route path="/add-user" element={<AddUserForm />} />
        <Route path="/edit-user/:userId" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
