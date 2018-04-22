const httpUtil = () => {};
/**
 *
 * @param {object} reqParams - k,v pairs of input req. query params
 * @returns {string} - the queryString value
 */

httpUtil.makeQueryString = reqParams => {
	queryString = "";
	paramKeys = Object.keys(reqParams);
	paramsLen = paramKeys.length;
	paramKeys.map((key, index) => {
		if (reqParams[key]) {
			if (index === 0) {
				queryString += "?";
			}
			queryString += `${key}=${reqParams[key]}`;
			nextKey = paramKeys[index + 1];
			nextElement = reqParams[nextKey];
			// append & if not last element, and if next key isnt null
			if (index !== paramsLen - 1 && nextElement) {
				queryString += "&";
			}
		}
	});
	return queryString;
};

/**
 * @param {object} response - HTTP response object
 * @returns {Promise} - Api Response
 */
httpUtil.handleApiResponse = response => {
	return new Promise(function(resolve, reject) {
		if (!/2[0-9]/.test(response.status)) {
			error = new Error(`Expected 2xx, found ${response.status}`);
			error.statusCode = response.status;
			reject(error);
		} else {
			if (typeof response.body === "object") {
				resolve(response.json());
			} else {
				resolve(response.text());
			}
		}
	});
};

module.exports = httpUtil;
