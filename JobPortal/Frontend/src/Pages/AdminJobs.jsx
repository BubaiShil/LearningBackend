import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2, Eye } from "lucide-react";
import { useCompanyStore } from "@/Store/useCompanyStore";
import { useJobStore } from "@/Store/useJobStore";

const AdminJobs = () => {
    const { getAdminJob, adminJobs } = useJobStore();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [filtered, setFiltered] = useState([]);
  
    useEffect(() => {
      getAdminJob();
    }, []);
  
    useEffect(() => {
      setFiltered(adminJobs);
    }, [adminJobs]);
  
    useEffect(() => {
      const filterres = adminJobs.filter((job) =>
        job.company.name.toLowerCase().includes(input.toLowerCase())
      );
      setFiltered(filterres);
    }, [input, adminJobs]);
    console.log(adminJobs);
    
  
    return (
      <div className="max-w-6xl mx-auto pt-24 mb-10">
        <div className="flex items-center justify-between mb-5">
          <input
            type="text"
            className="input input-bordered w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </button>
        </div>
  
        <div className="overflow-x-auto mt-14">
          <table className="table w-full">
            <caption className="text-lg font-semibold mb-3">
              A list of your recently posted jobs
            </caption>
            <thead>
              <tr className="bg-base-300">
                <th>Logo</th>
                <th>Company Name</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="bg-base-100">
              {filtered?.map((job) => (
                <tr key={job._id}>
                  <td>
                    <img
                      src={job?.logo || "/avatar.png"}
                      alt="Company Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </td>
  
                  <td>{job?.company?.name}</td>
                  <td>{job?.createdAt.split("T")[0]}</td>
                  <td className="text-right">
                    <details className="dropdown dropdown-left">
                      <summary className="btn btn-ghost btn-sm">
                        <MoreHorizontal />
                      </summary>
                      <ul className="dropdown-content menu shadow bg-base-100 rounded-box w-40">
                        <li>
                          <button
                            onClick={() =>
                              navigate(`/admin/companies-update/${job._id}`)
                            }
                            className="flex items-center gap-2"
                          >
                            <Edit2 className="w-4" />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="flex items-center gap-2"
                          >
                            <Eye className="w-4" />
                            Applicants
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default AdminJobs;
