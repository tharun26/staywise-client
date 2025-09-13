function AddressSection({ addressForm, handleAddressChange, isEditing }) {
  return (
    <form className="bg-blue-50 rounded-2xl p-8 mt-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-lg mb-2">
            Address Line 1
          </label>
          <input
            name="line1"
            type="text"
            value={addressForm.line1}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">
            Address Line 2
          </label>
          <input
            name="line2"
            type="text"
            value={addressForm.line2}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">City</label>
          <input
            name="city"
            type="text"
            value={addressForm.city}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">State</label>
          <input
            name="state"
            type="text"
            value={addressForm.state}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">Country</label>
          <input
            name="country"
            type="text"
            value={addressForm.country}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-lg mb-2">
            Postal Code
          </label>
          <input
            name="postalCode"
            type="text"
            value={addressForm.postalCode}
            onChange={handleAddressChange}
            readOnly={!isEditing}
            className={`w-full rounded-xl px-6 py-4 text-lg font-semibold border-none shadow-sm focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${
              !isEditing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900"
            }`}
            required
          />
        </div>
      </div>
    </form>
  );
}

export default AddressSection;
