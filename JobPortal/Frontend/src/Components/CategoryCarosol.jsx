import React from "react";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  return (
    <section className="py-3 flex justify-center bg-gray-50">
      {/* Carousel Container */}
      <div className="w-full ">
        <div className="flex justify-evenly gap-4 px-8  md:px-10 whitespace-nowrap">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="btn btn-outline btn-primary rounded-full px-12 text-lg"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
