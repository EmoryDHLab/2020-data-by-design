<!----- Conversion time: 3.291 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β15
* Tue Feb 19 2019 12:25:33 GMT-0800 (PST)
* Source doc: https://docs.google.com/open?id=1Hq0_eUvE-bin62PqbVLxGUtzeWVRp8vMPPH0o-XVov4
----->



# Data by Design (DxD)


## What Is Data By Design?

Data by Design is an interactive book by Dr. Lauren Klein. It is built for the modern web, using cutting edge technologies, and is still in development (since there is no other reason you would be reading this). The book focuses primarily on data visualizations from throughout history, and seeks to pull those visualizations into the present to draw insight from them. Each chapter focuses on a different visualization, but they all build onto an appreciation for data visualization, as well as for the interactivity afforded by the web.

Data by Design has a few features which place it on the cutting edge. In no particular order, these are listed below:



*   The Notebook: users can take notes on content in the chapter to save and come back to later, but the notebook allows dragging and dropping of content from the chapter into itself. This includes interactive content, meaning that readers have a sandbox to experiment with each visualization in.
*   The Meta-visualizations: the book, seeks to embrace its own interest in datavisualization fully, by visualizing its own content overall, and in each chapter.
*   The Scrolly-telling: The book seeks to fully embrace the "[hypermedia](http://www.newmediareader.com/book_samples/nmr-21-nelson.pdf)" potential of the web. Many well established sites have already implemented scrolly telling in their media, most notably the New York Times.

Most importantly, to the developers working on this project, Data by Design is an opportunity to learn. From this point forward, anyone who reads this document will be working on a pre-existing codebase. More than likely, you, the developer, have come to this document because you are trying to familiarize yourself with this project before you dive in head first. Whether this is your first rodeo or not, remember: be patient, be forgiving, and never hesitate to ask for help.


## Installation/Setup

This section is more concrete than the previous sections. It will walk you through common actions you may have to take in developing for Data By Design.


### Installation

In order to use this project, there are a few things you have to do. Most of these steps should be OS-independent, but I will link to tutorials whenever certain steps get more complicated. These steps are listed below.


#### Installing Node

The first step is to install Node.js onto your computer. There are a few different ways to go about installing Node, and this is one step that depends on your operating system. You can research these alone if you want (although beware that choosing [nvm](https://github.com/creationix/nvm) may lead to issues on linux if you need to install packages globally using sudo). I recommend following the directions on the [Node.js website](https://nodejs.org/en/download/) for your specific OS. You should install the LTS (currently 8.11.3).

Check your installation by running the command below. It should spit out v8.11.3 or higher.


```
$ node -v
```



#### Installing MySQL

MySQL is the database which backs our website. Installation depends on your operating system. On Ubuntu 16.04, you should install using this command:


```
$ sudo apt-get install mysql-server
```


You should create a root password (keep it safe and close by). Then login to your MySQL server and create two databases, one called dxd_development another called dxd_production. Below, you can see this process in a bash shell for Ubuntu. In a production environment, you may only need the dxd_production database, but that is totally up to you.


```
$ mysql -u root -p # you'll enter your password below this command
…
# once inside mysql
> CREATE DATABASE dxd_development;
> CREATE DATABASE dxd_production;
```


It is highly recommended that you create **at least one separate MySQL user** and give it access to these databases. In production, make sure that the password is **strong** and does not contain any of these symbols: (#, ", \, /). They may cause issues when you go to store the password in an environment variable. Here is this process on Ubuntu.


```
# still in MySQL
> GRANT ALL PRIVILEGES ON dxd_production.* to 'dxdAdmin'@'localhost' identified by '<your strong password>';
> GRANT ALL PRIVILEGES ON dxd_development.* to 'dxdAdmin'@'localhost';
```


Make sure to change that password placeholder! You can skip the second command if you want to create a different user for dxd_development. To create that user, just change the database name, username, and password in the first command and run it. Again, make sure to keep track of the usernames and passwords for these accounts.

Now that MySQL is installed, we can move on to cloning the repository.


#### Cloning the repository

Our code is hosted on GitHub at [https://github.com/GeorgiaTechDHLab/DataByDesign](https://github.com/GeorgiaTechDHLab/DataByDesign), There are two branches you need to care about. The first is 'master' (duh), but that one comes by default. The second is 'dev' (this branch has the cutting edge changes, and allows us to stage changes before pushing them to our server). We will need to clone the repository, then checkout and track the dev branch. To do this with ssh (though you could use https too), do the following:


```
$ git clone git@github.com:GeorgiaTechDHLab/DataByDesign.git
$ git checkout --track origin/dev
```


Now you have access to the codebase, and we just need to stitch everything together!


#### Installing Node Modules

Before we get started tying all of these steps together, we need to install the node modules required by the project. These stay out of the repository, so you need to install them with npm (the Node.js package manager).


```
$ npm install
```


If you want to be able to leverage the production environment commands, you'll also want to do this:


```
$ npm install -g forever
```


If you want to be able to leverage the [loopback cli tool](https://loopback.io/doc/en/lb3/Installation.html#install-loopback-cli-tool) (generate models, roles, access controls, etc), then do this:


```
$ npm install -g loopback-cli
```


Now we need to make loopback aware of our database configurations, and generate secrets for our signed cookies.


#### Setting Environment Variables

In Loopback, we have a few different environment variables which need to be set in order for us to be able to use the database and signed cookies. Rather than have you set these environment variables on your machine, you will set them in a .env file. The required variables are below. You can copy and paste this into your own .env file and fill in the information yourself (hopefully you didn't forget any usernames or passwords from the last steps).


```
# env configuration example file (at /.env in the directory)
# Secret for cookies (64 character random string, no #, ", or '
DXD_SECRET=<COOKIE_SECRET>

# Production DB
DXD_PRODUCTION_USERNAME=<PRODUCTION_USERNAME>
DXD_PRODUCTION_DATABASE=dxd_production
DXD_PRODUCTION_PASSWORD=<PRODUCTION_PASSWORD>

# Development/Test DB
DXD_USERNAME=<DEVELOPMENT_USERNAME>
DXD_DATABASE=dxd_development
DXD_PASSWORD=<DEVELOPMENT_PASSWORD>
```


You should save this file in the root of the project, **not** in the a subdirectory (like server). You can change any of these values to make the project work based on your setup. If NODE_ENV is set to production, the production db credentials will be used, otherwise the development ones will be. If a mode is left blank or invalid, the server **will not launch** properly. Double check these once you finish. Make sure you don't have conflicting env variables set already, as they will not be overridden!

Once you do that, You should be good to go! Go ahead to the next section to learn how to run the app.


### Running the code

There are a number of ways you can run the app or different pieces of it. All of these can be found under the 'scripts' section in the package.json file. Scripts can be run using this format:


<table>
  <tr>
   <td>If you're actively developing, you should probably use:
   </td>
   <td><code>$ npm run start:dev</code>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>If you're deploying to production for the 1st time, use:
   </td>
   <td><code>$ sudo npm run start</code>
   </td>
  </tr>
</table>



<table>
  <tr>
   <td>If you are updating production code, use:
   </td>
   <td><code>$ sudo npm run restart</code>
   </td>
  </tr>
</table>



#### Starting for Development
If you are working on the site, you should probably be using these commands. Each command will enable hot reloading for the server and/or the vue app, meaning that as you update the code, it will auto update in the browser!


<table>
  <tr>
   <td><code>$ npm run api:dev</code>
   </td>
   <td>Starts only the server in development mode using nodemon for hot reloads (port 3000).
<p>
The frontend may not work, but all the api endpoints will.
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ npm run app:dev</code>
   </td>
   <td>Starts vue app with hot reloads on port 8080 using the vue-cli. Any api calls will fail unless you manually run api:dev as well.
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ npm run start:dev</code>
   </td>
   <td>Starts the app and api in parallel, each in development mode, both with hot reloading. Use this in development.
   </td>
  </tr>
</table>



#### Starting for Production

It is highly recommended that you run these commands using sudo when working on the server. If you are deploying locally to test a deployment, you can leave it off. It has been included in the commands below since it is best practice.


<table>
  <tr>
   <td><code>$ sudo npm run api</code>
   </td>
   <td>Starts the api using forever, (meaning that you will have to manually stop it later, since it will be in the background). The frontend will not be built, so it may not work, and won't be updated from the last build.
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ sudo npm run start</code>
   </td>
   <td>Builds the vue app and then runs the server in production mode
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ sudo npm run start:reset</code>
   </td>
   <td>Builds the vue app and then runs the server in production mode, but clears the database first
   </td>
  </tr>
</table>



#### Restarting or Stopping the App

These commands are used in production when you need to restart the server or stop it altogether.


<table>
  <tr>
   <td><code>$ npm run restart</code>
   </td>
   <td>Restarts an already running production server (stops the previous, then starts the current). Use this to update production
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ npm run stop</code>
   </td>
   <td>Stop a production server running with forever
   </td>
  </tr>
</table>



#### Building the Vue Front-end

If, for some reason, you want to build the front end directly you can use this command.

**Note:** this is done by default when you use   <code>$ <em>npm run start </em></code>, so it most likely won't be necessary.


<table>
  <tr>
   <td><code>$ npm run build</code>
   </td>
   <td>Builds the Vue app front-end.
   </td>
  </tr>
</table>



#### Testing/Linting Commands

The following commands are used for testing and linting the code for the server and app.


<table>
  <tr>
   <td><code>$ npm run lint</code>
   </td>
   <td>Runs eslint on the front and back-end code
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ npm run test:unit</code>
   </td>
   <td>Runs the Vue unit tests
   </td>
  </tr>
</table>



<table>
  <tr>
   <td><code>$ npm run posttest</code>
   </td>
   <td>Lints and runs a security check on the server
   </td>
  </tr>
</table>



<!-- Docs to Markdown version 1.0β15 -->
