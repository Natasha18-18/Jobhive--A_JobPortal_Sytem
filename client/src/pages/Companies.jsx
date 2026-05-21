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
} from "react-icons/fa";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  // =========================
  // FETCH COMPANIES
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
  // FILTERED COMPANIES
  // =========================
  const filteredCompanies = useMemo(() => {
    const text = search.toLowerCase();

    return companies.filter((company) => {
      const companyName =
        company?.recruiterProfile?.companyName ||
        company?.companyName ||
        "";

      const location =
        company?.recruiterProfile?.location ||
        company?.location ||
        "";

      const industry =
        company?.recruiterProfile?.industry ||
        company?.industry ||
        "";

      return (
        companyName.toLowerCase().includes(text) ||
        location.toLowerCase().includes(text) ||
        industry.toLowerCase().includes(text)
      );
    });
  }, [search, companies]);

  // =========================
  // VALID COMPANIES ONLY
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
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-14">

          <div>
            <h1 className="text-5xl md:text-6xl font-black">
              Top Companies
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Discover amazing companies hiring right now
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-[420px]">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl">

              <FaSearch className="text-cyan-400 text-lg" />

              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full placeholder:text-gray-500"
              />

            </div>
          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center mt-28">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : validCompanies.length === 0 ? (
          <div className="text-center mt-28">

            <h2 className="text-4xl font-black">
              No Companies Found
            </h2>

            <p className="text-gray-400 mt-4">
              Try another keyword
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {validCompanies.map((company, index) => {

              const companyName =
                company?.recruiterProfile?.companyName ||
                company?.companyName ||
                "Unknown Company";

              const industry =
                company?.recruiterProfile?.industry ||
                company?.industry ||
                "Industry Not Available";

              const location =
                company?.recruiterProfile?.location ||
                company?.location ||
                "Location Not Available";

              const companyLogo =
                company?.recruiterProfile?.companyLogo ||
                company?.profileImage;

              return (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl hover:border-cyan-400/30 transition-all duration-300"
                >

                  {/* TOP BANNER */}
                  <div className="h-36 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 relative">

                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">

                      <FaStar className="text-yellow-400" />

                      Featured

                    </div>

                  </div>

                  {/* LOGO */}
                  <div className="px-7 -mt-12 relative z-10">

                    <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-[#030712] bg-[#111827] flex items-center justify-center shadow-2xl">

                      {companyLogo ? (
                        <img
                          src={`http://localhost:5002/uploads/${companyLogo}`}
                          alt={companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaBuilding className="text-4xl text-white" />
                      )}

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-7">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h2 className="text-3xl font-black leading-tight">
                          {companyName}
                        </h2>

                        <p className="text-cyan-400 mt-2">
                          {industry}
                        </p>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          company?.openStatus
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {company?.openStatus
                          ? "OPEN"
                          : "CLOSED"}
                      </div>

                    </div>

                    {/* INFO */}
                    <div className="mt-7 space-y-4 text-gray-300">

                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-cyan-400" />

                        <span>{location}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaBriefcase className="text-cyan-400" />

                        <span>
                          {company?.totalJobs || 0} Open Positions
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaUsers className="text-cyan-400" />

                        <span>Actively Hiring</span>
                      </div>

                    </div>

                    {/* BUTTON */}
                    <Link
                      to={`/company/${company._id}`}
                      className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
                    >

                      Explore Company

                      <FaArrowRight />

                    </Link>

                  </div>

                </motion.div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

export default Companies;