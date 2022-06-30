export default () => {
    return `
     <!doctype html>
     <html lang="en">
         <head>
             <meta charSet="utf-8"></meta>
             <title>MERN Kickstart</title>     
        </head>
        <body>
            <div id="root"></div>
            <script type="text/javascript" src="/dist/bundle.js">
                
            </script>
        </body>
     </html>`

}

// html template will be rendered in the browser from request on the root url
//div element will contain react component
