import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const emptyFn = (): any => undefined;




export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    waitFor: number
) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
};


export const waitFor = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



const appendToList = <T> (list: T[], item: T): T[] => {
  return [...list, item]
}

const removeFromList = <T extends {[key: string]: any}> (list: T[], item: T, id: string): T[] => {
  return list.filter((i) => i[id] !== item[id])
}

const updateInList = <T extends {[key: string]: any}> (list: T[], item: T, id: string): T[] => {
  return list.map((i) => i[id] === item[id] ? item : i)
}
export { appendToList, removeFromList, updateInList }