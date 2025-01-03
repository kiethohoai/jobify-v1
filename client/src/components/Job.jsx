import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Wrapper from '../assets/wrappers/Job.js';
import JobInfo from './JobInfo.jsx';
import { useAppContext } from '../context/appContext.jsx';

const Job = ({ _id, position, company, jobLocation, jobType, status, createdAt }) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MM Do, YYYY');

  return (
    <Wrapper>
      {/* header */}
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      {/* content */}
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <JobInfo icon={FaLocationArrow} text={jobLocation} />
          <JobInfo icon={FaCalendarAlt} text={date} />
          <JobInfo icon={FaBriefcase} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        {/* footer content */}
        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick={() => setEditJob(_id)}>
              Edit
            </Link>

            <button type="button" className="btn delete-btn" onClick={() => deleteJob(_id)}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
