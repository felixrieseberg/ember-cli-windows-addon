/* jshint node: true */
'use strict';

var path = require('path'),
    spawn = require('child_process').spawn,
    RSVP = require('rsvp'),
    touch = require('touch'),
    fs = require('fs'),
    chalk = require('chalk'),
    isWin = /^win/.test(process.platform),
    cliPath = path.join(path.dirname(require.resolve('ember-cli-windows/package.json')), 'bin', 'ember-cli-windows');

module.exports = {
    name: 'ember-cli-windows-addon',
    includedCommands: function () {
        return {
            windows: {
                name: 'windows',
                aliases: ['win'],
                description: 'Configure Windows Search and Defender to improve performance for this project',
                works: 'insideProject',

                runCommand: function (args) {
                    return new RSVP.Promise(function (resolve, reject) {
                        var child, result, options, i;

                        options = [cliPath];
                        options.push('headless');
                        for (i = 0; i < args.length; i = i + 1) {
                            if (args.hasOwnProperty(args[i])) {
                                options.push(args[i]);
                            }
                        }

                        child = spawn('node', options);
                        result = {
                            output: [],
                            errors: [],
                            code: null
                        };

                        child.stdout.on('data', function (data) {
                            var string = data.toString();
                            if (this.ui) {
                                this.ui.writeLine(string);
                            } else {
                                console.log(string);
                            }

                            result.output.push(string);
                        });

                        child.stderr.on('data', function (data) {
                            var string = data.toString();
                            if (this.ui) {
                                this.ui.writeLine(string);
                            } else {
                                console.error(string);
                            }

                            result.errors.push(string);
                        });

                        child.on('close', function (code) {
                            result.code = code;

                            if (code === 0) {
                                touch.sync(path.join(__dirname, '.configured'));
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        });
                    });
                },

                run: function (options, rawArgs) {
                    if (!isWin) {
                        return;
                    }

                    return this.runCommand(rawArgs);
                }
            }
        };
    },

    preBuild: function () {
        if (!isWin) {
            try {
                var stats = fs.lstatSync(path.join(__dirname, '.configured')); // jshint ignore:line
            } catch (error) {
                // .configured doesn't exist, meaning that we're not configured yet
                if (this.ui) {
                    this.ui.writeLine(chalk.green.bold('Please run \'ember windows\` to configure Windows for better build performance.'));
                } else {
                    console.log(chalk.green.bold('Please run \'ember windows\` to configure Windows for better build performance.'));
                }
            }
        }
        return;
    }
};
