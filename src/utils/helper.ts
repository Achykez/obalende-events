// import { propertyStatuses } from "@/constants/data";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const queryStringToObject = (queryString: string): Record<string, string> => {
//   const pairs = queryString.split("&");
//   return pairs.reduce(
//     (acc, pair) => {
//       const [key, value] = pair.split("=");
//       if (key) {
//         acc[key] = value;
//       }
//       return acc;
//     },
//     {} as Record<string, string>,
//   );
// };



// type QueryParams = Record<
//   string,
//   string | number | boolean | Array<string | number | boolean>
// >;

// const objectToQueryString = (queryParams: QueryParams): string => {
//   let queries = "?";
//   for (const [key, value] of Object.entries(queryParams || {})) {
//     if (Array.isArray(value)) {
//       for (let i = 0; i < value.length; i++) {
//         queries += `${key}=${encodeURIComponent(String(value[i]))}&`;
//       }
//     } else if (value !== undefined && value !== null) {
//       queries += `${key}=${encodeURIComponent(String(value))}&`;
//     }
//   }
//   return queries.slice(0, -1);
// };

// export function convertToCapitalized(names: string | undefined) {
//   if (!names) return "";

//   // Split the input string into an array of names using space as the separator
//   const nameArray = names.split(" ");

//   // Initialize an empty array to store the converted names
//   const convertedNames = [];

//   // Iterate over each name in the array
//   for (const name of nameArray) {
//     // Convert the name to lowercase and capitalize the first letter
//     const capitalized =
//       name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1);

//     // Add the converted name to the array
//     convertedNames.push(capitalized);
//   }

//   // Join the converted names back into a single string with spaces
//   const result = convertedNames.join(" ");

//   return result;
// }

// export function getInitials(fullname: string) {
//   const words = fullname ? fullname.trim().split(" ") : [];
//   const initials = words && words.map((word) => word[0].toUpperCase()).join("");
//   return initials;
// }

// export const queryParamsHelper = {
//   queryStringToObject,
//   objectToQueryString,
// };

// export function truncateString(str: string, length: number): string {
//   if (typeof str !== "string" || typeof length !== "number" || length < 0) {
//     throw new Error(
//       "Invalid input: Expecting a string and a positive number for length.",
//     );
//   }

//   if (str.length <= length) {
//     return str;
//   }

//   return str.substring(0, length) + "...";
// }

// export const useAmount = () => {
//   function convertToAmount(amount: number | string) {
//     return `${Number(amount || 0)
//       .toFixed(2)
//       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
//   }

//   function convertToAmountInNaira(amount: number | string) {
//     return `₦${Number(amount || 0)
//       .toFixed(2)
//       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
//   }

//   return { convertToAmount, convertToAmountInNaira };
// };

// export const findPropertyStatusIndex = (str: string) =>
//   str === "pending-listing"
//     ? 1
//     : str === "approved-listing"
//       ? 2
//       : str === "closed-listing"
//         ? 4
//         : str === "under-review"
//           ? 5
//           : 6;

// type FieldSetterAndClearerParams<T> = {
//   value: T[keyof T];
//   setterFunc: (field: keyof T, value: T[keyof T] | null) => void;
//   setField: keyof T;
//   clearFields?: Array<keyof T>;
//   clearErrors: (field: keyof T) => void;
// };

// export const fieldSetterAndClearer = <T>({
//   value,
//   setterFunc,
//   setField,
//   clearFields,
//   clearErrors,
// }: FieldSetterAndClearerParams<T>): void => {
//   setterFunc(setField, value);
//   clearErrors(setField);
//   clearFields?.forEach((field) => setterFunc(field, null));
// };

// export function objectToFormData<T extends object>(obj: T): FormData {
//   const formData = new FormData();

//   Object.entries(obj).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach((item) => formData.append(`${key}[]`, item));
//     } else if (value instanceof File) {
//       formData.append(key, value);
//     } else if (value !== null && typeof value === "object") {
//       // If the value is an object, you can either convert it to a JSON string or handle it recursively.
//       formData.append(key, JSON.stringify(value));
//     } else {
//       formData.append(key, String(value));
//     }
//   });

//   return formData;
// }

// export const fileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(file);
//   });
// };

// export const base64ToFile = (
//   base64String: string,
//   fileName: string,
//   mimeType: string,
// ): File | undefined => {
//   if (base64String === undefined) return;
//   const byteString = atob(base64String?.split(",")[1]);
//   const arrayBuffer = new ArrayBuffer(byteString.length);
//   const uint8Array = new Uint8Array(arrayBuffer);

//   for (let i = 0; i < byteString.length; i++) {
//     uint8Array[i] = byteString.charCodeAt(i);
//   }

//   const blob = new Blob([arrayBuffer], { type: mimeType });
//   return new File([blob], fileName, { type: mimeType });
// };

// export function getMimeTypeFromBase64(base64String: string): string {
//   if (base64String === undefined) return "";
//   // Check if the base64String has a valid data URI format
//   if (!base64String.includes("data:") || !base64String.includes(";base64,")) {
//     throw new Error("Invalid Base64 string format.");
//   }

//   // Extract the MIME type using a regular expression
//   const mimeTypeMatch = base64String.match(/^data:(.+?);base64,/);

//   // If a match is found, return the MIME type
//   if (mimeTypeMatch && mimeTypeMatch[1]) {
//     return mimeTypeMatch[1];
//   }

//   // If no valid MIME type is found, throw an error
//   throw new Error("Could not determine MIME type from Base64 string.");
// }
