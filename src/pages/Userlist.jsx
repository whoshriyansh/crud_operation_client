import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewEditModal from "../components/ViewEditModal";
import DeleteModal from "../components/DeleteModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("crudToken");

        const res = await axios.get("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);

        console.log(`This is the Data ${res.data}`);
      } catch (err) {
        console.log(err.response.data.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleViewEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Number</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.number}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleViewEdit(user)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  View/Edit
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ViewEditModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          user={selectedUser}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default UserList;
