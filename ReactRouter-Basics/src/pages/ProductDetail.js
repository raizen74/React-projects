import { Link, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const params = useParams(); // get dynamic path segments of this route
  // segment defined in App.js

  return (
    <>
      <h1>Product detail.</h1>
      <p>{params.productId}</p>
      {/* moves to the relative parent path, relative to the current path */}
      <p><Link to=".." relative="path">Back</Link></p>
    </>
  );
}
