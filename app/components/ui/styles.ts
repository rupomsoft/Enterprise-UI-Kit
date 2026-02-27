export const cardClass =
  "rounded-[10px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5";

/** Shared height for inputs and buttons when used in a row (e.g. toolbar) */
export const inputButtonHeightClass = "h-[36px] min-h-[36px]";
export const inputBase =
  "w-full min-w-0 h-[36px] min-h-[36px] rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm leading-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-transparent transition-colors [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none";

/** Border/ring override when input/textarea has validation error */
export const inputErrorClass =
  "border-red-500 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-600";

export const labelBase =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

/** Shared hint text under form controls (dark-mode consistent) */
export const hintClass = "text-xs text-gray-500 dark:text-gray-400";

/** Shared error message text (dark-mode consistent) */
export const errorClass = "text-xs text-red-600 dark:text-red-400";
