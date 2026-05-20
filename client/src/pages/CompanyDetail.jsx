import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGlobe,
  FaUsers,
  FaArrowRight,
  FaBuilding,
} from "react-icons/fa";

function CompanyDetail() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5002/api/companies/${id}`
      );

      if (res.data.success) {
        setCompany(res.data.company);
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white px-6 py-28">
      <div className="max-w-7xl mx-auto">

        {/* COMPANY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl">

  {company?.recruiterProfile?.companyLogo ? (
    <img
      src={`http://localhost:5002/uploads/${company.recruiterProfile.companyLogo}`}
      alt="logo"
      className="w-full h-full object-cover"
    />
  ) : company?.companyLogo ? (
    <img
      src={`http://localhost:5002/uploads/${company.companyLogo}`}
      alt="logo"
      className="w-full h-full object-cover"
    />
  ) : (
    <FaBuilding />
  )}

</div>

            <div>
              <h1 className="text-4xl font-black">
                {
 company?.recruiterProfile?.companyName
||
company?.companyName
}
              </h1>

              <p className="text-gray-400 mt-2">
                {company?.recruiterProfile?.industry
||
company?.industry}
              </p>
            </div>
          </div>

          {/* INFO */}
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-gray-300">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-cyan-400" />
              {company?.recruiterProfile?.location
||
company?.location}
            </div>

            <div className="flex items-center gap-3">
              <FaBriefcase className="text-cyan-400" />
              {jobs.length} Jobs Open
            </div>

            <div className="flex items-center gap-3">
              <FaUsers className="text-cyan-400" />
              Hiring Team
            </div>

          </div>
        </motion.div>

        {/* JOBS SECTION */}
        <div className="mt-12">
          <h2 className="text-3xl font-black mb-8">
            Open Positions
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-400">No jobs found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-7"
                >
                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <p className="text-cyan-400 mt-2">
                    {job.location}
                  </p>

                  <p className="text-gray-400 mt-4 line-clamp-3">
                    {job.description}
                  </p>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl"
                  >
                    View Job <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default CompanyDetail; 