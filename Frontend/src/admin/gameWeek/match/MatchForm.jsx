import React, { useState, useEffect } from "react";
import {
  useGetItemQuery,
  useAddItemMutation,
  useUpdateItemMutation, // Assuming you have this hook for updates
} from "../../../app/services/QuerySettings";
import toast from "react-hot-toast";

const defaultInitialData = {
  teamA: "",
  scoreA: 0,
  teamB: "",
  scoreB: 0,
  gameType: "",
  matchDate: "",
  time: "",
  day: "Sunday",
  status: "Upcoming",
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MatchForm = ({ initialData: propInitialData, onSave, onClose }) => {
  const [formData, setFormData] = useState(defaultInitialData);
  const isEditMode = Boolean(propInitialData && propInitialData._id);

  useEffect(() => {
    if (propInitialData) {
      setFormData({
        ...propInitialData,
        teamA: propInitialData.teamA?._id || propInitialData.teamA || "",
        teamB: propInitialData.teamB?._id || propInitialData.teamB || "",
        gameType: propInitialData.gameType?._id || propInitialData.gameType || "",
        matchDate: propInitialData.matchDate
          ? new Date(propInitialData.matchDate).toISOString().split("T")[0]
          : "",
        scoreA: propInitialData.scoreA !== undefined ? propInitialData.scoreA : 0,
        scoreB: propInitialData.scoreB !== undefined ? propInitialData.scoreB : 0,
        day: propInitialData.day || "Sunday",
        status: propInitialData.status || "Upcoming",
      });
    } else {
      setFormData(defaultInitialData);
    }
  }, [propInitialData]);

  const {
    data: clubResponse,
    isLoading: isLoadingClubs,
    isError: isClubsError,
    error: clubsErrorData,
  } = useGetItemQuery(
    { url: "/club/all" },
    { refetchOnMountOrArgChange: true }
  );
  const clubs = clubResponse?.data || [];

  //Game type
  const {
    data: gameTypeResponse,
    isLoading: isLoadingGameTypes,
    isError: isGameTypesError,
    error: gameTypesErrorData,
  } = useGetItemQuery(
    { url: "/game-type/all" },
    { refetchOnMountOrArgChange: true }
  );
  const gameTypes = gameTypeResponse?.data || [];

  const [addMatch, { isLoading: isAddingMatch }] = useAddItemMutation();
  const [updateMatch, { isLoading: isUpdatingMatch }] = useUpdateItemMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.teamA === formData.teamB && formData.teamA !== "") {
      toast.error("Team A and Team B cannot be the same.");
      return;
    }

    if (formData.matchDate) {
      const selectedMatchDate = new Date(formData.matchDate + "T00:00:00"); 
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      if (selectedMatchDate < today) {
        toast.error("Match Date cannot be in the past.");
        return;
      }
    }

    const submissionData = {
      ...formData,
      scoreA: Number(formData.scoreA),
      scoreB: Number(formData.scoreB),
    };

    try {
      if (isEditMode) {
        await updateMatch({
          url: `/match/edit/${formData._id}`,
          data: submissionData,
        }).unwrap();
        toast.success("Match updated successfully!");
      } else {
        await addMatch({
          url: "/match/create",
          data: submissionData,
        }).unwrap();
        toast.success("Match created successfully!");
      }
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} match:`, error);
      toast.error(error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} match.`);
    }
  };

  if (isLoadingClubs || isLoadingGameTypes) {
    return <div className="p-4 text-center">Loading form data...</div>;
  }

  if (isClubsError || isGameTypesError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching data:{" "}
        {clubsErrorData?.data?.message ||
          clubsErrorData?.error ||
          gameTypesErrorData?.data?.message ||
          gameTypesErrorData?.error ||
          "Unknown error"}
      </div>
    );
  }

  return (
        <div className="bg-white p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            {isEditMode ? "Edit Match Details" : "Create Gameweek Match"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="teamA"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Team A
                </label>
                <select
                  id="teamA"
                  name="teamA"
                  required
                  value={formData.teamA}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                >
                  <option value="">Select Team A</option>
                  {clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="scoreA"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Score A
                </label>
                <input
                  type="number"
                  id="scoreA"
                  name="scoreA"
                  value={formData.scoreA}
                  onChange={handleChange}
                  disabled={formData.status === "Upcoming"}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  placeholder="Enter score for Team A"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="teamB"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Team B
                </label>
                <select
                  id="teamB"
                  name="teamB"
                  value={formData.teamB}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                >
                  <option value="">Select Team B</option>
                  {clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="scoreB"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Score B
                </label>
                <input
                  type="number"
                  id="scoreB"
                  name="scoreB"
                  value={formData.scoreB}
                  onChange={handleChange}
                  disabled={formData.status === "Upcoming"}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  placeholder="Enter score for Team B"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gameType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Game Type
              </label>
              <select
                id="gameType"
                name="gameType"
                value={formData.gameType}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="">Select Game Type</option>
                {gameTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="matchDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Match Date
                </label>
                <input
                  type="date"
                  id="matchDate"
                  name="matchDate"
                  value={formData.matchDate}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Day of the Week
              </label>
              <select
                // type="text"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            >
                <option value="">Select Day</option> 
                {daysOfWeek.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>
                    {dayOption}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Full Time">Full Time</option>
              </select>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isAddingMatch || isUpdatingMatch || isLoadingClubs || isLoadingGameTypes}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                {isEditMode ? "Update Match" : "Save Match"}
              </button>
            </div>
          </form>
        </div>
    // </div>
  );
};

export default MatchForm;
