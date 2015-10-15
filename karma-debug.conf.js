var baseConfigurator = require('./karma.conf.js');

module.exports = function(config) {
	baseConfigurator(config);

	config.set({
		browsers: ['Firefox'],
		singleRun: false,
		autoWatch: true,
		reporters: ['dots'],
		colors: false
	});
};
