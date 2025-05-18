const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute top-4 left-1 w-10 h-5 bg-blue-500 rounded-lg"></div>
          <div className="w-10 h-10 border-6 border-t-6 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
      </div>
    );
  };

  export default Loader