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
    totalJob: jobs.length,
    numOfPages: 1,
  });
};

const updateJob = async (req, res) => {
  res.send('updateJob');
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

const showStats = async (req, res) => {
  res.send('showStats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
