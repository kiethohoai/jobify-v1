import { Wrapper } from "../assets/wrappers/ErrorPage";
import { Link } from "react-router-dom";
import image from "../assets/image/not-found.svg";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={image} alt="not found" />
        <h3>Ohh! Page not found</h3>
        <p>{`We can't seem to find the page you're looking for`}</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
