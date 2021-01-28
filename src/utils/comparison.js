import _isInteger from 'lodash/isInteger';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

/**
 * Recursive function that creates a JSON object with a single level to make it easier to compare two JSON objects
 * 
 * Eg: 
 * {
 *    name: "Vinicius",
 *    address: {
 *       country: "Brasil",
 *       city: "Brasília"
 *    }
 * }
 * 
 * To
 * 
 * {
 *    name: "Vinicius",
 *    adress-country: "Brasil",
 *    address-city: "Brasília"
 * }
 * 
 * @param {Object} data Current level of a JSON Object
 * @param {String} preset Previous key info to add into the key before adding into the final array
 * @param {Array} singleLevelArray Array to store the final one level array
 */
const transformJsonIntoSingleLevel = (data, preset, singleLevelArray) => {
    for(let key in data){
        let updatedPreset = preset;
        if (data.hasOwnProperty(key)) {
            if (data[key] !== null && typeof data[key] === 'object') {
                // This is an object or array with more data inside
                if (_isInteger(parseInt(key))) {
                    // This is an array item
                    updatedPreset = updatedPreset?.length > 0 ? updatedPreset + '-x' : 'x';    
                } else {
                    // This is an object
                    updatedPreset = updatedPreset?.length > 0 ? updatedPreset + '-' + key : key;
                }
                // Call function again with the inner level of current object
                data[key] = transformJsonIntoSingleLevel(data[key], updatedPreset, singleLevelArray);
            } else {
                // As every recursive function, this is the exit
                if (updatedPreset) {
                    updatedPreset = updatedPreset + '-' + key;
                } else {
                    updatedPreset = key;
                }
                // Push into the returned array the key as preseted before and the value
                singleLevelArray.push({key: updatedPreset, data: data[key]});
            }
        }
    }
    return data;
}


/**
 * Function that calls for transforming JSON Object into a single level array
 * and then compare one with other. 
 * It returns a number between 0 and 1 related to the how many items are similar
 *
 * @param {*} firstJson 
 * @param {*} secondJson 
 */
export const compareJSON = (firstJson, secondJson) => {

    const firstObjSingleLevelArray = [];
    const secondObjSingleLevelArray = [];

    transformJsonIntoSingleLevel(firstJson, '', firstObjSingleLevelArray);
    transformJsonIntoSingleLevel(secondJson, '', secondObjSingleLevelArray);

    const total = Math.max(firstObjSingleLevelArray.length, secondObjSingleLevelArray.length);
    let equalCount = 0;

    // Loop into the first level array
    _map(firstObjSingleLevelArray, fJson => {
        // Check if there is any item similar in the second single level array
        const similar = _filter(secondObjSingleLevelArray, sJson => sJson.data === fJson.data && sJson.key === fJson.key);
        if (similar.length > 0) {
            // There is a item that matches with the first one, then increment equal counter
            equalCount++;
        }
    });
    
    return equalCount / total;
}