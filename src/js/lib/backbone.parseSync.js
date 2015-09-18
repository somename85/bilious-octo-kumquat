import config from '../../../config';

const methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
};

const backboneSync = function(method, model, options) {
    const objectId = model.models ? "" : model.id;
    const className = model.__proto__._parse_class_name;

    let type = methodMap[method];
    options = options || {};

    const base_url = 'https://api.parse.com/' + config['REST API Version'] + '/classes';
    let url = base_url + '/' + className + '/';
    if (method !== 'create') url = url + objectId;


    let data;
    if (!options.data && model && (method === 'create' || method === 'update')) {
        data = JSON.stringify(model.toJSON());
    } else if (options.query && method === 'read') {
        data = encodeURI('where=' + JSON.stringify(options.query));
    }

    const request = {
        //data
        contentType: "application/json",
        processData: false,
        dataType: 'json',
        data: data,

        //action
        url: url,
        type: type,

        //authentication
        headers: {
            "X-Parse-Application-Id": config['Application ID'],
            "X-Parse-REST-API-Key": config['REST API Key']
        }
    };

    return Backbone.ajax(_.extend(options, request));
};

replaceBackboneModelParseFn();
replaceBackboneCollectionParseFn();

function replaceBackboneModelParseFn() {
    const original_toJSON = Backbone.Model.prototype.toJSON;

    const ParseModel = {
        toJSON(options) {
            let data = original_toJSON.call(this, options);

            delete data.createdAt;
            delete data.updatedAt;

            return data
        },

        idAttribute: "objectId"
    };

    _.extend(Backbone.Model.prototype, ParseModel);
}
function replaceBackboneCollectionParseFn() {
    const original_parse = Backbone.Collection.prototype.parse;

    const ParseCollection = {
        parse(options) {
            let _parse_class_name = this.__proto__._parse_class_name;
            let data = original_parse.call(this, options);

            if (_parse_class_name && data.results) {
                return data.results;
            } else {
                return data;
            }
        }
    };

    _.extend(Backbone.Collection.prototype, ParseCollection);
}


export default backboneSync;