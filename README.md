### Quick Example:

```js
const ee = require( 'elastic-email-lite' );

const eeClient = ee.Client( { apikey: 'Your Apikey' } );

eeClient.request( '/account/load' )
    .then( function( data ) { console.log( data ) } )
    .catch( function( error ) { console.log( error ) } )
```
