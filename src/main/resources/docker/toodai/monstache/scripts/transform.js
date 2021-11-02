module.exports = function (doc) {
  delete doc._id;
  return doc;
}