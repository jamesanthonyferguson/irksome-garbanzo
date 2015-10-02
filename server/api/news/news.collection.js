'use strict';
var NewsItem = require('./news.model');
var Bookshelf = require('../../postgresInit');

var News = new Bookshelf.Collection();

News.model = NewsItem;

module.exports = News;