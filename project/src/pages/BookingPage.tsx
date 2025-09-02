import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar, Clock, User, MessageSquare, CreditCard, CheckCircle } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import toast from 'react-hot-toast';

const schema = yup.object({
  serviceType: yup.string().required('Please select a service'),
  appointmentDate: yup.string().required('Please select a date'),
  appointmentTime: yup.string().required('Please select a time'),
  notes: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const BookingPage: React.FC = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Mock provider data
  const provider = {
    id: providerId,
    businessName: 'Clean Pro Services',
    services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Post-Construction Cleanup'],
    rating: 4.8,
    location: 'New York, NY',
  };

  // Generate available dates (next 14 days, excluding weekends)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return !isWeekend(date) ? format(date, 'yyyy-MM-dd') : null;
  }).filter(Boolean) as string[];

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const steps = [
    { number: 1, title: 'Service & Date', description: 'Choose service and appointment time' },
    { number: 2, title: 'Details', description: 'Provide additional information' },
    { number: 3, title: 'Confirmation', description: 'Review and confirm booking' },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Booking confirmed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your service with {provider.businessName}</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step.number <= currentStep
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number <= currentStep - 1 ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-6 h-0.5 w-16 ${
                      step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Step 1: Service & Date */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Service & Date</h2>
                
                {/* Service Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose a Service
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {provider.services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      >
                        <input
                          {...register('serviceType')}
                          type="radio"
                          value={service}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-3 text-gray-900 font-medium">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.serviceType && (
                    <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                  )}
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setValue('appointmentDate', date);
                        }}
                        className={`p-3 text-center border rounded-xl transition-all duration-200 ${
                          selectedDate === date
                            ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {format(new Date(date), 'EEE')}
                        </div>
                        <div className="text-sm">{format(new Date(date), 'MMM d')}</div>
                      </button>
                    ))}
                  </div>
                  {errors.appointmentDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.appointmentDate.message}</p>
                  )}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => {
                            setSelectedTime(time);
                            setValue('appointmentTime', time);
                          }}
                          className={`p-3 text-center border rounded-xl transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white border-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.appointmentTime.message}</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Special Instructions or Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific requirements, access instructions, or special requests..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Important Information:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Please ensure someone is available at the scheduled time</li>
                    <li>• You will receive a confirmation email with details</li>
                    <li>• Cancellations must be made at least 24 hours in advance</li>
                    <li>• Contact the provider directly for any changes</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Booking</h2>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium">{provider.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{watch('serviceType')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {watch('appointmentDate') && format(new Date(watch('appointmentDate')), 'EEEE, MMMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{watch('appointmentTime')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{provider.location}</span>
                    </div>
                    {watch('notes') && (
                      <div>
                        <span className="text-gray-600 block mb-1">Notes:</span>
                        <span className="font-medium text-sm">{watch('notes')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Ready to book your appointment!</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="px-8 pb-8">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;