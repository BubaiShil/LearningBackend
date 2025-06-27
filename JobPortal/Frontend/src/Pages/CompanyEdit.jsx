import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCompanyStore } from "@/Store/useCompanyStore";

const CompanyEdit = () => {
    const navigate = useNavigate();
    // Destructure companies, singleCompany, getCompanies, updateCompany as they are in your store
    const { singleCompany, companies, getCompanies, updateCompany } = useCompanyStore();

    const params = useParams();
    const companyId = params.id; // Extract company ID from URL parameters

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    // EFFECT 1: Fetch ALL companies when the component mounts or companyId changes.
    // This ensures the 'companies' array in your store is populated,
    // which will then be used to find the 'singleCompany'.
    useEffect(() => {
        if (companyId) { // Only fetch if we have an ID to work with
            getCompanies(); // Call getCompanies to populate the 'companies' array
        }
    }, [companyId, getCompanies]); // Depend on companyId and getCompanies for re-runs

    // EFFECT 2: Find the specific company from the 'companies' array and populate form data.
    // This effect runs when 'companies' array or 'companyId' changes.
    useEffect(() => {
        if (companies.length > 0 && companyId) {
            const foundCompany = companies.find(company => company._id === companyId);
            if (foundCompany) {
                // Manually set singleCompany here if your store doesn't do it directly from getCompanies
                // Or simply use foundCompany to populate the form
                setFormData({
                    name: foundCompany.name || "",
                    description: foundCompany.description || "",
                    website: foundCompany.website || "",
                    location: foundCompany.location || "",
                    file: null // File input cannot be pre-filled
                });
            }
        }
    }, [companies, companyId]); // Depend on companies and companyId

    // This useEffect is kept as a fallback/alternative if singleCompany is populated elsewhere
    // but the above useEffect will now be the primary method for populating on refresh.
    // If you always intend to use the `companies` array to find the current one, you can remove this.
    useEffect(() => {
        if (singleCompany) {
            setFormData({
                name: singleCompany?.name || "",
                description: singleCompany?.description || "",
                website: singleCompany?.website || "",
                location: singleCompany?.location || "",
                file: null
            });
        }
    }, [singleCompany]);


    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedFormData = new FormData();
        updatedFormData.append("name", formData.name);
        updatedFormData.append("description", formData.description);
        updatedFormData.append("website", formData.website);
        updatedFormData.append("location", formData.location);

        if (formData.file) {
            updatedFormData.append("file", formData.file);
        }

        try {
            await updateCompany(params.id, updatedFormData, navigate);
            navigate("/admin/companies");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-700 px-4">
            <div className="navbar w-full max-w-5xl pt-20 flex justify-start">
                <button
                    onClick={() => navigate("/admin/companies")}
                    className="flex items-center gap-2 text-white hover:text-gray-200 transition-all"
                >
                    <ArrowLeft size={20} />
                    <span className="font-semibold">Back</span>
                </button>
            </div>

            <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg p-8 mt-10 shadow-2xl rounded-2xl border border-white/20">
                <h1 className="text-4xl font-bold text-center text-white mb-6">Edit Company</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-semibold text-white">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Enter company name..."
                            />
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Enter website URL..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="label font-semibold text-white">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="textarea textarea-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Write a short company description..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Company location..."
                            />
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Upload Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                                className="file-input file-input-bordered w-full bg-white/20 text-white focus:bg-white/30 transition-all"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold transition-all">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyEdit;
