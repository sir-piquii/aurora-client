import { Loader } from "lucide-react";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Spinner;
