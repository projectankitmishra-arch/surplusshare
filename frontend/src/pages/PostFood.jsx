import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostFood() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "plates",
    expiryDate: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("unit", formData.unit);
    data.append("expiryDate", formData.expiryDate);
    data.append("location", formData.location);
    if (image) data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/food", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("🎉 Food posted successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-4xl font-bold text-emerald-900">
              Share Your Surplus
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Every meal shared is a step towards a better world
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Food Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                placeholder="e.g. Homemade Paneer Butter Masala"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg resize-y"
                placeholder="Describe the dish, ingredients, and any special notes..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                >
                  <option value="plates">Plates</option>
                  <option value="kg">Kilograms</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Expiry Date & Time
              </label>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="date"
                  name="expiryDate"
                  value={
                    formData.expiryDate ? formData.expiryDate.split("T")[0] : ""
                  }
                  onChange={(e) => {
                    const timePart = formData.expiryDate
                      ? formData.expiryDate.split("T")[1]
                      : "23:59";
                    setFormData({
                      ...formData,
                      expiryDate: `${e.target.value}T${timePart}`,
                    });
                  }}
                  className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                  required
                />
                <input
                  type="time"
                  value={
                    formData.expiryDate ? formData.expiryDate.split("T")[1] : ""
                  }
                  onChange={(e) => {
                    const datePart = formData.expiryDate
                      ? formData.expiryDate.split("T")[0]
                      : "";
                    setFormData({
                      ...formData,
                      expiryDate: `${datePart}T${e.target.value}`,
                    });
                  }}
                  className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Location / Area
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-6 py-5 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg"
                placeholder="e.g. Sakchi, Bistupur, Kadma, Mango"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-4 text-gray-700">
                Upload Food Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-emerald-500 transition-all cursor-pointer">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-xl text-gray-600">Click to upload photo</p>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG • Max 5MB
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white py-6 rounded-3xl font-semibold text-xl shadow-xl"
            >
              {loading ? "Posting Your Donation..." : "Post Donation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostFood;
