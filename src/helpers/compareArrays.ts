export const compareArrays = <T>(arr1: T, arr2: T): boolean => {
	return JSON.stringify(arr1) === JSON.stringify(arr2);
};
