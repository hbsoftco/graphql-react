import { gql, useMutation } from "@apollo/client";
import { User } from "../models/User";

interface UserInput {
  userInput: {
    email: string;
    username: string;
  };
}

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
    }
  }
`;

const useCreateUser = () => {
  return useMutation<User, UserInput>(CREATE_USER);
};

export { useCreateUser };
