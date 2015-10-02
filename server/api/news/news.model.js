'use strict';

var Bookshelf = require('../../postgresInit');

var NewsItem = Bookshelf.Model.extend({
  tableName: 'news',
  hasTimestamps: true
});

var NewsCollection = new Bookshelf.Collection();
NewsCollection.model = NewsItem;


module.exports = {
  NewsItem: NewsItem,
  NewsCollection: NewsCollection
}