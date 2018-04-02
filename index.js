const get = require('lodash/get');

const getProp = (object, path) => {
    return get(object, path, null);
};

const buildObject = (getData, schema) => {
    return Object.keys(schema).map(getData)
        .reduce((acc, item) => ({ ...acc, [item.propName]: item.value }), {});
}

const singleGetData = object => schema => item => {
    return {
        propName: item,
        value: (typeof schema[item] === 'string') ? getProp(object, schema[item]) :
            (typeof schema[item] === 'object') ? buildObject(singleGetData(object)(schema[item]), schema[item]) :
                (typeof schema[item] === 'function') ? schema[item](object) : null
    }
};

const transform = (schema, object) => {
    const getData = singleGetData(object)(schema);
    return buildObject(getData, schema);
};

module.exports = transform;