const ErrorManager = require('../biz/error.manager');

const STATUS = require('../constant/status');
const HEADER = require('../constant/header');

/**
 * Base Controller Class. This class will be used for keeping general logic.
 */
class Controller {
    constructor() {
    }

    ok(res, result) {
        res.status(STATUS.OK)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(JSON.stringify(result));
    }

    error(res, err) {
        // TODO: Uncomment below before deployment.
        res.status(err.status || STATUS.ERROR).send(ErrorManager.get(err));
    }
}

module.exports = Controller;
