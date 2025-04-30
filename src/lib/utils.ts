import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function returns the name of a month corresponding to a given number (1-12). 
// If the input is out of range, it returns an "Invalid month number" message.
export const getMonth = (month: number) => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (month < 1 || month > 12) {
    return "Invalid month number"
  }

  return months[month - 1]
}

// This function checks if an element exists in an array. 
// If it doesn't, the element is added to the array; if it does, the element is removed.
export const duplicateValidation = (arr: string[], el: string) => {
  if (!arr.find((t) => t === el)) {
    arr.push(el)
    return arr
  } else {
    arr = arr.filter((t) => t !== el)
    return arr
  }
}