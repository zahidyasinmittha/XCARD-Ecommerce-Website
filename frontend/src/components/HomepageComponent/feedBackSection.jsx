import React from 'react';

const FeedbackSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center p-3 bg-[#f7ab47]">
      <div className="py-8 px-3 text-center">
        <p className="text-lg mt-0">We’d love to hear what you think!</p>
        <button className="bg-white border border-black py-2 px-4 rounded-3xl font-bold mt-4" type="button">
          Give feedback
        </button>
      </div>
    </section>
  );
};

export default FeedbackSection;
