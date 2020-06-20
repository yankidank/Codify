// usage
//      const {parameters} = req.body;
//      let objectWithoutUndefinedFields = dropUndefined({parameters});

function dropUndefined(object) {
	const keyArr = Object.keys(object);
	keyArr.forEach((key) => {
		if (object[key] == undefined || object[key] == "" || object[key] == null) delete object[key];
	});
	return object;
}
module.exports = {
	dropUndefined
};
