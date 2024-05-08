import { gql, useQuery } from "@apollo/client";

const AllCharacters = gql`
  {
    characters(page: 1) {
      results {
        name
        gender
        id
        image
      }
    }
  }
`;

interface User {
  name: string;
  gender: string;
  id: number;
  image: string;
}

const App = () => {
  const { loading, error, data } = useQuery(AllCharacters);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Some error happened</div>;
  }

  return (
    <>
      <h1>Hey dude</h1>
      {data.characters.results.map((char: User) => {
        return <p key={char.id}>{char.name}</p>;
      })}
    </>
  );
};

export default App;
