import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

const extraServices = [
  { id: 'chef', name: 'Private Chef', icon: '👨‍🍳', price: 350, description: 'A personal chef on board for gourmet meals' },
  { id: 'decoration', name: 'Premium Decoration', icon: '🎨', price: 200, description: 'Flowers, balloons & setup for special occasions' },
  { id: 'jetski', name: 'Jet Ski Rental', icon: '🚤', price: 250, description: '1 jet ski for the duration of your trip' },
  { id: 'photographer', name: 'Photographer', icon: '📸', price: 400, description: 'Professional photographer for 4 hours' },
  { id: 'champagne', name: 'Champagne Package', icon: '🥂', price: 150, description: 'Premium champagne & canapés' },
  { id: 'spa', name: 'Onboard Spa', icon: '💆', price: 300, description: 'Massage therapist & spa treatments' },
];

const MultiStepBookingModal = ({ yacht, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    services: [],
    paymentMethod: 'card',
  });
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  if (!yacht) return null;

  const guestOptions = ['1', '2', '4', '6', '8', '10', '12+'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const servicesTotal = formData.services.reduce((sum, id) => {
    const s = extraServices.find((x) => x.id === id);
    return sum + (s ? s.price : 0);
  }, 0);

  const basePrice = yacht.price;
  const subtotal = basePrice + servicesTotal;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.date) {
        alert('Please fill in your name, email, and select a date.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleConfirm = () => {
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ name: '', email: '', phone: '', date: '', guests: '2', services: [], paymentMethod: 'card' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 md:p-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col">

        {/* Header */}
        <div className="bg-navy p-4 md:p-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-white font-bold text-lg">Book Your Yacht</h3>
            {step < 4 && (
              <p className="text-gray-300 text-xs mt-0.5">
                Step {step} of 3 • {yacht.name}
              </p>
            )}
          </div>
          <button onClick={handleClose} className="text-white text-3xl hover:text-gold leading-none">
            &times;
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="bg-navy px-4 md:px-6 pb-4 shrink-0">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-gold' : 'bg-white/20'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">

          {/* STEP 1: Date, Guests & Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-5 bg-lightGray dark:bg-darkBg p-3 rounded-lg">
                <img src={yacht.image} alt={yacht.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="font-bold text-navy dark:text-white">{yacht.name}</h4>
                  <p className="text-gold font-semibold text-sm">
                    ${yacht.price} <span className="text-gray-500 text-xs">/day</span>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-darkBg border border-gray-300 dark:border-gray-700 text-navy dark:text-white rounded-lg p-3 outline-none focus:border-gold"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Date *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDateOpen(true)}
                    className={`w-full border rounded-lg p-3 text-left outline-none bg-white dark:bg-darkBg flex justify-between items-center transition ${
                      formData.date ? 'border-gold' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <span className={`text-sm ${formData.date ? 'text-navy dark:text-white font-medium' : 'text-gray-400'}`}>
                      {formData.date || 'Pick date'}
                    </span>
                    <span className="text-gold">📅</span>
                  </button>
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-600 dark:text-gray-300 font-medium block mb-1">
                    Guests
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-left bg-white dark:bg-darkBg flex justify-between items-center"
                  >
                    <span className="text-navy dark:text-white font-medium text-sm">
                      {formData.guests} {formData.guests === '1' ? 'Guest' : 'Guests'}
                    </span>
                    <span className="text-gold text-xs">▼</span>
                  </button>
                  {isGuestOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsGuestOpen(false)}></div>
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-20 overflow-hidden max-h-48 overflow-y-auto">
                        {guestOptions.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => { setFormData({ ...formData, guests: g }); setIsGuestOpen(false); }}
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
          )}

          {/* STEP 2: Extra Services */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="mb-5">
                <h4 className="text-xl font-playfair font-bold text-navy dark:text-white mb-1">
                  Enhance Your Experience ✨
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select optional services to make your trip unforgettable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {extraServices.map((service) => {
                  const isSelected = formData.services.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-gold bg-gold/10 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gold/50 bg-white dark:bg-darkBg'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-3xl">{service.icon}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isSelected ? 'bg-gold text-navy' : 'bg-gray-100 dark:bg-darkCard text-gray-500 dark:text-gray-400'
                        }`}>
                          {isSelected ? '✓ Added' : `+$${service.price}`}
                        </span>
                      </div>
                      <h5 className="font-bold text-navy dark:text-white text-sm mb-1">{service.name}</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{service.description}</p>
                    </button>
                  );
                })}
              </div>

              {formData.services.length > 0 && (
                <div className="mt-5 bg-gold/10 border border-gold/30 rounded-xl p-4">
                  <p className="text-sm text-navy dark:text-white">
                    <strong>{formData.services.length}</strong> service{formData.services.length > 1 ? 's' : ''} selected • Extra cost:{' '}
                    <strong className="text-gold">${servicesTotal}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Payment Summary */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h4 className="text-xl font-playfair font-bold text-navy dark:text-white mb-4">
                Booking Summary
              </h4>

              {/* Yacht Info */}
              <div className="bg-lightGray dark:bg-darkBg rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={yacht.image} alt={yacht.name} className="w-14 h-14 rounded object-cover" />
                  <div>
                    <h5 className="font-bold text-navy dark:text-white text-sm">{yacht.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">📅 {formData.date} • 👥 {formData.guests} guests</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Base price</span>
                  <span className="font-semibold text-navy dark:text-white">${basePrice}</span>
                </div>
              </div>

              {/* Services */}
              {formData.services.length > 0 && (
                <div className="bg-lightGray dark:bg-darkBg rounded-xl p-4 mb-4">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Extra Services
                  </p>
                  {formData.services.map((id) => {
                    const s = extraServices.find((x) => x.id === id);
                    return (
                      <div key={id} className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">{s.icon} {s.name}</span>
                        <span className="font-semibold text-navy dark:text-white">${s.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-navy rounded-xl p-5 mb-4">
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${tax}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/20">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-gold font-bold text-2xl">${total}</span>
                </div>
              </div>

              {/* Payment Method */}
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Payment Method
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { id: 'card', label: 'Card', icon: '💳' },
                  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                  { id: 'bank', label: 'Bank', icon: '🏦' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={`p-3 rounded-xl border-2 text-center transition ${
                      formData.paymentMethod === pm.id
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gold/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{pm.icon}</div>
                    <p className="text-xs font-semibold text-navy dark:text-white">{pm.label}</p>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                🔒 This is a demo. No real payment will be processed.
              </p>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-6 animate-fade-in-up">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-playfair font-bold text-navy dark:text-white mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                Thank you, <strong>{formData.name}</strong>! Your booking for <strong>{yacht.name}</strong> on{' '}
                <strong>{formData.date}</strong> is confirmed.
              </p>

              <div className="bg-lightGray dark:bg-darkBg rounded-xl p-4 mb-4 text-left max-w-sm mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Booking ID:</span>
                  <span className="font-mono font-bold text-navy dark:text-white">
                    #AQL{Math.floor(Math.random() * 90000) + 10000}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Guests:</span>
                  <span className="font-semibold text-navy dark:text-white">{formData.guests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Paid:</span>
                  <span className="font-bold text-gold">${total}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>

              <button
                onClick={handleClose}
                className="bg-gold hover:bg-yellow-500 text-navy font-bold px-8 py-3 rounded-xl transition"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 4 && (
          <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0 bg-white dark:bg-darkCard">
            <button
              type="button"
              onClick={step === 1 ? handleClose : handleBack}
              className="text-gray-500 dark:text-gray-400 font-semibold px-5 py-2.5 rounded-lg hover:bg-lightGray dark:hover:bg-darkBg transition text-sm"
            >
              {step === 1 ? 'Cancel' : '← Back'}
            </button>

            <button
              type="button"
              onClick={step === 3 ? handleConfirm : handleNext}
              className="bg-gold hover:bg-yellow-500 text-navy font-bold px-6 py-2.5 rounded-lg transition text-sm"
            >
              {step === 3 ? 'Confirm Booking →' : 'Next →'}
            </button>
          </div>
        )}
      </div>

      {/* Custom Date Picker */}
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

export default MultiStepBookingModal;