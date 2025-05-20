import React from "react";
import { CheckCircle, Circle } from "lucide-react";
const ProgressTracker = ({ completedSections, totalSections }) => {
  const progress = (completedSections.length / totalSections) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Registration Progress
        </h2>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {completedSections.length} of {totalSections} completed
        </span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          {completedSections.includes("company") ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <Circle className="h-5 w-5 text-slate-400 mr-2" />
          )}
          <span
            className={
              completedSections.includes("company")
                ? "text-green-600 dark:text-green-400"
                : "text-slate-600 dark:text-slate-400"
            }
          >
            Company
          </span>
        </div>

        <div className="flex items-center">
          {completedSections.includes("documents") ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <Circle className="h-5 w-5 text-slate-400 mr-2" />
          )}
          <span
            className={
              completedSections.includes("documents")
                ? "text-green-600 dark:text-green-400"
                : "text-slate-600 dark:text-slate-400"
            }
          >
            Documents
          </span>
        </div>

        <div className="flex items-center">
          {completedSections.includes("installations") ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <Circle className="h-5 w-5 text-slate-400 mr-2" />
          )}
          <span
            className={
              completedSections.includes("installations")
                ? "text-green-600 dark:text-green-400"
                : "text-slate-600 dark:text-slate-400"
            }
          >
            Installations
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
