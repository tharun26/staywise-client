import React from "react";

function ContactSection({ formData, isEditing, handleChange, user }) {
  return (
    <form className="bg-blue-50 rounded-2xl p-8 mt-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-lg mb-2">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            readOnly
            className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">Phone</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            readOnly={!isEditing}
            onChange={handleChange}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">Bookings</label>
          <input
            name="bookings"
            type="text"
            value={user.bookings}
            readOnly
            className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>
    </form>
  );
}

export default ContactSection;
