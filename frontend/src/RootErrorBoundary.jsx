import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function RootErrorBoundary() {
  const error = useRouteError();

  const renderContent = () => {
    if (isRouteErrorResponse(error)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <span className="text-8xl font-extrabold text-indigo-500 tracking-tight">
            {error.status}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            {error.statusText}
          </h1>
          {error.data && (
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md text-sm">
              {error.data}
            </p>
          )}
          
          <a  href="/"
            className="mt-8 inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Go back home
          </a>
        </div>
      );
    }

    if (error instanceof Error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-full max-w-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 text-2xl">⚠</span>
              <h1 className="text-xl font-bold text-red-700 dark:text-red-400">
                Something went wrong
              </h1>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-5">
              {error.message}
            </p>
            {error.stack && (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  Stack Trace
                </p>
                <pre className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all">
                  {error.stack}
                </pre>
              </>
            )}
            
            <a  href="/"
              className="mt-6 inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Go back home
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="text-6xl mb-4">🤷</span>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Unknown Error
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          An unexpected error occurred. Please try again.
        </p>
        
         <a href="/"
          className="mt-8 inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Go back home
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto py-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default RootErrorBoundary;