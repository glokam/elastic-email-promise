This LITE Wrapper, allows you to quickly and easily use the Elastic Email API v2 via Node.js and with ES 2015 Promises.

### Quick Examples:
__Install:__
```js
npm i elastic-email-promise
```
__Set up your client:__
```js
const ee = require( 'elastic-email-promise' );
const eeClient = ee.Client( { apikey: 'Your Apikey' } );
```
__request method with only api key required:__
```js
eeClient.request( '/account/load' )
    .then( function( data ) { console.log( data ) } )
    .catch( function( error ) { console.log( error ) } );
```
__request method with more parameters:__
```js
eeClient.request( '/contact/findcontact', { email: 'example@example.com' } )
    .then( function( data ) { console.log( data ) } )
    .catch( function( error ) { console.log( error.message ) } )
```
__request method with file upload:__
```js
const fs = require('fs');

eeClient.request( '/contact/upload', {
    contactFile: fs.createReadStream('CSV_Sample1.csv')
    })
	.then( function( data ) { console.log( data ) } )
	.catch( function( error ) { console.log( error.message ) } )
```
### Request method:

```js
 eepromise.request( 'path', { params } );
```
__path__ : string; path for method (f.e. "/channel/list")
__params__: object; parameters for method
__return__ => Promise Object with respond

__More information about EE Api methods you can find in [EE API Documentation](https://api.elasticemail.com/public/help)__

##### How does elastic-email-promise pass Elastic Email response?

Elastic Email API (version 2) response dosen't have correct HTTP status code. All responses are JSON string:
```js
//On success
{success: true, data: /* response data it could be array or object */}
//On false
{success: false, error: 'error message as string'}
```
1. Elastic Email Promise will __try__ parse response to __JSON__.
* If something goes wrong, the exception be thrown to Promise __reject__
2. Then JSON __success__ parameter will be check.
* If __true__: resolve( __data__ );
* If __false__: reject( new Error( __error__ ) );
