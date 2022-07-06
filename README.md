# Udacity Shell SW Engineer NanoDegree Project1
##  Image Processing API

This project provides a REST API created in Express which can accept a filename stored in the 'assets/full' folder and convert it to the dimensions provided as url parameters. Uses Morgan for HTTP logging and Winston for other logging, Jasmine/supertest for testing API

API will return a web page with a single IMG tag and the source will be set to the thumbs image generated based on the width and height values passed.Default values are 500,500

>Based on the value for 'fit' , the returned image may not have the same height and width requested in the url.

### Current version : v1

### Endpoints :
**/api/v1/image**

    Mandatory parameters
        - filename _provide valid values which are filenames available in the /assets/full folder_
        - width
        - height
    Optional parameters
        - fit  _accepts the following values_ => _cover, contain, fill, inside , outside_ . Default is cover. See [sharp documentation for details](https://sharp.pixelplumbing.com/api-resize)
        - format  **accepts only jpg for now which is the default value**
        - quality **values 1 - 100**
		
Sample url
	
> http://localhost:3000/api/v1/images?filename=fjord.jpg&height=600&width=800&fit=cover
	

### Environment setup

 __Environment variables__  
	NODE_ENV Set to **development** to see debug logs and http requests logs written by Morgan
	NODE_PORT  set to change the default listening port (3000)
	
 __scripts__ :
	    Production :
>		    npm run build   => use TSC to convert typescript to javascript and place the files under dist folder
>		    npm run prettier => Run prettier, automatically save the changes
>		    npm run lint 	=> Run eslint, automatically fixes layout changes and saves
>		    npm start   => Starts node with index.js from dist folder
		
&nbsp;
    development :
>		 npm run test 	=> run build , then jasmine
>        npm run build-dev   => run TSC in watch mode
>        npm run start-dev   => start nodemon

### Notes
1. Test script will check the following
    - API is up and running
    - Is an error thrown for incorrect parameters
    - Does the converted image has a file name in the format 'filename-width-height.jpg'