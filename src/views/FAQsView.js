import React from 'react';

/**
 * FAQsPage component displays a Frequently Asked Questions (FAQs) section.
 *
 * Renders a styled page with a header and a list of FAQs, each containing a question and its answer.
 * The FAQs data is currently hardcoded but could be fetched from an API.
 *
 * @component
 * @returns {JSX.Element} The rendered FAQs page with questions and answers.
 */
function FAQsPage() {
  // Simulated FAQs data (could be fetched from an API)
  const faqs = [
    {
      question: 'What is the return policy?',
      answer: 'You can return any product within 30 days of purchase.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number by email.',
    },
    {
      question: 'Are there any discounts available?',
      answer: 'We offer seasonal discounts and promotions. Subscribe to our newsletter for updates.',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Header/Banner */}
      <div className="w-full h-24 flex items-center justify-center bg-navy-900">
        <h1 className="text-5xl font-bold text-white">FAQs</h1>
      </div>

      <div className="w-10/12 mx-auto mt-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#001f3f' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-bold" style={{ color: '#001f3f' }}>
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQsPage;
