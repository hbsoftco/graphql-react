import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useCreateUser } from "./hooks/useCreateUser";
import { User } from "./models/User";

const Users = gql`
  {
    users {
      email
      username
      id
      posts {
        authorId
        content
        title
      }
    }
  }
`;

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [createUser] = useCreateUser();
  const { loading, error, data } = useQuery(Users);

  const addButton = async () => {
    try {
      await createUser({
        variables: {
          userInput: {
            email,
            username,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Some error happened</div>;
  }

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          placeholder="email"
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          placeholder="username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={() => addButton()}>Add</button>
      </div>
      <div>
        <h1>Hey dude</h1>
        {data.users.map((char: User) => {
          return <p key={char.id}>{char.username}</p>;
        })}
      </div>
    </>
  );
};

export default App;
