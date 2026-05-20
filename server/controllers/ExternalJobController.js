import axios from "axios";

export const getExternalJobs =
  async (req, res) => {

    try {

      const search =
        req.query.search || "";

      const location =
        req.query.location || "";

      const url =
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${encodeURIComponent(search)}&where=${encodeURIComponent(location)}`;

      const response =
        await axios.get(url);

      res.json({
        success: true,
        jobs:
          response.data.results,
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });

    }

};