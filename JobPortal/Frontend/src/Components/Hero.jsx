import { useCompanyStore } from "@/Store/useCompanyStore";
import { useJobStore } from "@/Store/useJobStore";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const [searchInp, setSearchInp] = useState("")
  const {setSettingQuery} = useJobStore()
  const navigate = useNavigate()
  // console.log(useCompanyStore());


  const SearchValue = ()=>{
    setSettingQuery(searchInp)
    navigate('/browser')
  }

  return (
    <section className="text-center py-16 min-h-[90vh] flex items-center bg-gradient-to-b from-indigo-500 via-purple-600 to-indigo-500 text-white">
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {/* Tagline */}
        {/* <span className="px-5 py-2 rounded-full bg-white text-indigo-600 font-medium shadow-md">
          Your Gateway to Career Success
        </span> */}

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Discover & Secure <br /> 
          <span className="text-yellow-300">Your Ideal Job</span> Today!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/80">
          Browse thousands of opportunities, connect with top companies, and take the next step in your career journey.
        </p>

        {/* Search Bar */}
        <div className="flex w-full md:w-[60%] mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search by title, skill, or company"
            onChange={(e)=>setSearchInp(e.target.value)}
            className="w-full px-4 py-3 text-gray-800 focus:outline-none"
          />
          <button
          onClick={SearchValue}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-full flex items-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
