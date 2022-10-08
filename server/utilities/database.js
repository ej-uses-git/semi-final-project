const makeConnection = require("./makeConnection");

async function callProcedure(procedure, isReturning, ...variables) {
  const { connect, query, end } = makeConnection();
  let result;
  try {
    result = await connect();

    // we call for the given procedure with the given variables
    // wrapping any strings with quotes so that they are properly recognized
    result = await query(
      `CALL ${procedure}(${variables
        .map((variable) =>
          typeof variable === "string" ? `'${variable}'` : variable
        )
        .join(", ")})`
    );

    // if a procedure returns (SELECTs) something, the data returns in an array
    //-> [RowPacketData {}, OkPacket {}] | [[RowPacketData {}, ...], OkPacket {}]
    if (isReturning) result = result[0];

    await end();

    // otherwise, it returns directly
    //-> OkPacket {}
    return result;
  } catch (error) {
    // errors are automatically thrown
    if (error.fatal) return error; // only end if connection can be ended
    await end();

    return error;
  }
}

async function postNewComment(body, commenterId, postId) {
  // since we need to get a LAST_INSERT_ID, we can't sever the connection
  // (i.e. calling callProcedure twice)
  let { connect, query, end } = makeConnection();

  let result;
  try {
    result = await connect();

    result = await query(
      `CALL post_new_comment('${body}', ${commenterId}, ${postId});`
    );

    [result] = await query("CALL get_last_comment();");

    await end();

    return result[0];
  } catch (error) {
    // errors are automatically thrown
    await end();
    return error;
  }
}

module.exports = {
  callProcedure,
  postNewComment,
};
