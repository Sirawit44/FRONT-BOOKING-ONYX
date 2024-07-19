export function formatReservation(inputDate) {
 // Create a Date object from the input string
 let dateObj = new Date(inputDate);

 // Extract day, month, and year from the Date object
 let day = dateObj.getUTCDate();
 let month = dateObj.getUTCMonth() + 1; // getUTCMonth() returns 0-11, so we add 1
 let year = dateObj.getUTCFullYear();

 // Format the date based on your preference (e.g., "23/06/2024" or "23-06-2024")
 let formattedDate = `${day}/${month}/${year}`; // Change the format as needed

 return formattedDate;
}