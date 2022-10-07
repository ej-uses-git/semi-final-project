const makeConnection = require("./makeConnection");

// * GET REQUESTS
async function getUserFullname(userId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(`CALL get_user_full_name(${userId});`);
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result[0].full_name;
  } catch (error) {
    await end();
    return error;
  }
}

async function getUserInfo(userId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(`CALL get_user_info(${userId});`);
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result[0];
  } catch (error) {
    await end();
    return error;
  }
}

//? if returns false, not drastic error
async function getUserTodos(userId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(`CALL get_user_todos(${userId});`);
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result;
  } catch (error) {
    await end();
    return error;
  }
}

//? if returns false, not drastic error
async function getUserPosts(userId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(`CALL get_user_posts(${userId});`);
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result;
  } catch (error) {
    await end();
    return error;
  }
}

//? if returns false, not drastic error
async function getPostComments(postId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(`CALL get_post_comments(${postId});`);
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result;
  } catch (error) {
    await end();
    return error;
  }
}

// * POST REQUESTS
async function checkLoginInfo(username, password) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    [result] = await query(
      `CALL check_login_info('${username}', '${password}');`
    );
    if (result instanceof Error) throw result;
    await end();
    if (!result.length) return false;
    return result[0].user_id;
  } catch (error) {
    await end();
    return error;
  }
}

async function postNewComment(body, commenterId, postId) {
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
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    result = await query(
      `UPDATE todo 
      SET completed = ${completed} 
      WHERE todo_id = ${todoId};`
    );
    if (result instanceof Error) throw result;
    await end();
    return !!result.affectedRows;
  } catch (error) {
    await end();
    return error;
  }
}

async function deleteComment(commentId) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();
    if (result instanceof Error) throw result;
    result = await query(
      `DELETE FROM comment 
      WHERE comment_id = ${commentId};`
    );
    if (result instanceof Error) throw result;
    await end();
    return !!result.affectedRows;
  } catch (error) {
    await end();
    return error;
  }
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
