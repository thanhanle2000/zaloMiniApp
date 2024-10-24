export function formatNumber(num) {
    return num.toLocaleString('en-US').replace(/,/g, ' ');
  }

export function convertTimestamp(timestamp) {
    // Create a Date object from the input timestamp
    const date = new Date(timestamp);
  
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    // Format the date as "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  }