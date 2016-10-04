const KeyPoints = {}
module.exports = KeyPoints

// Width and Height of field in mm
KeyPoints.WIDTH = 1500
KeyPoints.HEIGHT = 1200

// Referenced to the center being 0
KeyPoints.LEFT  = -KeyPoints.WIDTH / 2
KeyPoints.RIGHT =  KeyPoints.WIDTH / 2
KeyPoints.TOP = -KeyPoints.HEIGHT / 2
KeyPoints.BOT =  KeyPoints.HEIGHT / 2

KeyPoints.CENTER = new Victor(0, 0)

KeyPoints.center = {
  CENTER: KeyPoints.CENTER,
  RIGHT: new Victor(KeyPoints.RIGHT, 0),
  LEFT:  new Victor(KeyPoints.LEFT, 0),
  TOP: new Victor(0, KeyPoints.TOP),
  BOT: new Victor(0, KeyPoints.BOT),
}

// Keypoints on the LEFT vertical line of the field
KeyPoints.left = {
  CENTER: new Victor(KeyPoints.LEFT, 0),
  TOP: new Victor(KeyPoints.LEFT, KeyPoints.TOP),
  BOT: new Victor(KeyPoints.LEFT, KeyPoints.BOT),
}

// Keypoints on the RIGHT vertical line of the field
KeyPoints.right = {
  CENTER: new Victor(KeyPoints.RIGHT, 0),
  TOP: new Victor(KeyPoints.RIGHT, KeyPoints.TOP),
  BOT: new Victor(KeyPoints.RIGHT, KeyPoints.BOT),
}

// Neutral Keypoints
KeyPoints.neutrals = {
  // TODO
  top: {
    RIGHT: new Victor(),
    LEFT: new Victor(),
  },

  bot: {
    RIGHT: new Victor(),
    LEFT: new Victor(),
  },

  left: {
    TOP: new Victor(),
    BOT: new Victor(),
  },

  right: {
    TOP: new Victor(),
    BOT: new Victor(),
  }
}

// Goal Keypoints
KeyPoints.goals = {
  RIGHT: KeyPoints.right.CENTER,
  LEFT:  KeyPoints.left.CENTER,

  // More Details about each Goal (Top/Bot Limits, Area Limit...)
  right: {
    // TODO
    PENALTY: new Victor(),
    TOP: new Victor(),
    BOT: new Victor(),
  },

  left: {
    // TODO
    PENALTY: new Victor(),
    TOP: new Victor(),
    BOT: new Victor(),
  },
}
