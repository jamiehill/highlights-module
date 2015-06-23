Base Module
===========

The building blocks for creating a new self contained - and runnable - module, to be consumed by the Sportsbook shell.


Creating a new module from scratch
----------------------------------

Clone the repository, changing the remote origin to point to the new module's repository location

    $ git clone https://github.com/jamiehill/base-module.git mynew-module
    $ cd mynew-module
    $ git remote rename origin upstream
    $ git remote add origin URL_TO_GITHUB_REPO
    $ git push origin master

You'll now have a copy of the base-module in your new mdoule repository, which should be pre-configured to run out-of-the-box.


Required actions
----------------

Inside the `./src/module/js` folder in the new module, is a folder called `base`.  This folder name dictates hows the module should be namespaced, to avoid import colissions from other modules.  As such, the name should be changed, to something appropriate for the module.
The are several other files in the root of `./src/module/js`.  These are files required to boot the module up independantly of a shell application, and shouldn't be modify or removed.  When importing a module into a shell application, the only files visible to the application are what's inside the namespace folder we renamed earlier.
