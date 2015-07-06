'use strict';

var send = require('send'),
    express = require('express'),
    url = require('url'),
    logger = require('../logger-winston');

module.exports = function st(root, options) {
    options = options || {};
    var cutIndex = 0;

    return function (req, res, next) {

        var originalUrl = req.originalUrl;

        if (hasUrl('/styles') || hasUrl('/scripts') || hasUrl('/images')) {

            if (hasUrl('/scripts')) {
                cutIndex = originalUrl.indexOf('/scripts');
            }
            if (hasUrl('/styles')) {
                cutIndex = originalUrl.indexOf('/styles');
            }
            req.originalUrl = originalUrl.substring(cutIndex);
            req.url = req.url.substring(cutIndex);

            return express.static('public')(req, res, next);
        }

        if (!hasUrl('/api') || !hasUrl('/auth')) {
            if ('GET' != req.method && 'HEAD' != req.method) return next();

            send(req, '/', {
                maxage: options.maxAge || 0,
                root: root,
                index: options.index || 'index.html'
            })
                .pipe(res);

        } else {
            next();
        }

        function hasUrl(partOfUrl) {
            return originalUrl.indexOf(partOfUrl) > -1;
        }
    };
};