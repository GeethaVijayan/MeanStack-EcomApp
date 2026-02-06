//for my general understanding of node jss i'm adding all here the flow

  JS logic to end 
     fullstack 
       component subscribecall->serviceCall->having pot(method name )
       comes to node 

       here three parts 
        1) db folder - contains all models to save in db 
        2)handlers - its like service in frontend having main core logic 
        3)routes - calling methods in handlers 

        4) app.js -startng connecting express and mongoose
           basic requirements 
             require express for middleware connect 
             require mongoose for db connect 

             we are creating routes for different calls and mounting it in app.js
             using app.use(router.js) with that it will call handler.js and getting data with db.js models from mongodb .this is the flow 