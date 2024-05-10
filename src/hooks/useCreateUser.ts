import { gql, useMutation } from "@apollo/client";
import { User } from "../models/User";

interface UserInput {
  userInput: {
    email: string;
    username: string;
  };
}

interface CreateUserResponse {
  createUser: User;
}

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
      email
      username
    }
  }
`;

const useCreateUser = () => {
  return useMutation<CreateUserResponse, UserInput>(CREATE_USER, {
    update(cache, { data }) {
      if (data?.createUser) {
        cache.modify({
          fields: {
            users(existingUsers = []) {
              const newUserRef = cache.writeFragment({
                data: data.createUser,
                fragment: gql`
                  fragment NewUser on User {
                    id
                    email
                    username
                  }
                `,
              });
              return [...existingUsers, newUserRef];
            },
          },
        });
      }
    },
  });
};

export { useCreateUser };
