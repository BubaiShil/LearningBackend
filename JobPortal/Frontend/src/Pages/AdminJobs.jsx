import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2, Eye } from "lucide-react";
import { useJobStore } from "@/Store/useJobStore";

const AdminJobs = () => {
  const { getAdminJob, adminJobs } = useJobStore();
  // const params =  useParams()
  // const JobId = params.id
  
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getAdminJob();
  }, []);

  useEffect(() => {
    if (Array.isArray(adminJobs)) {
      const filterres = adminJobs.filter((job) =>
        job.company.name.toLowerCase().includes(input.toLowerCase())
      );
      setFiltered(filterres);
    }
  }, [input, adminJobs]);

  return (
    <div className="max-w-6xl mx-auto pt-24 mb-10">
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          className="input input-bordered w-64 px-4 py-2 rounded-md shadow-md"
          placeholder="Filter by company name"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate(`/admin/jobs/create`)}
        >
          New Job
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <caption className="text-lg font-semibold mb-3 text-gray-700 p-4">
            Recently Posted Jobs
          </caption>
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left border">Logo</th>
              <th className="px-4 py-3 text-left border">Company Name</th>
              <th className="px-4 py-3 text-left border">Title</th>
              <th className="px-4 py-3 text-left border">Posted Date</th>
              <th className="px-4 py-3 text-right border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((job) => (
                <tr key={job._id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-3 border">
                    <img
                      src={job?.logo || "/avatar.png"}
                      alt="Company Logo"
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 border">{job?.company?.name}</td>
                  <td className="px-4 py-3 border">{job?.title}</td>
                  <td className="px-4 py-3 border">
                    {job?.createdAt.split("T")[0]}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    <details className="dropdown dropdown-left relative">
                      <summary className="btn btn-sm bg-gray-200 text-gray-600 rounded-md px-2 hover:bg-gray-300">
                        <MoreHorizontal />
                      </summary>
                      <ul className="dropdown-content absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md">
                        <li className="border-b">
                          <button
                            onClick={() =>
                              navigate(`/admin/jobs/create/${job._id}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                          >
                            <Edit2 className="w-4 text-blue-600" />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                          >
                            <Eye className="w-4 text-green-600" />
                            Applicants
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-5 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
