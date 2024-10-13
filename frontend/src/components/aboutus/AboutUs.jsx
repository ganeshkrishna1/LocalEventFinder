import React from "react";

const AboutUs = () => {
  return (
    <div className=" h-screen p-6 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <h1 className="text-3xl font-bold mb-8 text-center w-full">
        About Local Event Finder
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <p className="text-lg">
            Local Event Finder is a platform dedicated to connecting people with
            amazing events in their local communities. From concerts and sports
            games to workshops and festivals, our mission is to make event
            discovery simple and enjoyable.
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our goal is to help event organizers and attendees connect
            effortlessly, making it easier for everyone to find and enjoy local
            experiences.
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-4">Why We Started?</h2>
          <p className="text-lg">
            Our team noticed how challenging it can be to keep track of local
            events. We wanted to create a space where people could easily
            discover, book, and attend events that match their interests.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-none space-y-2">
            <li className="text-lg">
              <strong>Community First:</strong> Bringing people together through
              shared experiences.
            </li>
            <li className="text-lg">
              <strong>Convenience:</strong> Simplifying the event discovery and
              booking process.
            </li>
            <li className="text-lg">
              <strong>Transparency:</strong> Honest reviews and reliable event
              details.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
