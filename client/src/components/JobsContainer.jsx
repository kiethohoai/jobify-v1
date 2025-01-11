import { useAppContext } from '../context/appContext';

import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useEffect } from 'react';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
    page,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();

    // eslint-disable-next-line
  }, [page, search, searchType, searchStatus, sort]);

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
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
