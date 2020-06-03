const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
const fs = require('fs');


class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.max = options;
    this.count = 0;
  }

  _transform(chunk, encoding, callback) {
    this.count += chunk.length;
    if (this.count > this.max) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

const limitedStream = new LimitSizeStream();
const outStream = fs.createWriteStream('out.txt');

limitedStream.pipe(outStream);

module.exports = LimitSizeStream;
