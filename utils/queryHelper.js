const moment = require('moment');
const { isValidObjectId } = require('mongoose');

// usage:
//   const users = await User.find({
//     $and: buildFilter({ displayName, email, createdAt, updatedAt })
//   });

function flatten(obj) {
  const isObject = val => typeof val === 'object' && !Array.isArray(val);

  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

  const paths = (obj = {}, head = '') => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      let fullPath = addDelimiter(head, key);
      return isObject(value)
        ? [...product, ...paths(value, fullPath)]
        : [...product, [fullPath, value]];
    }, []);
  };

  const dotObject = Object.fromEntries(paths(obj));

  return dotObject;
}

function buildFilter(fieldObject) {
  return Object.entries(flatten(fieldObject))
    .map(([key, value]) => {

      if (isValidObjectId(value)) {
        return { [key]: value }
      }

      const number = parseFloat(value)
      if (number) {
        return { [key]: number };
      }

      const date = Date.parse(value);
      if (date) {
        return {
          [key]: {
            $gte: moment(date).startOf('day'),
            $lte: moment(date).endOf('day'),
          },
        };
      }

      if (typeof value == 'string') {
        return { [key]: new RegExp(value) };
      }
    })
    .filter(field => field);
}

module.exports = {
  buildFilter,
};
