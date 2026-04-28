import { useEffect, useRef, useState } from "react";

function Dropdown(props) {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const { options } = props;
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option) => {
    if (option.divider) return;
    setSelected(option);
    option.onClick();
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        {selected ? (
          <>
            <span>{selected.label}</span>
          </>
        ) : (
          <span>Sort</span>
        )}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <ul className="py-1" role="menu">
            {options.map((option, i) =>
              option.divider ? (
                <li key={i} className="my-1 border-t border-gray-100 dark:border-gray-700" />
              ) : (
                <li key={option.value} role="menuitem">
                  <button
                    onClick={() => handleSelect(option)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-100
                      ${option.danger
                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }
                      ${selected?.value === option.value ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" : ""}
                    `}
                  >
                    <span>{option.label}</span>
                    {selected?.value === option.value && (
                      <svg className="ml-auto w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;