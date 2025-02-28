import Navbar from "../components/Navbar";
import Job from "../components/Job";

const Browse = () => {
    return (
        <div>
            
            <div className="max-w-7xl mx-auto  p-4">
                <h1 className="text-2xl font-bold my-6 mt-20">Search Results (0)</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Placeholder Job Cards */}
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="card bg-base-100 shadow-md border border-gray-300 hover:shadow-lg transition-all">
                            <div className="card-body p-5">
                                <h2 className="card-title text-lg font-semibold">
                                    Software Engineer
                                </h2>
                                <p className="text-gray-500 text-sm">Google • Remote</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="badge badge-primary">Full-time</span>
                                    <span className="badge bg-white text-black border  border-gray-300">Remote</span>

                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    Looking for an experienced engineer to build scalable applications...
                                </p>
                                <button className="btn btn-primary btn-sm w-full mt-4">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
