/* eslint no-console: 0 */
/* eslint curly: 0 */

const https = require( 'https' );
const FormData = require( 'form-data' );

function __getFormData( params ) {
	var form = new FormData();
	for ( var prop in params ) {
		form.append( prop, params[ prop ] );
	}
	return form;
}

class ElasticEmail {

	constructor( {
		apikey
	} = {} ) {
		this.apikey = apikey;
	}
	request( path, query ) {

		return new Promise( ( resolve, reject ) => {

			var params = {},
				optionspost,
				form,
				reqPost;
			// PATH VALIDATION
			if ( typeof path !== 'string' || path === '' ) return reject( new Error( 'Path should be a non-empty string!' ) );
			if ( path.charAt( 0 ) !== '/' ) path = `/${path}`;
			// SET PARAMS OBJECT
			if ( !query ) query = {};
			if ( this.apikey ) params.apikey = this.apikey;
			Object.assign( params, query );

			form = __getFormData( params );

			optionspost = {
				host: 'api.elasticemail.com',
				port: 443,
				path: `${path}?version=2`,
				method: 'POST',
				headers: form.getHeaders()
			};
			reqPost = https.request( optionspost, ( res ) => {
				res.on( 'data', ( data ) => {
					try {
						data = JSON.parse( data.toString() );
					} catch ( err ) {
						reject( err );
					}
					if ( !data.success ) return reject( new Error( data.error ) );
					resolve( data.data );
				} );
			} );
			form.pipe( reqPost );
			reqPost.on( 'error', ( err ) => {
				reject( err );
			} );
		} );
	}
	getKey() {
		return this.apikey;
	}
	setKey( key ) {
		return this.apikey = key;
	}
}

module.exports = {
	Client( opt ) {
		return new ElasticEmail( opt );
	}
};
