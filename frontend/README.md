# Ultimate Event
This is an Angular/Django Eventplanner Application by students of the FH JOANNEUM. 

# Requirements

* Python 3.8
* IntelliJ or Pycharm as IDE
* Django Server

# Project

The goal of this project is to plan events within an
intuitive and clean environment. 
Events can either be public or private.
If it is a public event, other users are free to join. 
Furthermore tasks can assigned to other participants. 
Taks are shown in three different columns: “To Do”, “In Progress”
and “Done” – similar to a KANBAN-board.
All events will be recorded in a calendar. 
Additionally, user can upload a profile picutre in the settings tab, which is also  
visible for users their friends with.

## Django

### Install

Install the following Python packages using pip and requirements.txt  

`venv\Scripts\pip.exe install -r requirements.txt`

### Setup

Create and fill database

run: `cmd < fixtures/LoadData.txt`

All User share the same Password: `Pa55w.rd`

Usernames: 
- admin
- JD
- Jane
- Luke
- Sue
- Tom

### Run the Application

`python manage.py runserver`

## Angular

 ### Install all required packages using package.json

`npm install`

 ### Run the development server

 `ng serve`

 ### Start the Application
 
 Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
