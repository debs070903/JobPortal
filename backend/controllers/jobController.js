import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      jobType,
      experience,
      location,
      openings,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !jobType ||
      !experience ||
      !location ||
      !openings ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Fill in all the fields",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      experience,
      location,
      jobType,
      openings,
      company: companyId,
      created_by: userId,
    });

    return res.status(200).json({
      message: "Job created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .sort({ createdAt: -1 });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const { requirements, salary, experience, location, openings } = req.body;

    if (requirements && typeof requirements !== 'string') {
      return res.status(400).json({ 
        message: "Requirements should be a comma-separated string.", 
        success: false 
      });
    }

    if (salary && isNaN(salary)) {
      return res.status(400).json({
        message: "Salary should be a number.",
        success: false,
      });
    }

    const updateData = {};
    
    if (requirements) updateData.requirements = requirements.split(",").filter(Boolean);
    if (salary) updateData.salary = salary;
    if (experience) updateData.experience = experience;
    if (location) updateData.location = location;
    if (openings) updateData.openings = openings;

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job details updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the job",
      success: false,
    });
  }
};
