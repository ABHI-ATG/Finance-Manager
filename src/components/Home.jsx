import CheckHome from "./CheckHome";
import AddHome from "./AddHome";
import JsonFile from './JsonFile';
import FileJson from './FileJson'
import GetHome from "./GetHome";
const Home = () => {
  return (
    <>
      <FileJson/>
      <AddHome />
      <CheckHome />
      <GetHome />
      <JsonFile/>
    </>
  );
};

export default Home;
