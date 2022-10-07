const makeConnection = require("./makeConnection");

async function callProcedure(procedure, isReturning, ...variables) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    result = await query(
      `CALL ${procedure}(${variables
        .map((variable) =>
          typeof variable === "string" ? `'${variable}'` : variable
        )
        .join(", ")})`
    );
    if (isReturning) result = result[0];
    if (result instanceof Error) throw result;
    await end();
    return result;
  } catch (error) {
    await end();
    return error;
  }
}

// * GET REQUESTS
async function getUserFullname(userId) {
  let result = await callProcedure("get_user_full_name", true, userId);
  return result instanceof Error
    ? result
    : result.length
    ? result[0].full_name
    : false;
}

async function getUserInfo(userId) {
  let result = await callProcedure("get_user_info", true, userId);
  return result instanceof Error ? result : result.length ? result[0] : false;
}

//? if returns false, not drastic error
async function getUserTodos(userId) {
  let result = await callProcedure("get_user_todos", true, userId);
  return result instanceof Error || result.length ? result : false;
}

//? if returns false, not drastic error
async function getUserPosts(userId) {
  let result = await callProcedure("get_user_posts", true, userId);
  return result instanceof Error || result.length ? result : false;
}

//? if returns false, not drastic error
async function getPostComments(postId) {
  let result = await callProcedure("get_post_comments", true, postId);
  return result instanceof Error || result.length ? result : false;
}

// * POST REQUESTS
async function checkLoginInfo(username, password) {
  let result = await callProcedure(
    "check_login_info",
    true,
    username,
    password
  );
  return result instanceof Error
    ? result
    : result.length
    ? result[0].user_id
    : false;
}

async function postNewComment(body, commenterId, postId) {
  // since we need to get a LAST_INSERT_ID, we can't sever the connection
  let { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    result = await query(
      `CALL post_new_comment('${body}', ${commenterId}, ${postId});`
    );
    if (result instanceof Error) throw result;
    [result] = await query("CALL get_last_comment();");
    if (result instanceof Error) throw result;
    await end();
    return result[0];
  } catch (error) {
    await end();
    return error;
  }
}

// * PUT REQUESTS
async function markTodoCompletion(todoId, completed) {
  let result = await callProcedure(
    "mark_todo_completion",
    false,
    todoId,
    completed
  );
  return result ? (result instanceof Error ? result : true) : false;
}

async function deleteComment(commentId) {
  let result = await callProcedure("delete_comment", false, commentId);
  return result ? (result instanceof Error ? result : true) : false;
}

module.exports = {
  checkLoginInfo,
  deleteComment,
  getPostComments,
  getUserFullname,
  getUserInfo,
  getUserPosts,
  getUserTodos,
  markTodoCompletion,
  postNewComment,
};
