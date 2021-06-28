import React from 'react';
import axios from 'axios';
import useAsync from '../helpers/useAsync';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers);
  const { loading, data: users, error } = state;

  console.log(error);

  if (!users) return '데이터 없음';

  return (
    <>
      {loading ? <p>로딩중...</p> : ''}
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.username} {user.name}
            </li>
          );
        })}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
