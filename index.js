'use strict';
var TAG = 'Tournamenter';

/**
 * Module dependencies
 */
var async = require('async');

/**
 * Global App Object
 */
var app = {
};

/**
 * Define Globals
 */
global.app = app;

global._ = require('lodash');
global.chalk = require('chalk');
global.electron = require('electron');
global.eApp = global.electron.app;
global._TAG = function (tag){
  return chalk.yellow(`[${tag}]`);
}

/**
 * Squirrel Bootstrap
 * (Used while Installing/Updating...)
 */
if(require('./config/squirrel')()){
  return;
}

/*
 * Bootstrap Process
 */
var configSetps = [
  // Load configuration options
  require('./config/config'),

	// Bootstrap Helpers
	require('./config/helpers'),

	// Bootstrap Models
	// require('./config/models'),

	// Bootstrap Controllers
	require('./config/controllers'),

  // Initialize electron
  require('./config/electron'),
];

// Configure steps and initialize
async.eachSeries(configSetps, function (config, next){
	config(app, next);
}, function (err){
  // Check if an error ocurred during initialization
	if(err){
		console.error(TAG, 'Failed to initialize BajaSync: %s', err);
		throw err;
    return
	}

  // App started OK.
	console.log(TAG, chalk.green('App started'));

  //
  // Launch app
  //
  app.controllers.App.init();

});
