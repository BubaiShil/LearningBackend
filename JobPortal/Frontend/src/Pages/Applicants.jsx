import { useApplicantsStore } from "@/Store/useApplicantsStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Demo Data
// const applicants = {
//   applications: [
//     {
//       _id: "1",
//       applicant: {
//         fullname: "John Doe",
//         email: "johndoe@example.com",
//         phoneNumber: "+1234567890",
//         profile: {
//           resume: "https://example.com/resume.pdf",
//           resumeOriginalName: "John_Doe_Resume.pdf",
//         },
//         createdAt: "2024-03-28T12:00:00Z",
//       },
//     },
//     {
//       _id: "2",
//       applicant: {
//         fullname: "Jane Smith",
//         email: "janesmith@example.com",
//         phoneNumber: "+1987654321",
//         profile: {
//           resume: "",
//           resumeOriginalName: "",
//         },
//         createdAt: "2024-03-27T14:30:00Z",
//       },
//     },
//   ],
// };

//Demo shortlisting statuses
const shortlistingStatus = ["Pending", "Shortlisted", "Rejected"];

// Dummy handler function
const statusHandler = (status, id) => {
  console.log(`Status "${status}" updated for applicant ID: ${id}`);
};

const Applicants = () => {

  const params = useParams()
  const {applicants,getApplicants} = useApplicantsStore()
  console.log(applicants);
  

  useEffect(() => {
    try {
      getApplicants(params.id)
    } catch (error) {
        console.log("err in getapplicants");
        
    }
  }, [])
  


  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="font-bold text-xl my-5 pt-16">
        Applicants {applicants?.applications?.length}
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full border border-gray-200">
          <caption className="text-lg font-semibold mb-3 text-gray-700 p-4">
            A list of your recently applied users
          </caption>
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Resume</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item?.applicant?.fullname}</td>
                <td className="px-4 py-3">{item?.applicant?.email}</td>
                <td className="px-4 py-3">{item?.applicant?.phoneNumber}</td>
                <td className="px-4 py-3">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {item?.applicant?.createdAt.split("T")[0]}
                </td>
                <td className="px-4 py-3 text-right">
                  <details className="dropdown dropdown-left">
                    <summary className="btn btn-sm btn-ghost">⋮</summary>
                    <ul className="dropdown-content menu shadow bg-white rounded-md w-40 border">
                      {shortlistingStatus.map((status, index) => (
                        <li key={index}>
                          <button
                            onClick={() => statusHandler(status, item?._id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {status}
                          </button>
                        </li>
                      ))}
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

export default Applicants;
