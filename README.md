# Ultimate Event
This is an Angular/Django Eventplanner Application by students of the FH JOANNEUM. 

# Requirements

* Python 2.2.7
* IntelliJ or Pycharm as IDE
* Django Server

# Project

The goal of this project is to plan events or even projects within an
intuitive and clean environment. Setting up an event, the event
owner can invite his friends. Events can eigther be public or private.
If it is a public event, other users are free to join. 
Furthermore tasks can assigned  to other participants, which is usually done by the
event owner. However guests  can crate tasks for themselves. If a
guest creates a task, they are automatically assigned to this task
after the event owner verifies them. The user interface of this web
application shows three different columns: “To Do”, “In Progress”
and “Done” – similar to a KANBAN-board. Tasks are arranged in
these columns, depending on their progress. Every participant can move
his own tasks from "Open" to “To Do” to “In Progress”. The Eventowner
can move the tasks of all members. 
Whenever an event owner creates a new event, the event will be recorded in their calendar. 
All participants will also see their events when checking their calender. 
Additionally, user can upload a profile picutre in the settings tab, which is also  
visivlbe for users their freinds with.

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
