import { useState, useEffect } from "react";
import axios from "axios";

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const res = await axios.get(
        "https://surplusshare-1.onrender.com/api/food/my",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold text-emerald-800 mb-10">
        My Listings
      </h2>

      {loading ? (
        <p className="text-center text-xl py-20">Loading your donations...</p>
      ) : listings.length === 0 ? (
        <p className="text-center text-xl py-20 text-gray-500">
          You haven't posted any food yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listings.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              {food.imageUrl && (
                <img
                  src={food.imageUrl}
                  alt={food.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{food.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {food.description}
                </p>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">
                      {food.quantity} {food.unit}
                    </span>
                  </div>
                  <div className="text-emerald-600">{food.location}</div>
                </div>
                <div
                  className={`mt-6 inline-block px-6 py-2 rounded-full text-sm font-medium ${food.status === "available" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {food.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
