import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Catch server version
  const version = await database.query('SHOW server_version;');
  const formatedVersion = version.rows[0].server_version

  // catch MAX connection
  const maxConnections = await  database.query('SHOW max_connections;');
  const formatMaxConnections = maxConnections.rows[0].max_connections;

  // catch connection actives, evitando SQL Injection
  const databaseName = process.env.POSTGRES_DB;
  const actives = await  database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;", // Placeholder utilizando a lib PG
    values: [databaseName]
  }); 

  const activeFormat = actives.rows[0].count

  response.status(200).json({
    update_at: updatedAt,
    server_version: formatedVersion,
    max_connections: parseInt(formatMaxConnections),
    opened_connections: activeFormat,
    ambiente: "Homologação"
  }) 
}

export default status; 