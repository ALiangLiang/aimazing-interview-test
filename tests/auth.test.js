const LambdaTester = require( 'lambda-tester' );
 
const myHandler = require( '../funcions/auth' ).handler;
 
describe( 'handler', function() {
    it( 'test auth', async function() {
        await LambdaTester( myHandler )
            .event((eventMocks) => eventMocks.apiGateway()
              .path( '/auth' )
              .method( 'POST' )
              .header( 'day', 'Friday' )
              .body({
                'username': process.env.ACCOUNT,
                'password': process.env.PASSWORD
              })
              .build())
            .expectResult();
    });
});