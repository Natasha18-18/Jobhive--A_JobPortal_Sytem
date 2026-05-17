import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

function ApplyJob() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleApply =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.post(
            `http://localhost:5002/api/application/apply/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        toast.success(
          res.data.message
        );

        navigate("/jobs");

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Application failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">

      <form
        onSubmit={handleApply}
        className="bg-white/10 p-10 rounded-3xl"
      >

        <h1 className="text-4xl font-bold mb-8">
          Apply Job
        </h1>

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 px-8 py-4 rounded-2xl"
        >

          {loading
            ? "Applying..."
            : "Apply Now"}

        </button>

      </form>

    </div>
  );
}

export default ApplyJob;