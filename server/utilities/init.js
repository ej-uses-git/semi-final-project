const path = require("node:path/win32");
const makeConnection = require("./makeConnection");

async function insertUsers() {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    const array = require(path.join(__dirname, "./entities/user.json"));
    result = await query(
      `INSERT INTO user (first_name, last_name, email, phone)
      VALUES ${array
        .map(
          (row) =>
            `('${row.first_name}', '${row.last_name}', '${row.email}', '${row.phone}'),`
        )
        .join("")
        .slice(0, -1)}`
    );
    if (result instanceof Error) throw result;
    await end();
    console.log(result);
  } catch (error) {
    await end();
    console.log(error);
  }
}

async function insertLoginInfo() {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    const array = require(path.join(__dirname, "./entities/login_info.json"));
    result = await query(
      `INSERT INTO login_info (username, password, user_id)
      VALUES ${array
        .map((row) => `('${row.username}', '${row.password}', ${row.user_id}),`)
        .join("")
        .slice(0, -1)}`
    );
    if (result instanceof Error) throw result;
    await end();
    console.log(result);
  } catch (error) {
    await end();
    console.log(error);
  }
}

async function insertTodo() {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    const array = require(path.join(__dirname, "./entities/todo.json"));
    result = await query(
      `INSERT INTO todo (user_id, title, completed)
      VALUES ${array
        .map((row) => `(${row.user_id}, '${row.title}', ${row.completed}),`)
        .join("")
        .slice(0, -1)}`
    );
    if (result instanceof Error) throw result;
    await end();
    console.log(result);
  } catch (error) {
    await end();
    console.log(error);
  }
}

async function insertPosts() {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    const array = require(path.join(__dirname, "./entities/post.json"));
    result = await query(
      `INSERT INTO post (user_id, title, body)
      VALUES ${array
        .map((row) => `(${row.user_id}, '${row.title}', '${row.body}'),`)
        .join("")
        .slice(0, -1)}`
    );
    if (result instanceof Error) throw result;
    await end();
    console.log(result);
  } catch (error) {
    await end();
    console.log(error);
  }
}

async function insertComments() {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    const array = require(path.join(__dirname, "./entities/comment.json"));
    result = await query(
      `INSERT INTO comment (body, post_id, user_id)
      VALUES ${array
        .map((row) => `('${row.body}', ${row.post_id}, ${row.user_id}),`)
        .join("")
        .slice(0, -1)}`
    );
    if (result instanceof Error) throw result;
    await end();
    console.log(result);
  } catch (error) {
    await end();
    console.log(error);
  }
}

async function init() {
  await insertUsers();
  await insertLoginInfo();
  await insertTodo();
  await insertPosts();
  await insertComments();
}

init();
