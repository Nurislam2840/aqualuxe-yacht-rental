import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

const BookingModal = ({ yacht, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '2',
  });
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  if (!yacht) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date) {
      alert('Please select a date.');
      return;
    }
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ name: '', email: '', date: '', guests: '2' });
    onClose();
  };

  const guestOptions = ['1', '2', '4', '6', '8', '10', '12+'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-navy p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">
            {step === 1 ? 'Book Your Yacht' : 'Booking Confirmed'}
          </h3>
          <button
            onClick={handleClose}
            className="text-white text-2xl hover:text-gold transition leading-none"
          >
            &times;
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Yacht Info */}
            <div className="flex items-center gap-4 mb-6 bg-lightGray dark:bg-darkBg p-3 rounded-lg">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h4 className="font-bold text-navy dark:text-white">{yacht.name}</h4>
                <p className="text-gold font-semibold">
                  ${yacht.price} <span className="text-gray-500 text-sm">/day</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold"
                  placeholder="john@example.com"
                />
              </div>

              {/* Date + Guests row */}
              <div className="flex gap-3">

                {/* Custom Date Button */}
                <div className="flex-1">
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Date
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDateOpen(true)}
                    className={`w-full border rounded-lg p-3 text-left outline-none focus:border-gold bg-white dark:bg-darkBg flex justify-between items-center transition
                      ${formData.date ? 'border-gold' : 'border-gray-300 dark:border-gray-700'}
                    `}
                  >
                    <span className={`text-sm ${formData.date ? 'text-navy dark:text-white font-medium' : 'text-gray-400'}`}>
                      {formData.date || 'Pick date'}
                    </span>
                    <span className="text-gold">📅</span>
                  </button>
                </div>

                {/* Custom Guests Dropdown */}
                <div className="flex-1 relative">
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Guests
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-left outline-none bg-white dark:bg-darkBg flex justify-between items-center"
                  >
                    <span className="text-navy dark:text-white font-medium text-sm">
                      {formData.guests} {formData.guests === '1' ? 'Guest' : 'Guests'}
                    </span>
                    <span className="text-gold text-xs">▼</span>
                  </button>

                  {isGuestOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsGuestOpen(false)}
                      ></div>
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-20 overflow-hidden max-h-56 overflow-y-auto">
                        {guestOptions.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, guests: g });
                              setIsGuestOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition ${
                              formData.guests === g
                                ? 'bg-gold/15 text-gold font-bold'
                                : 'text-navy dark:text-white hover:bg-lightGray dark:hover:bg-darkBg'
                            }`}
                          >
                            {g} {g === '1' ? 'Guest' : 'Guests'}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-yellow-500 text-navy font-bold py-3 rounded-xl mt-6 transition"
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. We received your request for{' '}
              <strong>{yacht.name}</strong> on <strong>{formData.date}</strong> for{' '}
              <strong>{formData.guests}</strong> guests. We will contact you at{' '}
              <strong>{formData.email}</strong> shortly.
            </p>
            <button
              onClick={handleClose}
              className="bg-navy dark:bg-gold text-white dark:text-navy font-semibold px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Custom Date Picker Modal */}
      {isDateOpen && (
        <CustomDatePicker
          selectedDate={formData.date}
          onDateChange={(date) => setFormData({ ...formData, date })}
          onClose={() => setIsDateOpen(false)}
        />
      )}
    </div>
  );
};

export default BookingModal;