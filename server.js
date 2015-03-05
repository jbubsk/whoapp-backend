var application = require('./application'),
    logger = require('./src/logger-winston');

application.connectDB();
application.startExpress();

logger.info('App started');
