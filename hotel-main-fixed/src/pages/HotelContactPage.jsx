import React, { useState } from "react";
import { contactAPI } from "../api";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

const HotelContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Name, email and message are required.");
      return;
    }
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">Get In Touch</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#84B179] text-white rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Contact Information</h2>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Address</p>
                  <p className="text-sm text-[#E8F5BD]">Thamel, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Phone</p>
                  <p className="text-sm text-[#E8F5BD]">+977 98-0000-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-[#E8F5BD]">support@lonely.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Front Desk Hours</p>
                  <p className="text-sm text-[#E8F5BD]">24 / 7 — Always open</p>
                </div>
              </div>
            </div>

            {/* FAQ hint */}
            <div className="bg-white rounded-2xl p-5 shadow">
              <h3 className="font-semibold mb-2 text-gray-800">Frequently Asked</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Free cancellation up to 24h before check-in</li>
                <li>✅ Early check-in available on request</li>
                <li>✅ Airport transfer available</li>
                <li>✅ Pets allowed in select rooms</li>
              </ul>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">

            {success ? (
              <div className="flex flex-col items-center justify-center h-full py-16 gap-4 text-center">
                <CheckCircle size={56} className="text-[#84B179]" />
                <h2 className="text-2xl font-semibold text-gray-800">Message Sent!</h2>
                <p className="text-gray-500 text-sm max-w-sm">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-gray-600 font-medium">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-gray-600 font-medium">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com"
                        className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 font-medium">Subject</label>
                    <input
                      type="text" name="subject" value={form.subject} onChange={handleChange}
                      placeholder="Booking inquiry, Special request..."
                      className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 font-medium">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179] resize-none"
                    />
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelContactPage;
