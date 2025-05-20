import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  Shield,
  ArrowRight,
  CheckCircle,
  ClipboardList,
  FileCheck,
  UserCheck,
  CheckSquare,
  FileWarning,
} from "lucide-react";

const BenefitsCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 hover:border-orange-200">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
const RegistrationSteps = () => {
  const steps = [
    {
      icon: <ClipboardList size={24} className="text-blue-900" />,
      title: "Input Company Details",
      description:
        "Provide your business information including name, address, contact details, and business registration number.",
    },
    {
      icon: <FileCheck size={24} className="text-blue-900" />,
      title: "Upload Tax Clearance",
      description:
        "Submit your tax clearance certificate to verify your business is in good standing with tax authorities.",
    },
    {
      icon: <UserCheck size={24} className="text-blue-900" />,
      title: "Upload IDs of Directors",
      description:
        "Provide identification documents for all directors or principal officers of your company.",
    },
    {
      icon: <CheckSquare size={24} className="text-blue-900" />,
      title: "List Installations",
      description:
        "Share details of previous installations or projects to demonstrate your expertise and experience.",
    },
    {
      icon: <FileWarning size={24} className="text-blue-900" />,
      title: "Get Verified",
      description:
        "Our team reviews your application and verifies all submitted documents and information.",
    },
    {
      icon: <CheckCircle size={24} className="text-blue-900" />,
      title: "Approved",
      description:
        "Once approved, you gain immediate access to all dealer benefits and features.",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line connecting the steps */}
        <div className="hidden md:block absolute left-[1.5rem] top-6 bottom-0 w-[2px] bg-gray-200 ml-0.5"></div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-500 z-10">
                <span className="font-bold text-orange-500">{index + 1}</span>
              </div>
              <div className="ml-6">
                <div className="flex items-center mb-1">
                  <span className="mr-2">{step.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const LandingPage = () => {
  const { user: userData } = useContext(AuthContext);
  const user = userData.user;
  const benefits = [
    {
      icon: <TrendingUp className="text-orange-500" size={24} />,
      title: "Increased Revenue",
      description:
        "Gain access to exclusive deals and pricing to boost your profit margins.",
    },
    {
      icon: <Users className="text-orange-500" size={24} />,
      title: "Expanded Network",
      description:
        "Connect with manufacturers and other dealers to expand your business reach.",
    },
    {
      icon: <Zap className="text-orange-500" size={24} />,
      title: "Priority Support",
      description: "Get dedicated customer support and faster response times.",
    },
    {
      icon: <DollarSign className="text-orange-500" size={24} />,
      title: "Special Discounts",
      description:
        "Enjoy special bulk discounts and promotional offers exclusive to dealers.",
    },
    {
      icon: <Shield className="text-orange-500" size={24} />,
      title: "Verified Status",
      description:
        "Earn customer trust with an official verified dealer badge.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative insert-0 bg-[url('/src/assets/aurora_lights.avif')] bg-cover bg-no-repeat text-white w-full">
        <div className="container bg-transparent bg-opacity-80  mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a <span className="text-orange-500">Certified Dealer</span>{" "}
              and Grow Your Business
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our network of verified dealers and unlock exclusive
              benefits, increased visibility, and higher profits.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              {!user ||
                (user.role_id === 1 && (
                  <Link
                    to="/dealer/register"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                  >
                    Apply Now
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                ))}
              <Link
                to="#benefits"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-transparent border border-white hover:bg-white/10 text-white font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dealer Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Becoming a verified dealer opens up a world of opportunities and
              advantages for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitsCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to become a verified dealer and start
              enjoying the benefits.
            </p>
          </div>

          <RegistrationSteps />

          {/* CTA */}
          {!user ||
            (user.role_id === 1 && (
              <div className="text-center mt-12">
                <Link
                  to="/dealer/register"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-medium transition-colors"
                >
                  Start Application
                  <CheckCircle size={20} className="ml-2" />
                </Link>
              </div>
            ))}
        </div>
      </section>

      {/* Testimonials or stats could go here */}
    </div>
  );
};

export default LandingPage;
