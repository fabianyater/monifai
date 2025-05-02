
const CircularProgress = ({ progress = 0 }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative w-14 h-14"
      aria-label={`Progress: ${progress.toFixed(0)}%`}
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          strokeWidth="4"
          className="text-gray-200 dark:text-neutral-700 stroke-current"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-blue-500 stroke-current transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-sm font-bold text-white dark:text-white">
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
