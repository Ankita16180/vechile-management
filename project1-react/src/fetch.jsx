    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function UserList() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const graphqlEndpoint = 'YOUR_GRAPHQL_API_ENDPOINT'; // Replace with your actual endpoint
            const query = `
              query GetUsers {
                users {
                  id
                  name
                  email
                }
              }
            `;

            const response = await axios.post(graphqlEndpoint, { query });
            setUsers(response.data.data.users); // Access data through response.data.data
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        fetchUsers();
      }, []);

      if (loading) return <p>Loading users...</p>;
      if (error) return <p>Error: {error.message}</p>;

      return (
        <div>
          <h2>User List</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>
      );
    }

    export default UserList;