# Ultimate Event
This is an Angular/Django Eventplanner Application by students of the FH JOANNEUM. 

# Requirements

* Python 2.2.7
* IntelliJ or Pycharm as IDE
* Django Server

# Project

This is an Eventplanner Application which allows you to plan important Events in Advance. 

### Install for Windows

1. Install the following Python packages using pip and requirements.txt  

venv\Scripts\pip.exe install -r requirements.txt

2. Create database and fill database

python manage.py migrate --run-syncdb
python manage.py loaddata fixtures/initial_user
python manage.py loaddata fixtures/initial_profile
python manage.py loaddata fixtures/initial_friendship_request
python manage.py loaddata fixtures/initial_event
python manage.py loaddata fixtures/initial_Tag
python manage.py loaddata fixtures/initial_task
python manage.py loaddata fixtures/initial_forumentry

4. Run App

python manage.py runserver

### Angular

 1. Install all required packages using package.json

 npm install

 2. Run the development server

 ng serve

 3.  Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

4. Have fun with our Eventplanner
