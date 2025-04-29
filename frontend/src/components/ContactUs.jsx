import Footer from "./Footer"
import React, { useState } from "react";

const ContactUs = () => {
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
        <div>
            <div className="bg-[rgb(6,11,34)] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-3xl mx-auto bg-[rgb(11,17,45)] rounded-2xl shadow-lg p-8 border border-[rgb(223,198,103)]">
                    <h2 className="text-3xl font-bold text-[rgb(223,198,103)] text-center mb-8">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-[rgb(223,198,103)]">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        />
                        </div>
                        <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-[rgb(223,198,103)]">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[rgb(223,198,103)]">Email</label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[rgb(223,198,103)]">Phone</label>
                        <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[rgb(223,198,103)]">Message</label>
                        <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
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
            <Footer />
        </div>
    )
}

export default ContactUs