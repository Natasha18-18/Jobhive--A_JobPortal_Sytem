import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  motion,
} from "framer-motion";

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

  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchCompanies();

  }, []);

  const fetchCompanies =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5002/api/companies"
          );

        if (res.data.success) {

          setCompanies(
            res.data.companies
          );

        }

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // FILTER
  // =========================

  const filteredCompanies =
    useMemo(() => {

      return companies.filter(
        (company) => {

          const text =
            search.toLowerCase();

          return (

            company
              ?.recruiterProfile
              ?.companyName
              ?.toLowerCase()
              .includes(text)

            ||

            company
              ?.recruiterProfile
              ?.location
              ?.toLowerCase()
              .includes(text)

            ||

            company
              ?.recruiterProfile
              ?.industry
              ?.toLowerCase()
              .includes(text)

          );

        }
      );

    }, [search, companies]);

  return (

    <section className="min-h-screen bg-[#030712] pt-28 pb-20 px-5 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}

        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">

          <div>

            <h1 className="text-5xl font-black">

              Top Companies

            </h1>

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
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
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

        ) : filteredCompanies.length === 0 ? (

          <div className="text-center mt-24">

            <h2 className="text-4xl font-black">

              No Companies Found

            </h2>

            <p className="text-gray-400 mt-4">

              Try another keyword

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredCompanies.map(
              (company, index) => (

                <motion.div
                  key={company._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-[30px] overflow-hidden transition-all duration-300"
                >

                  {/* HEADER */}

                  <div className="h-36 bg-gradient-to-r from-cyan-500 to-blue-600 relative"></div>

                  {/* LOGO */}

                  <div className="px-7 relative">

                   <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/10 bg-[#111827] flex items-center justify-center">

  {company?.recruiterProfile?.companyLogo ? (

    <img
      src={`http://localhost:5002/uploads/${company.recruiterProfile.companyLogo}`}
      alt="logo"
      className="w-full h-full object-cover"
    />

  ) : company?.profileImage ? (

    <img
      src={`http://localhost:5002/uploads/${company.profileImage}`}
      alt="profile"
      className="w-full h-full object-cover"
    />

  ) : (

    <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl">

      <FaBuilding />

    </div>

  )}

</div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-7">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h2 className="text-3xl font-black">

                          {
                            company
                              ?.recruiterProfile
                              ?.companyName

                            ||

                            "Company"
                          }

                        </h2>

                        <p className="text-cyan-400 mt-2">

                          {
                            company
                              ?.recruiterProfile
                              ?.industry

                            ||

                            "Technology"
                          }

                        </p>

                      </div>

                      <div className="flex items-center gap-2 text-green-400 text-sm">

                        <FaCheckCircle />

                        Verified

                      </div>

                    </div>

                    {/* INFO */}

                    <div className="mt-8 space-y-5 text-gray-300">

                      <div className="flex items-center gap-4">

                        <FaMapMarkerAlt className="text-cyan-400" />

                        <span>

                          {
                            company
                              ?.recruiterProfile
                              ?.location

                            ||

                            "Remote"
                          }

                        </span>

                      </div>

                      <div className="flex items-center gap-4">

                        <FaBriefcase className="text-cyan-400" />

                        <span>

                          {
                            company.totalJobs
                          } Jobs Open

                        </span>

                      </div>

                      <div className="flex items-center gap-4">

                        <FaUsers className="text-cyan-400" />

                        <span>

                          Hiring Team

                        </span>

                      </div>

                      {company
                        ?.recruiterProfile
                        ?.website && (

                        <div className="flex items-center gap-4">

                          <FaGlobe className="text-cyan-400" />

                          <a
                            href={
                              company
                                ?.recruiterProfile
                                ?.website
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-300 hover:underline truncate"
                          >

                            Visit Website

                          </a>

                        </div>

                      )}

                    </div>

                    {/* FOOTER */}

                    <div className="mt-8 flex items-center justify-between">

                      <div className="flex items-center gap-2 text-yellow-400">

                        <FaStar />

                        4.8 Rating

                      </div>

                    </div>

                    {/* BUTTON */}

                    <Link
                      to={`/company/${company._id}`}
                      className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all"
                    >

                      View Company

                      <FaArrowRight />

                    </Link>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}

export default Companies; 