import axios from "axios";

export const getExternalJobs = async (req, res) => {

  try {

    console.log("🔥 External Jobs Fetching");

    const response =
      await axios.get(
        "https://remoteok.com/api"
      );

    const jobs =
      response.data
        .filter(
          (job) =>
            job.position
        )
        .slice(0, 30);

const formattedJobs =
  jobs.map((job, index) => ({

    _id:
      `external_${index}_${job.id || Math.random()}`,

    title:
      job.position ||

      job.title,

    company:
      job.company ||

      job.company_name ||

      "Unknown Company",

    location:
      job.location ||

      "Remote",

    salary:
      "Not Disclosed",

    type:
      "Remote",

    experience:
      "Experience Required",

    description:
      job.description ||

      "No description",

    redirect_url:
      job.url ||

      "#",

    external: true,

}));

    return res.status(200).json({

      success: true,

      jobs:
        formattedJobs,

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed To Fetch External Jobs",

      error:
        error.message,

    });

  }

};