/* eslint no-console: 0 */

const https = require( 'https' );
const querystring = require( 'querystring' );

// do a POST request
// create the params object
var params = querystring.stringify( {
	'apikey': 'Your-Api-Key',
	'subject': 'Email Subject',
	'from': 'from.emial@example.pl',
	'template': 'Template Name',
	'to': 'recipient.email@example.com'
} );

// prepare the header
var postheaders = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Content-Length': params.length
};

// the post options
var optionspost = {
	host: 'api.elasticemail.com',
	port: 443,
	path: '/email/send?version=2',
	method: 'POST',
	headers: postheaders
};

// do the POST call
var reqPost = https.request( optionspost, ( res ) => {
	console.log( 'statusCode: ', res.statusCode );
	res.on( 'data', ( data ) => {
		console.log( data );
	} );
} );

reqPost.end( params );

reqPost.on( 'error', ( err ) => {
	console.error( err );
} );
