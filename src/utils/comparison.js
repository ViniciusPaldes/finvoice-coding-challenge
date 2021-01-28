import _isInteger from 'lodash/isInteger';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

const transformJsonIntoSingleLevel = (data, preset, singleLevelArray) => {
    for(let key in data){
        let updatedPreset = preset;
        if (data.hasOwnProperty(key)) {
            if (data[key] !== null && typeof data[key] === 'object') {
                if (_isInteger(parseInt(key))) {
                    updatedPreset = updatedPreset?.length > 0 ? updatedPreset + '-' + 'x' : 'x';    
                } else {
                    updatedPreset = updatedPreset?.length > 0 ? updatedPreset + '-' + key : key;
                }
                data[key] = transformJsonIntoSingleLevel(data[key], updatedPreset, singleLevelArray);
            } else {
                if (updatedPreset) {
                    updatedPreset = updatedPreset + '-' + key;
                } else {
                    updatedPreset = key;
                }
                singleLevelArray.push({key: updatedPreset, data: data[key]});
            }
        }
    }
    return data;
}


/**
 * This is the core of the challenge.
 */
export const compareJSON = (firstJson, secondJson) => {

    const firstObjSingleLevelArray = [];
    const secondObjSingleLevelArray = [];

    transformJsonIntoSingleLevel(firstJson, '', firstObjSingleLevelArray);
    transformJsonIntoSingleLevel(secondJson, '', secondObjSingleLevelArray);

    const total = Math.max(firstObjSingleLevelArray.length, secondObjSingleLevelArray.length);
    let equalCount = 0;

    _map(firstObjSingleLevelArray, fJson => {
        const similar = _filter(secondObjSingleLevelArray, sJson => sJson.data === fJson.data && sJson.key === fJson.key);
        if (similar.length > 0) {
            equalCount++;
        }
    });
    
    return equalCount / total;
}