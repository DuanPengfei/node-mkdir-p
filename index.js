'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {String} [_path]
 * @return {String}
 */
function absolutePath(_path) {
    _path = _path || '';
    _path = path.resolve(_path);

    let index = _path.indexOf('~');
    if (index !== -1) {
        _path = process.env.HOME + _path.slice(index + 1);
    }

    return _path;
}

/**
 * 
 * @param {String} _path
 * @param {Number} [mode]
 * @param {Function} callback
 */
function mkdirP(_path, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = undefined;
    }
    callback = callback || function () {};

    _path = absolutePath(_path);

    fs.mkdir(_path, mode, function (error) {
        if (error) {
            if (/no such file or directory/i.test(error.messag)) {
                mkdirP(path.dirname(_path), mode, function (error) {
                    if (error) {
                        return callback(error);
                    } else {
                        mkdirP(_path, mode,function () {
                            return callback(undefined, _path);
                        });
                    }
                });
            } else {
                return callback(error);
            }
        } else {
            return callback(undefined, _path);
        }
    });
}

/**
 * 
 * @param {String} _path
 * @param {Number} [mode]
 * @return {String}
 */
function mkdirPSync(_path, mode) {
    _path = absolutePath(_path);

    try {
        fs.mkdirSync(_path, mode);
    } catch (error) {
        if (/no such file or directory/i.test(error.message)) {
            mkdirPSync(path.dirname(_path), mode);
            mkdirPSync(_path, mode);
        } else {
            throw error;
        }
    }

    return _path;
};

module.exports = {
    sync: mkdirP,
    recursion: mkdirPSync
}
