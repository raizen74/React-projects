import { Link, useNavigate } from "react-router-dom"; // this element is a replacement for <a></a> which would trigger a server request with the entire content

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    // you can navigate programmaticaly 
    navigate("/products");
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='/products'>the list of products</Link>.
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
