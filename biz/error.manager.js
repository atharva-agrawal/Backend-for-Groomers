'use strict';

class ErrorManager {

    static get(msg) {
        try{
            if (!msg) {
            throw new Error('msg argument is required to set the error.');
        }
        const result = {
            message: msg.message || msg
        };
        if (typeof msg == 'object' && msg.name == 'ValidationError' && Object.keys(msg.errors).length > 0) {
            result['errors'] = msg.errors;
            return result;
        }
    
        return result;
    }catch(err){
        return err;
    }
}
    
}

module.exports = ErrorManager;