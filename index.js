/* eslint no-console: 0 */
/* eslint curly: 0 */

const https = require( 'https' );
const querystring = require( 'querystring' );

class ElasticEmail {

	constructor( { apikey } = {} ) {
		this.apikey = apikey;
	}
	request( path, query ) {

		return new Promise( ( resolve, reject ) => {

			var params = {},
				postheaders,
				optionspost,
				reqPost;

			if ( !query ) query = {};
			if ( this.apikey ) params.apikey = this.apikey;
			Object.assign( params, query );
			params = querystring.stringify( params );
			postheaders = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': params.length
			};
			optionspost = {
				host: 'api.elasticemail.com',
				port: 443,
				path: `${path}?version=2`,
				method: 'POST',
				headers: postheaders
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
			reqPost.end( params );
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
