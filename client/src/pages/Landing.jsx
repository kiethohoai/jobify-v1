import main from '../assets/image/main.svg';
import { Link } from 'react-router-dom';
import { Wrapper } from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        {/* left */}
        <div>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            A job tracking app simplifies managing tasks, deadlines, and
            progress, boosting productivity. It provides real-time updates,
            collaboration tools, and analytics for seamless project organization
            and efficiency.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login / Register
          </Link>
        </div>

        {/* right */}
        <img className="img main-img" src={main} alt="job hunt" />
      </div>
    </Wrapper>
  );
};
export default Landing;
