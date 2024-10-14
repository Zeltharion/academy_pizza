import urls from "@/shared/config/urls";

/**
 * Checks if a given sub path is a sub path of a given parent path.
 *
 * Will return true if the sub path is equal to the parent path or if the parent path starts with the sub path.
 * The only exception is when the sub path is '/admin', in which case it will return true if the parent path is also '/admin'.
 *
 * @param {string} subPath The sub path to check.
 * @param {string} parentPath The parent path to check against.
 * @example adminIsSubPath('/admin/products', '/admin')
 * @returns {boolean} True if the sub path is a sub path of the parent path, false otherwise.
 */
export const adminIsSubPath = (subPath: string, parentPath: string): boolean => {
	if (subPath === urls.admin_home && parentPath === urls.admin_home) {
		return true;
	}

	return subPath !== urls.admin_home && (subPath === parentPath || parentPath.startsWith(subPath));
}