# Agile_Group13

Our group contains 6 CIT students who want to gain experience through this course and learn how to work in a group using Agile.

Our group members include: Maryam Taer, Uy Tran, Mahsa Taer, Shayan Sabzkoohi, Fatemeh Rezaeian, and Ranjot Kaur. Three of us just finished term 2 of the CIT (Maryam, Mahsa, and Uy), and the other 3 members finished term 1 of CIT program (Shayan, Fatemeh, and Ranjot).

We have worked on an application called PHOENIX which is a web-based application for online food orders.
We use Angular as our frontend and Node.js ad our backend. We also use mongodb as our database.

The purpose of our app is as below:
    Users can order food from their favourite and nearest restaurants → They don’t need to go out anymore.
    Restaurants can have their business back almost as good as what it was before the pandemic
    This is an app both for users and restaurants
    Users can easily create and manage their accounts
    Users can provide ratings and feedbacks for the particular restaurant.

****************************************************************************************************************************************

The instruction on how to run the program:

    pull the file into your local system.
    
    open the Angular[forntEnd] file.
    
    Run these commands in the path where the "package.json" file is: 
        npm install
        npm install bootstrap.css
        npm install fontawesome
        npm install jQuery.js
        npm install bootstrap.js
        
    After running those commands, run this command below to compile the front-end:
        ng serve
    !! wait until it successfully compiles the code.

    Now navigate to the Node[backEnd] file.
    
    Run this commands in the path where the "package.json" file is:
        npm install

    Navigate to the test folder and run these commands in that path:
        npm install mocha
        npm install chai
        npm install chai-http

    After that, open the Node[backEnd] file into your IDE (either Visual Studio Code or Webstorm).

    Than, open the "app.js" file.

    Then right click on the page name and click debug.

    After debuggin successfully, go to your browser.

    Type "localhost:4200" in the URL.

    Press ENTER.
****************************************************************************************************************************************

We have 5 repositories in total including master, dev, html, jscript, and style.
We didnt push anything to the master until the final and combined version of our app. The reason why we divided our repos in GitHub is that whenever someone wanted to push something there will be no conflict or overwriting.

We worked on 2 different versions; one using bootstrap, and the other one without using bootstrap.
So, to make sure that there won't be any collison between there two versions we pushed the bear code (without bootstrap) into the dev branch and the other one (with bootstrap) into the style branch.

The ones with javascript we pushed into jscript branch and the one with html codes we pushed into html branch.

Also, we started integrating Travis CI with our GitHub dev repo.
