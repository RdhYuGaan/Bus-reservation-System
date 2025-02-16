import {useState} from 'react';
import api from "../../api/feedback_api.jsx";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        busNumber: '',
        complaint: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.busNumber || !formData.complaint) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        try {
            console.log('Submitting complaint:', formData);

            const response = await api.post('/feedbacks/add', formData);

            if (response.status === 200 || response.status === 201) {
                alert('Your complaint has been successfully submitted.');
                // Reset form
                setFormData({name: '', email: '', busNumber: '', complaint: ''});
            } else {
                const errorData = response.data || {};
                alert(`Submission failed: ${errorData.message || 'Unexpected error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);

            if (error.response) {
                // Server responded with a status outside 2xx
                alert(`Submission failed: ${error.response.data?.message || 'Server error. Please try again later.'}`);
            } else if (error.request) {
                alert('No response from the server. Please check your internet connection and try again.');
            } else {
                alert(`An error occurred: ${error.message}`);
            }
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8 text-center">If you have a complaint about a bus, please fill out the form
                below.</p>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700 mb-2">Bus
                        Number:</label>
                    <input
                        type="text"
                        id="busNumber"
                        name="busNumber"
                        value={formData.busNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bus Number"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="complaint"
                           className="block text-sm font-medium text-gray-700 mb-2">Complaint:</label>
                    <textarea
                        id="complaint"
                        name="complaint"
                        value={formData.complaint}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your complaint"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Submit Complaint
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
