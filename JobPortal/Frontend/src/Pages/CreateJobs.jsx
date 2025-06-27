import { useCompanyStore } from "@/Store/useCompanyStore";
import { useJobStore } from "@/Store/useJobStore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminJobs from "./AdminJobs";

const CreateJobs = () => {
  const { companies, getCompanies } = useCompanyStore();
  const params = useParams()
  const jobId = params.id
  const {jobPost,getAdminJob,jobs} = useJobStore()
  const navigate = useNavigate()

  console.log(jobs);
  


console.log("companie :", companies);



  useEffect(() => {
    
    getCompanies();
    getAdminJob()
  }, [getAdminJob , getCompanies]);

  console.log(companies);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requiredment: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    company: "",
  });


  useEffect(() => {
        if (jobs.length > 0 && jobId) {
            const foundJob = jobs.find(job => job._id === jobId);
            if (foundJob) {
                // Manually set singleCompany here if your store doesn't do it directly from getCompanies
                // Or simply use foundCompany to populate the form
                setInput({
                    title: foundJob.title || "",
                    description: foundJob.description || "",
                    salary: foundJob.salary || "",
                    location: foundJob.location || "",
                    //file: null // File input cannot be pre-filled
                });
            }
        }
    }, [jobs, jobId]); // Depend on companies and companyId

    // This useEffect is kept as a fallback/alternative if singleCompany is populated elsewhere
    // but the above useEffect will now be the primary method for populating on refresh.
    // If you always intend to use the `companies` array to find the current one, you can remove this.
    // useEffect(() => {
    //     if (singleCompany) {
    //         setFormData({
    //             name: singleCompany?.name || "",
    //             description: singleCompany?.description || "",
    //             website: singleCompany?.website || "",
    //             location: singleCompany?.location || "",
    //             file: null
    //         });
    //     }
    // }, [singleCompany]);
  

  const handleCompany = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name?.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({ ...input, company: selectedCompany._id });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Job Data:", input);
    try {
      await jobPost(input)
      console.log("job 2 data ",input);
      
      
      navigate('/admin/jobs')
    } catch (error) {
      console.log('err in createPost jsx');
      
    }
  };

  return (
    <div className="flex items-center justify-center w-screen mb-5">
      <div className="card card-bordered shadow-lg w-full max-w-4xl p-8 pt-20">
        <h2 className="text-xl font-bold text-center mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">requiredment</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.requiredment}
                onChange={(e) =>
                  setInput({ ...input, requiredment: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Salary</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.salary}
                onChange={(e) => setInput({ ...input, salary: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.location}
                onChange={(e) =>
                  setInput({ ...input, location: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Job Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.jobtype}
                onChange={(e) =>
                  setInput({ ...input, jobtype: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Experience Level</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={input.experience}
                onChange={(e) =>
                  setInput({ ...input, experience: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">No of Positions</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={input.position}
                onChange={(e) =>
                  setInput({ ...input, position: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Select a Company</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={input.company}
                onChange={(e) => handleCompany(e.target.value)}
              >
                <option value="">Select a company</option>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <option key={company._id} value={company?.name?.toLowerCase()}>
                      {company.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No companies available</option>
                )}
              </select>
            </div>
          </div>

          <button className="btn btn-primary w-full my-4">Post New Job</button>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJobs;
