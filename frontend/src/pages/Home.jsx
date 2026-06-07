import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [foods, setFoods] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        "https://surplusshare-1.onrender.com/api/food",
      );
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const claimFood = async (id) => {
    if (!localStorage.getItem("token")) {
      alert("Please login to claim food");
      return;
    }

    try {
      const res = await axios.put(
        `https://surplusshare-1.onrender.com/api/food/claim/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      alert(
        `✅ Claimed Successfully!\n\nDonor: ${res.data.donorName}\nPhone: ${res.data.donorPhone}\n\nPlease contact soon!`,
      );
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to claim food");
    }
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.location &&
      food.location.toLowerCase().includes(searchLocation.toLowerCase()),
  );

  return (
    <>
      <div className="hero-bg h-[85vh] flex items-center justify-center text-white relative overflow-hidden">
        <div className="text-center px-6 max-w-5xl z-10">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
            SurplusShare
          </h1>
          <p className="text-2xl md:text-3xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Turning surplus into solutions. One meal at a time.
          </p>
          <a
            href="/post"
            className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-16 py-6 rounded-3xl text-2xl font-semibold shadow-2xl transition-all hover:scale-105"
          >
            Share Surplus Food
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-5xl font-semibold text-emerald-900">
            Available Donations
          </h2>

          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search by area..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full px-8 py-5 border border-gray-200 rounded-3xl focus:outline-none focus:border-emerald-600 text-lg shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <p className="col-span-3 text-center py-32 text-2xl text-gray-500">
              Loading beautiful donations...
            </p>
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div
                key={food._id}
                className="food-card bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                {food.imageUrl && (
                  <img
                    src={food.imageUrl}
                    alt={food.title}
                    className="w-full h-72 object-cover"
                  />
                )}
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-semibold text-gray-800">
                      {food.title}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-2xl text-sm font-medium">
                      {food.location}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-4 mb-8 text-lg leading-relaxed">
                    {food.description}
                  </p>

                  <div className="flex justify-between text-base mb-10">
                    <div className="font-medium">
                      {food.quantity} {food.unit}
                    </div>
                    <div className="text-rose-600 font-medium">
                      Expires: {new Date(food.expiryDate).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => claimFood(food._id)}
                    className="btn-primary w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-3xl font-semibold text-lg"
                  >
                    Claim with Respect
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center py-32 text-2xl text-gray-500">
              No donations found in this area yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
