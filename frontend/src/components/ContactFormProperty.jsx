import React, { useState } from "react";

const ContactFormProperty = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-[rgb(6,11,34)] py-10 px-4 sm:px-6 lg:px-8 text-[rgb(223,198,103)]">
      <div className="max-w-xl mx-auto bg-[rgb(6,11,34)] border border-[rgb(223,198,103)] rounded-2xl shadow-md overflow-hidden">
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">Contact Agent</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="mt-1 w-full rounded-lg border border-[rgb(223,198,103)] bg-transparent px-4 py-2.5 text-sm text-[rgb(223,198,103)] placeholder-gray-400 focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="mt-1 w-full rounded-lg border border-[rgb(223,198,103)] bg-transparent px-4 py-2.5 text-sm text-[rgb(223,198,103)] placeholder-gray-400 focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="mt-1 w-full rounded-lg border border-[rgb(223,198,103)] bg-transparent px-4 py-2.5 text-sm text-[rgb(223,198,103)] placeholder-gray-400 focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
              />
            </div>
  
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-lg border border-[rgb(223,198,103)] bg-transparent px-4 py-2.5 text-sm text-[rgb(223,198,103)] placeholder-gray-400 focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
              />
            </div>
  
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                className="mt-1 w-full rounded-lg border border-[rgb(223,198,103)] bg-transparent px-4 py-3 text-sm text-[rgb(223,198,103)] placeholder-gray-400 focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
              ></textarea>
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full bg-transparent text-[rgb(223,198,103)] font-semibold rounded-lg px-5 py-3 transition-all duration-150 hover:bg-[rgb(223,198,103)] hover:text-[rgb(6,11,34)] border-2 border-[rgb(223,198,103)] focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
};

export default ContactFormProperty;
