'use strict';

var _ = require('lodash');
var News = require('./news.model');
var NewsItem = News.NewsItem;
var NewsCollection = News.NewsCollection;

// Get list of news
exports.index = function(req, res) {
  NewsCollection.reset().fetch()
  .then(function(newsItems){
    return res.json(200,newsItems.models);
  })
  .catch(function(err, arg2){
    return handleError(res, err);
  });
};

// Get a single news
exports.show = function(req, res) {
  //TODO Add in if not found
  new NewsItem({id: req.params.id}).fetch()
    .then(function(newsItem){
      return res.json(200,newsItem);
    })
    .catch(function(err){
      return handleError(res,err);
    })
};

// Creates a new news in the DB.
exports.create = function(req, res) {
  var news = new NewsItem({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  })
  news.save()
    .then(function(newNews){
      NewsCollection.add(newNews);
      return res.json(201, newNews);
    })
    .catch(function(err){
      return handleError(res,err);
    })
};

// Updates an existing news in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  new NewsItem({id: req.params.id}).fetch({require: true})
    .then(function(item){
      item.save({
        title: req.body.title || item.get('title'),
        body: req.body.body || item.get('body'),
        author: req.body.author || item.get('author')
      })
      .then(function(){
        return res.json(200, item);
      })
      .catch(function(){
        return handleError(res, err);
      })
    })
    .catch(function(){
      return res.send(404);
    })
};

// Deletes a news from the DB.
exports.destroy = function(req, res) {
  new NewsItem({id: req.params.id}).fetch({require: true})
    .then(function(item){
      item.destroy()
        .then(function(item) {
          return res.json(204,item)
        })
        .catch(function(err){
          return handleError(res,err);
        })
    })
    .catch(function(err){
      return res.send(404);
    })
};

function handleError(res, err) {
  return res.send(500, err);
}