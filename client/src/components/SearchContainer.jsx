import Wrapper from '../assets/wrappers/SearchContainer.js';
import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilter,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;

    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilter();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow type="text" name="search" value={search} handleChange={handleSearch} />

          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          {/* search by type */}
          <FormRowSelect
            labelText="job type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          {/* button */}
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
            clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
