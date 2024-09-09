
import React, { useEffect, useState } from 'react';

const Container = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    id: "",
    userId: "",
    title: ""
  });


  useEffect(() => {
    getUsersDetail();
  }, []);

  const getUsersDetail = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (user) => {
    setSelectedUser(user);
    setEditableUser(user);
  };

  const handleInputChange = (ev) => {
    const {name, value} = ev.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(editableUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      setUsers(users.map((user) => (user.id === selectedUser.id ? editableUser : user)));
      setSelectedUser(null);
      setEditableUser({
        id: "",
        userId: "",
        title: ""
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="title">
        <h2>Album List</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {users.map((person, index) => {
          return (
            <div key={index}>
              <article className="album-item">
                <img src="60111.jpg" className="photo" alt="dummy-photo" />
                <div className="item-info">
                  <header className="id">
                    <h4>Userid:{person.userId}</h4>
                    <h4 className="identity">Id:{person.id}</h4>
                  </header>
                  <p className="item-text">
                    <span>title:</span> {person.title}
                  </p>
                  <div className="btn-container">
                    <button onClick={() => updateUser(person)}>Edit</button>
                    <button onClick={() => deleteUser(person.id)}>delete</button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {
        selectedUser &&
        (
          <div className="form-container">
            <h4 className="title">Edit User</h4>
            <form onSubmit={handleSubmit}>
              <label className="userid">
                UserID:
                <input
                  type="text"
                  name="userId"
                  value={editableUser.userId}
                  onChange={handleInputChange}
                />
              </label>
              <label className="id">
                ID:
                <input
                  type="text"
                  name="id"
                  value={editableUser.id}
                  onChange={handleInputChange}
                />
              </label>
              <label className="para">
                Title:
                <input
                  className="titleInput"
                  type="text"
                  name="title"
                  value={editableUser.title}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </form>
          </div>
        )
      }
    </>
  )
}
export default Container;
