import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaSearch,
  FaStar,
  FaBriefcase,
  FaCheckCircle,
  FaGlobe,
} from "react-icons/fa";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  // =========================
  // FETCH
  // =========================
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5002/api/companies"
      );

      if (res.data.success) {
        setCompanies(res.data.companies || []);
      } else {
        setCompanies([]);
      }
    } catch (error) {
      console.log(error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredCompanies = useMemo(() => {
    const text = search.toLowerCase();

    return companies.filter((company) => {
      return (
        company?.recruiterProfile?.companyName?.toLowerCase().includes(text) ||
        company?.companyName?.toLowerCase().includes(text) ||
        company?.recruiterProfile?.location?.toLowerCase().includes(text) ||
        company?.location?.toLowerCase().includes(text) ||
        company?.recruiterProfile?.industry?.toLowerCase().includes(text) ||
        company?.industry?.toLowerCase().includes(text)
      );
    });
  }, [search, companies]);

  // =========================
  // REMOVE INVALID COMPANIES (IMPORTANT FIX)
  // =========================
  const validCompanies = useMemo(() => {
    return filteredCompanies.filter((company) => {
      return (
        company?.recruiterProfile?.companyName ||
        company?.companyName
      );
    });
  }, [filteredCompanies]);

  return (
    <section className="min-h-screen bg-[#030712] pt-28 pb-20 px-5 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black">Top Companies</h1>
            <p className="text-gray-400 mt-4 text-lg">
              Explore recruiters and companies hiring now
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-[400px]">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <FaSearch className="text-cyan-400" />
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center mt-24">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : validCompanies.length === 0 ? (
          <div className="text-center mt-24">
            <h2 className="text-4xl font-black">No Companies Found</h2>
            <p className="text-gray-400 mt-4">Try another keyword</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {validCompanies.map((company, index) => (
              <motion.div
                key={company._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden"
              >

                {/* HEADER */}
                <div className="h-36 bg-gradient-to-r from-cyan-500 to-blue-600" />

                {/* LOGO */}
                <div className="px-7 -mt-12">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/10 bg-[#111827] flex items-center justify-center">

                    {company?.recruiterProfile?.companyLogo ? (
                      <img
                        src={`http://localhost:5002/uploads/${company.recruiterProfile.companyLogo}`}
                        className="w-full h-full object-cover"
                        alt="logo"
                      />
                    ) : company?.profileImage ? (
                      <img
                        src={`http://localhost:5002/uploads/${company.profileImage}`}
                        className="w-full h-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <FaBuilding className="text-3xl text-white" />
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">

                  <h2 className="text-3xl font-black">
                    {company?.recruiterProfile?.companyName ||
                      company?.companyName}
                  </h2>

                  <p className="text-cyan-400 mt-2">
                    {company?.recruiterProfile?.industry ||
                      company?.industry}
                  </p>

                  {/* STATUS */}
                  <p
                    className={`mt-3 font-semibold ${
                      company?.openStatus
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {company?.openStatus
                      ? "Hiring Open"
                      : "Hiring Closed"}
                  </p>

                  {/* INFO */}
                  <div className="mt-6 space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-cyan-400" />
                      {company?.recruiterProfile?.location ||
                        company?.location}
                    </div>

                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-cyan-400" />
                      {company?.totalJobs || 0} Jobs Open
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Link
                    to={`/company/${company._id}`}
                    className="mt-7 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl"
                  >
                    View Company <FaArrowRight />
                  </Link>

                </div>
              </motion.div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}

export default Companies;