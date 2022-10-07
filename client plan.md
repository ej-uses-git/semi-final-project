# Client

### Routes

* /login --> [[works]]
    form with `username` and `password` inputs
    onSubmit: sends `Check login info`
      --> userId ? 
            add to local storage (currentUser, userId)
            navigate to /users/:userId
      --> false ? mark as invalid (alert), stay on page

* /users/:userId --> [[works]]
    currentUserId <-- local storage
    currentUserId !== :userId ?
      navigate to /error/something went wrong
    nav-link: `todos`, `posts`, `info`
    button: `log out`
    OUTLET

* /users/:userId (index) --> [[works]]
    ? check app state for user's name
    ?--> exists ? save full name
    ?--> not ? 
      sends `GET user's name`
        --> full_name ? save full name ?(& to app state)
        --> error ? navigate to /error/something went wrong
    display saved full name

* /users/:userId/info --> [[works]]
    ? check app state for user's info
    ?--> exists ? save to state
    ?--> not ? 
      sends `GET user's info`
        --> info{} ? save to state
        --> error ? navigate to /error/something went wrong
    display state - info
     
* /users/:userId/todos --> [[works]]
    ? check app state for user's todos
    ?--> exists ? save to state
    ?--> not ?
      sends `GET user's todos`
        --> todos[] ? save to state
        --> error ? navigate to /error/something went wrong
    display state - todos :: TO-DO COMPONENT

* /users/:userId/posts --> [[works]]
    ? check app state for user's posts
    ?--> exists ? save to state
    ?--> not ?
      sends `GET user's posts`
        --> posts[] ? save to state
        --> error ? navigate to /error/something went wrong
    display state - posts :: POST COMPONENT

* /error/* --> [[works]]
    pathname text
    link to /login

### Components

<b>TO-DO COMPONENT</b>
checkbox (value: completed)
onChange -->
  sends `Mark todo as completed / not completed`
  --> true ? change checkbox value
  --> false ? navigate to /error/something went wrong
p: title

<b>POST COMPONENT</b>
h2: title
h3: full_name
p: body
button: show comments
onClick --> 
    check display ? 
    false -->
      check ?(app) state for comments
      --> exists ? set display to true
      --> not ? 
            sends `GET post's comments`
            --> comment[] ? save to ?(app) state
                set display to true
            --> error ? navigate to /error/something went wrong
    true --> set display to false 
`display &&` display comments :: COMMENT COMPONENT
`display &&` :: NEW COMMENT COMPONENT

<b>COMMENT COMPONENT</b>
h3: commenter_name
h4: commenter_email
p: body
`:userId === commenter_id &&` :: DELETE BUTTON COMPONENT

<b>NEW COMMENT COMPONENT</b>
form:
  textarea (value: body (state))
onSubmit --> 
  sends `Create new comment`
  --> true ? add new comment to ?(app) state
  --> false ? navigate to /error/something went wrong

<b>DELETE BUTTON COMPONENT</b>
button
onClick -->
  sends `Delete comment`
  --> true ? remove comment from ?(app) state
  --> false ? navigate to /error/something went wrong
