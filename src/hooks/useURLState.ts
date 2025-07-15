import { useState, useEffect } from "react";

export default function useURLState(key: string, defaultValue: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  // 1. Initialize state by reading from URL
  const [value, setValue] = useState(() => {
    // This function runs only once when the component mounts
    const urlParams = new URLSearchParams(window.location.search);
    // window.location.search gives us the query string (e.g., "?search=hello&page=2")
    // URLSearchParams parses it into a searchable object

    return urlParams.get(key) || defaultValue;
    // urlParams.get(key) returns the value for our key, or null if not found
    // We use || defaultValue to fall back to our default if the param doesn't exist
  });

  // 2. Sync state changes back to the URL
  useEffect(() => {
    // This runs every time 'value', 'key', or 'defaultValue' changes

    const url = new URL(window.location.href);
    // Create a URL object from the current page URL
    // This gives us an easy way to manipulate the URL

    if (value === defaultValue || !value) {
      // If the value is the default or empty, remove it from URL
      // This keeps URLs clean - no need to show ?category=all if 'all' is default
      url.searchParams.delete(key);
    } else {
      // Otherwise, set the parameter in the URL
      url.searchParams.set(key, value);
    }

    // Update the browser URL without triggering a page reload
    window.history.replaceState({}, "", url);
    // replaceState modifies the current history entry instead of creating a new one
    // This means the back button won't go through every filter change
  }, [key, value, defaultValue]);
  // Dependency array: run this effect when any of these values change

  // 3. Return the state value and setter, just like useState
  return [value, setValue];
}
