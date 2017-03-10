'use strict';

const fs = require('fs');
const path = require('path');

/**
 * fetch absolute path
 * @param {String} _path relative path
 * @return {String} _path absolute path
 */
function _fetchAbsolutePath(_path) {
    _path = path.resolve(_path);

    const index = _path.indexOf('~') + 1;
    if (index) {
        _path = process.env.HOME + _path.slice(index);
    }
    
    return _path;
};

/**
 * mkdir -p async
 * @param {String} _path dir path need to be created
 * @param {Number} [mode] file permission mode
 * @param {Function} callback callback function
 */
function mkdirP(_path, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 0o755;
    }
    callback = callback || function () {};

    _path = _fetchAbsolutePath(_path);

    fs.mkdir(_path, mode, function (error) {
        if (error) {
            if (/no such file or directory/i.test(error.message)) {
                mkdirP(path.dirname(_path), mode, function (error) {
                    if (error) {
                        return callback(error);
                    } else {
                        mkdirP(_path, mode, function () {
                            return callback(null, _path);
                        });
                    }
                });
            } else if (/file already exists/i.test(error.message)) {
                return callback(null, _path);
            } else {
                return callback(error);
            }
        } else {
            return callback(null, _path);
        }
    });
}

/**
 * mkdir -p sync
 * @param {String} _path dir path need to be created
 * @param {Number} [mode] file permission mode
 * @return {String} dir absolute path need to be created
 */
function mkdirPSync(_path, mode) {
    _path = _fetchAbsolutePath(_path);

    try {
        fs.mkdirSync(_path, mode);
    } catch (error) {
        if (/no such file or directory/i.test(error.message)) {
            mkdirPSync(path.dirname(_path), mode);
            mkdirPSync(_path, mode);
        } else if (/file already exists/i.test(error.message)) {
            // do nothing
        } else {
            throw error;
        }
    }

    return _path;
};

module.exports = {
    recursion: mkdirP,
    sync: mkdirPSync
}
