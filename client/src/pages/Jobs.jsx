import { Link } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
  FaFilter,
  FaTimes,
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaLayerGroup,
  FaBriefcase,
} from "react-icons/fa";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

function Jobs() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // SEARCH
  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  // FILTERS
  const [jobType, setJobType] =
    useState("All");

  const [salarySort, setSalarySort] =
    useState("default");

  const [showFilters, setShowFilters] =
    useState(false);

  const [savedJobs, setSavedJobs] =
    useState([]);

  // =========================
  // FETCH JOBS
  // =========================
useEffect(() => {

  const delayDebounce =
    setTimeout(() => {

      fetchJobs();

    }, 500);

  return () =>
    clearTimeout(delayDebounce);

}, [search, location]);

const fetchJobs = async () => {

  try {

    setLoading(true);

    // LOCAL JOBS
    const localRes = await axios.get(
      "http://localhost:5002/api/jobs/all"
    );

    // EXTERNAL JOBS
   const externalRes = await axios.get(
  `http://localhost:5002/api/jobs/external?search=${search}&location=${location}`
);

    let localJobs = [];
    let externalJobs = [];

    // LOCAL DATABASE JOBS
    if (localRes.data.success) {

      localJobs = localRes.data.jobs;

    }

    // EXTERNAL API JOBS
    if (externalRes.data.success) {

      externalJobs =
        externalRes.data.jobs.map((job) => ({

          _id:
            job.id?.toString(),

          title:
            job.title,

          company:
            job.company?.display_name ||
            "Unknown Company",

          location:
            job.location?.display_name ||
            "Remote",

          salary:
            job.salary_max
              ? `₹${job.salary_max}`
              : "Not Disclosed",

          type:
            job.contract_type ||
            "Full-Time",

          experience:
            "Experience Required",

          description:
            job.description,

          redirect_url:
            job.redirect_url,

          external: true,

        }));

    }

    // MERGE BOTH
    setJobs([
      ...localJobs,
      ...externalJobs,
    ]);

  }

  catch (error) {

    console.log(error);

  }

  finally {

    setLoading(false);

  }

};
  // =========================
  // SALARY NUMBER
  // =========================

  const getSalaryNumber = (
    salary
  ) => {

    if (!salary) return 0;

    const numbers =
      salary
        .toString()
        .replace(/,/g, "")
        .match(/\d+/g);

    if (!numbers) return 0;

    return parseInt(
      numbers[0]
    );

  };

  // =========================
  // SAVE JOB
  // =========================

const toggleSaveJob = async (
  job
) => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      return alert(
        "Please login first"
      );
    }

    // ALREADY SAVED
    if (
      savedJobs.includes(job._id)
    ) {

      await axios.delete(
        `http://localhost:5002/api/saved/remove/${job._id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSavedJobs((prev) =>
        prev.filter(
          (id) =>
            id !== job._id
        )
      );

    }

    // SAVE JOB
    else {

      await axios.post(
        "http://localhost:5002/api/saved/save",
        {
          jobId: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          type: job.type,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSavedJobs((prev) => [
        ...prev,
        job._id,
      ]);

    }

  } catch (error) {

    console.log(error);

  }

};

  // =========================
  // FILTER JOBS
  // =========================

  const filteredJobs = useMemo(() => {

    let filtered = [...jobs];

    filtered = filtered.filter(
      (job) => {

        const title =
          job.title
            ?.toLowerCase() || "";

        const company =
          job.company
            ?.toLowerCase() || "";

        const type =
          job.type
            ?.toLowerCase() || "";

        const city =
          job.location
            ?.toLowerCase() || "";

        const searchText =
          search
            .toLowerCase()
            .trim();

        const locationText =
          location
            .toLowerCase()
            .trim();

        const matchesSearch =

          searchText === ""
            ? true
            : title.includes(
                searchText
              ) ||

              company.includes(
                searchText
              ) ||

              type.includes(
                searchText
              ) ||

              city.includes(
                searchText
              );

        const matchesLocation =

          locationText === ""
            ? true
            : city.includes(
                locationText
              );

        const matchesType =

          jobType === "All"
            ? true
            : type ===
              jobType
                .toLowerCase()
                .trim();

        return (

          matchesSearch &&
          matchesLocation &&
          matchesType

        );

      }
    );

    // SORT

    if (
      salarySort ===
      "lowToHigh"
    ) {

      filtered.sort(
        (a, b) =>

          getSalaryNumber(
            a.salary
          ) -

          getSalaryNumber(
            b.salary
          )
      );

    }

    if (
      salarySort ===
      "highToLow"
    ) {

      filtered.sort(
        (a, b) =>

          getSalaryNumber(
            b.salary
          ) -

          getSalaryNumber(
            a.salary
          )
      );

    }

    return filtered;

  }, [
    jobs,
    search,
    location,
    jobType,
    salarySort,
  ]);

  return (

    <section className="min-h-screen bg-[#050816] text-white pt-28 pb-20 px-5">

      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
        >

          <div>

            <h1 className="text-5xl font-black flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

                <FaBriefcase className="text-white text-2xl" />

              </div>

              Available Jobs

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Explore opportunities from top companies

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-lg font-bold">

              {filteredJobs.length} Jobs Found

            </div>

          </div>

        </motion.div>

        {/* SEARCH BAR */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
        >

          <div className="grid lg:grid-cols-4 gap-4">

            {/* SEARCH */}

            <div className="flex items-center gap-4 bg-[#0b1120] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-cyan-400 transition">

              <FaSearch className="text-cyan-400" />

              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

            {/* LOCATION */}

            <div className="flex items-center gap-4 bg-[#0b1120] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-cyan-400 transition">

              <FaMapMarkerAlt className="text-cyan-400" />

              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
              />

            </div>

            {/* FILTER BUTTON */}

            <button
              onClick={() =>
                setShowFilters(
                  !showFilters
                )
              }
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-cyan-400 rounded-2xl font-semibold transition-all duration-300"
            >

              {
                showFilters
                  ? <FaTimes />
                  : <FaFilter />
              }

              Filters

            </button>

            {/* RESET */}

            <button
              onClick={() => {

                setSearch("");
                setLocation("");
                setJobType("All");
                setSalarySort("default");

              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300"
            >

              Reset Filters

            </button>

          </div>

        </motion.div>

        {/* FILTER PANEL */}

        <AnimatePresence>

          {showFilters && (

            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="overflow-hidden"
            >

              <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6">

                <div className="grid md:grid-cols-2 gap-6">

                  {/* JOB TYPE */}

                  <div>

                    <label className="text-white font-semibold mb-3 block">

                      Job Type

                    </label>

                    <select
                      value={jobType}
                      onChange={(e) =>
                        setJobType(
                          e.target.value
                        )
                      }
                      className="w-full bg-[#0b1120] border border-white/10 text-white rounded-2xl px-5 py-4 outline-none"
                    >

                      <option value="All">
                        All Jobs
                      </option>

                      <option value="full-time">
                        Full-Time
                      </option>

                      <option value="part-time">
                        Part-Time
                      </option>

                      <option value="remote">
                        Remote
                      </option>

                      <option value="internship">
                        Internship
                      </option>

                    </select>

                  </div>

                  {/* SORT */}

                  <div>

                    <label className="text-white font-semibold mb-3 block">

                      Salary Sort

                    </label>

                    <select
                      value={salarySort}
                      onChange={(e) =>
                        setSalarySort(
                          e.target.value
                        )
                      }
                      className="w-full bg-[#0b1120] border border-white/10 text-white rounded-2xl px-5 py-4 outline-none"
                    >

                      <option value="default">
                        Default
                      </option>

                      <option value="lowToHigh">
                        Low to High
                      </option>

                      <option value="highToLow">
                        High to Low
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center mt-24">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="text-center mt-24">

            <div className="w-28 h-28 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 text-4xl">

              <FaSearch />

            </div>

            <h2 className="mt-8 text-4xl font-black text-white">

              No Jobs Found

            </h2>

            <p className="mt-3 text-gray-400">

              Try adjusting your filters or search keywords.

            </p>

          </div>

        ) : (

          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 mt-12">

            {filteredJobs.map(
              (job, index) => (

                <motion.div
                  key={`${job._id}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-3xl p-7 transition-all duration-300 relative overflow-hidden"
                >

                  {/* SAVE */}

                  <button
                    onClick={() =>
                      toggleSaveJob(
                        job
                      )
                    }
                    className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
                  >

                    {savedJobs.includes(
                      job._id
                    ) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}

                  </button>

                  {/* CONTENT */}

                  <div className="flex items-center gap-3 flex-wrap">

                    <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium">

                      {
                        job.type ||
                        "Full-Time"
                      }

                    </span>

                    <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium flex items-center gap-2">

                      <FaStar />

                      Featured

                    </span>

                  </div>

                  {/* TITLE */}

                  <h2 className="mt-7 text-3xl font-black text-white leading-tight">

                    {job.title}

                  </h2>

                  <p className="mt-2 text-cyan-300 font-semibold text-lg">

                    {job.company}

                  </p>

                  {/* DETAILS */}

                  <div className="mt-8 space-y-5 text-gray-300">

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                        <FaMapMarkerAlt className="text-cyan-400" />

                      </div>

                      <span>

                        {
                          job.location ||
                          "Remote"
                        }

                      </span>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                        <FaMoneyBillWave className="text-cyan-400" />

                      </div>

                      <span>

                        {
                          job.salary ||
                          "Negotiable"
                        }

                      </span>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                        <FaLayerGroup className="text-cyan-400" />

                      </div>

                      <span>

                        {
                          job.experience ||
                          "Fresher"
                        }

                      </span>

                    </div>

                  </div>

                  {/* BUTTON */}

                 {
  job.external ? (

    <a
      href={job.redirect_url}
      target="_blank"
      rel="noreferrer"
      className="mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-white font-semibold hover:scale-[1.02] transition-all duration-300"
    >

      Apply Now

      <FaArrowRight />

    </a>

  ) : (

    <Link
      to={`/jobs/${job._id}`}
      className="mt-10 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-white font-semibold hover:scale-[1.02] transition-all duration-300"
    >

      View Details

      <FaArrowRight />

    </Link>

  )
}
                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}

export default Jobs;