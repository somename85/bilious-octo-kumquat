'use strict';

const webpack = require('webpack');
const path = require('path');

const dir = getTargetDir(process.argv[2]);
const config = createConfig(dir);

webpack(config, (err, stats) => {
    if (err) {
        return handleFatalError(err);
    }

    const jsonStats = stats.toJson();

    if (stats.hasErrors()) {
        return handleSoftErrors(jsonStats.errors);
    }

    if (stats.hasWarnings()) {
        handleWarnings(jsonStats.warnings);
    }


    console.log(stats.toString({colors: true}));
});

function handleFatalError(err) {
    console.log('Fatal error');
    console.log(err);
}
function handleSoftErrors(errors) {
    console.log('Errors:');
    errors.forEach(function (err) {
        console.log(err);
    });
}
function handleWarnings(warnings) {
    console.log('Warnings:');
    warnings.forEach(function (warn) {
        console.log(warn);
    });
}
function getTargetDir(inputString) {
    const possibleValues = [
        'src',
        'public'
    ];

    if (~possibleValues.indexOf(inputString)) {
        return inputString;
    } else {
         console.log(
            'Invalid target:',
            inputString,
            '.\nUsage: "node webpack.build.js target", target can be:',
            possibleValues.join(', ')
        );

        process.exit(1);
    }
}
function createConfig(target) {
    return {
        entry: './src/js/app',
        output: {
            filename: `./${target}/js/app.compiled.js`
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /backbone\.js$/,
                    loader: 'imports?define=>false'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.IgnorePlugin(/^(jquery)$/),
            new webpack.ProvidePlugin({
                Backbone: 'backbone',
                _: 'underscore',
                moment: 'moment-timezone',
                'Backbone.NativeView': 'backbone.nativeview',
                'Backbone.NativeAjax': 'backbone.nativeajax'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };

}