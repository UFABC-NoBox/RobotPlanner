const Victor = require('Victor')

module.exports = Line

function Line(start, end) {
  this.start = start || new Victor()
  this.end = end || new Victor()
}

Line.prototype.getNearestPoint = function (point) {
  // TODO
  // Returns the nearest point within the start/end line segment
  return null;
}

Line.prototype.getIntersection = function (line, limit = false) {
  // TODO
  // Returns the intersection point within the start/end line segment
  // limit = true: If intersect. occurs before/after start/end, return start/end
  // limit = false: Return null if doesn't occurs inside the line segment
  return null;
}
