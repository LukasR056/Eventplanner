# Ultimate Event
This is an Angular/Django Eventplanner Application by students of the FH JOANNEUM. 

# Requirements

* Python 3.8
* IntelliJ or Pycharm as IDE
* Django Server

# Project

The goal of this project is to plan events or even projects within an
intuitive and clean environment. 
Events can either be public or private.
If it is a public event, other users are free to join. 
Furthermore tasks can assigned to other participants. 
Taks are shown in three different columns: “To Do”, “In Progress”
and “Done” – similar to a KANBAN-board.
All events will be recorded in a calendar. 
Additionally, user can upload a profile picutre in the settings tab, which is also  
visible for users their friends with.

### Install

1. Install the following Python packages using pip and requirements.txt  

venv\Scripts\pip.exe install -r requirements.txt

2. Create and fill database

run: cmd < fixtures/LoadData.txt

4. Run App

python manage.py runserver

### Angular

 1. Install all required packages using package.json

 npm install

 2. Run the development server

 ng serve

 3.  Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

4. Have fun with our Eventplanner
