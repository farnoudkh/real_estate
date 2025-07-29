import { useEffect, useState } from "react";
import Footer from "./Footer";

const stats = [
  { label: "Properties Sold", value: 1200 },
  { label: "Happy Clients", value: 950 },
  { label: "Years of Experience", value: 15 },
  { label: "Agents", value: 30 },
];

const About = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const durations = stats.map((stat) => stat.value / 70);
    const intervals = stats.map((_, i) =>
      setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[i] < stats[i].value) {
            updated[i] += 5;
            if (updated[i] > stats[i].value) updated[i] = stats[i].value;
          }
          return updated;
        });
      }, durations[i])
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="bg-[rgb(6,11,34)] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[rgb(223,198,103)] mb-10">
          About Our Agency
        </h1>

        {/* Intro Text */}
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          Since our founding, we have been committed to providing exceptional real estate services to help our clients find the perfect place to call home. Whether you're buying, selling, or investing, our experienced team is here to guide you every step of the way with integrity, professionalism, and deep market expertise.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-xl border border-[rgb(223,198,103)] shadow-lg"
            >
              <p className="text-4xl font-bold text-[rgb(223,198,103)]">
                {counts[idx]}
              </p>
              <p className="mt-2 text-sm uppercase text-gray-400 tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-semibold text-[rgb(223,198,103)] mb-4">
              Who We Are
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our agency was founded with the vision to redefine the real estate experience. We're more than agents — we're advisors, negotiators, and community experts. We take pride in delivering honest advice and unmatched service tailored to your specific needs.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-[rgb(223,198,103)]">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
              alt="Our team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-800 rounded-xl p-10 text-center border border-[rgb(223,198,103)]">
          <h2 className="text-3xl font-bold text-[rgb(223,198,103)] mb-4">Our Mission</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-4">
            We aim to simplify and elevate the real estate journey for every client. Through expert guidance, ethical practices, and cutting-edge technology, our mission is to help you move forward with confidence.
          </p>
          <p className="text-gray-400 italic">"Real estate is not just about property — it's about people."</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
