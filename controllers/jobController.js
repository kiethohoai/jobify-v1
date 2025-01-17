import { BadRequestError, NotFoundError } from '../errors/index.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res) => {
  // guard
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Please provide all values');
  }

  // create
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  // send back res
  res.status(StatusCodes.CREATED).json({ job });
};

// todo getAllJobs
const getAllJobs = async (req, res) => {
  // prepare query data
  const { search, status, jobType, sort } = req.query;

  // conditions for queryObject
  const queryObject = {
    createdBy: req.user.userId,
  };

  // status
  if (status && status !== 'all') {
    queryObject.status = status;
  }

  // jobType
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  // search
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  // chain query
  let result = Job.find(queryObject);

  // sort query condition
  if (sort === 'latest') {
    result.sort('-createdAt');
  }

  if (sort === 'oldest') {
    result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result.sort('position');
  }

  if (sort === 'z-a') {
    result.sort('-position');
  }

  // paginate
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  // final data
  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
  });
};

const updateJob = async (req, res) => {
  // data
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  // guard
  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  // check if job still exists in db
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job found with id:${jobId}`);
  }

  // check permissions (Allow user who created this job can modify, other can't)
  checkPermissions(req.user, job.createdBy);

  // update the job
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  // data
  const { id: jobId } = req.params;

  // guard
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No Job found with id=${jobId}`);
  }

  // check permissions
  checkPermissions(req.user, job.createdBy);

  // remove job from DB
  await job.deleteOne();

  // sendback response
  res.status(StatusCodes.OK).json({ msg: 'Success! Job Removed' });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month, year },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
