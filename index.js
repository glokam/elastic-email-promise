/* eslint no-console: 0 */

const https = require( 'https' );
const querystring = require( 'querystring' );

function request (path) {

	return new Promise(function (resolve, reject) {
		var params = querystring.stringify( {
			'apikey': 'Your-Api-Key',
		} );

		var postheaders = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': params.length
		};

		var optionspost = {
			host: 'api.elasticemail.com',
			port: 443,
			path: `${path}?version=2`,
			method: 'POST',
			headers: postheaders
		};

		var reqPost = https.request( optionspost, ( res ) => {
			console.log( 'statusCode: ', res.statusCode );
			res.on( 'data', ( data ) => {
				resolve( JSON.parse(data.toString()) );
			} );
		} );

		reqPost.end( params );

		reqPost.on( 'error', ( err ) => {
			reject( err );
		} );


	});

}
module.exports = {
	request
}
