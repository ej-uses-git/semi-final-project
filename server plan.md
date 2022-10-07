# Server

### GET:

GET user's name --> [[works]], [[running]]
* ```/api/users/:userId```
  --> ```SELECT CONCAT(first_name, ' ', last_name)
        AS full_name
      FROM user
      WHERE user_id = ${:userId};```
  ```full_name``` <--


GET user's info --> [[works]], [[running]]
* ```/api/users/:userId/info```
  --> ```SELECT CONCAT(first_name, ' ', last_name)
        AS full_name,
        email,
        phone
      FROM user
      WHERE user_id = ${:userId};```
  ```{first_name + last_name, email, phone}``` <--


GET user's todos --> [[works]], [[running]]
* ```/api/users/:userId/todos```
  --> ```SELECT title, completed
      FROM todos
      WHERE user_id = ${:userId};```
  ```[{title, completed, todo_id}] ```<--


GET user's posts --> [[works]], [[running]]
* ```/api/users/:userId/posts```
  --> ```SELECT 
        p.title AS title, 
        p.body AS body,
        u.user_id AS user_id,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name
      FROM post AS p
      JOIN user AS u
      USING (user_id)
      WHERE p.user_id = ${:userId};```
  ```[{title, body, post_id, user_id, full_name}]``` <--


GET post's comments --> [[works]], [[running]]
* ```/api/posts/:postId/comments```
  --> ```SELECT 
            c.body AS body,
            c.user_id AS commenter_id,
            CONCAT(u.first_name, ' ', u.last_name)
              AS commenter_name,
            u.email AS commenter_email
      FROM comment AS c
      JOIN user AS u
        USING (user_id)
      WHERE c.post_id = ${:postId};```
  ```[{ body, comment_id, user_id, commenter_name (, commenter_email)}]``` <--

### POST:

Check login info --> [[works]], [[running]]
* ```/api/login```
  ```{ username, password }```
  --> ```SELECT u.userId
      FROM user AS u
      JOIN login_info AS li
      USING (user_id)
      WHERE BINARY li.username = ${username}
        AND BINARY li.password = ${password};```
  ```userId | false``` <--


Create new comment --> [[works]], [[running]]
* ```/api/posts/:postId/comments```
  ```{ body, commenterId }```
  --> ```INSERT INTO comment (body, user_id, post_id)
      VALUES (${body}, ${commenterId}, ${:postId});```
  ```true | error``` <--


### PUT:

Mark todo as completed / not completed --> [[works]], [[running]]
* ```/api/todos/:todoId```
  ```{ completed: true | false }```
  --> ```UPDATE todo
      SET completed = ${completed}
      WHERE todoId = ${:todoId};```
  ```true | false```
  <!-- user must be verified by client -->

### DELETE:

Delete comment --> [[works]], [[running]]
* ```/api/comments/:commentId```
  --> ```DELETE FROM comment
      WHERE comment_id = ${:commentId};```
  ```true | false``` <--
  <!-- user must be verified by client -->
