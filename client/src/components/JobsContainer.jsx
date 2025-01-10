import { useAppContext } from '../context/appContext';

import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useEffect } from 'react';

const JobsContainer = () => {
  const {
    //  page,
    getJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchType, searchStatus, sort]);

  if (isLoading) {
    return <Loading center={true} />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} Found!
      </h5>

      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>

      {/* todo Paginate Button */}
    </Wrapper>
  );
};
export default JobsContainer;
