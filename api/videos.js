const db = require('../src/db.json');

module.exports = async function (context, req) {
    context.res.headers['Content-Type'] = 'application/json';
    context.res.status = 200;
    context.res.body = db.videos;
};
