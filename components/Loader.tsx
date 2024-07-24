export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin border-t-blue-500 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        <h2 className="text-center text-gray-700 text-xl font-semibold">Initializing...</h2>
        <p className="text-center text-gray-500">Please wait while we initialize the session</p>
      </div>
    </div>
  );
}