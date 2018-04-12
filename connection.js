var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "abarve",
    password      : "Fichdi456",
    connectString : "oracle.cise.ufl.edu/orcl"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT country, name, percentage
       FROM language
       WHERE percentage = :id`,
      [13],  // bind value for :id
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      });
  });

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}