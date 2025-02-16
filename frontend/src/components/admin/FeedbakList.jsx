import { useEffect, useState } from "react";
import api from "../../api/feedback_api.jsx";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch feedback data from the API
        const fetchFeedbacks = async () => {
            try {
                const response = await api.get("/feedbacks/feedbacks"); // Use GET for fetching
                if (response.status !== 200) {
                    throw new Error("Failed to fetch feedbacks.");
                }
                setFeedbacks(response.data.feedbacks || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Feedback List</h2>
            {feedbacks.length === 0 ? (
                <p>No feedbacks available.</p>
            ) : (
                <ul className="space-y-4">
                    {feedbacks.map((feedback) => (
                        <li key={feedback._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <p><strong>Name:</strong> {feedback.name}</p>
                            <p><strong>Email:</strong> {feedback.email}</p>
                            <p><strong>Bus Number:</strong> {feedback.busNumber}</p>
                            <p><strong>Complaint:</strong> {feedback.complaint}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackList;
