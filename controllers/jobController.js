import { BadRequestError, NotFoundError } from '../errors/index.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

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

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs: jobs.length,
    numOfPages: 1,
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

  // check permissions
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

const showStats = async (req, res) => {
  res.send('showStats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
