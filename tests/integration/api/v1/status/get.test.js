test("GET to /api/v1/status should return 200", async () => { 
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUpdatedAt)

  expect(responseBody.server_version).toBeDefined();
  expect(responseBody.max_connections).toBe(100);
  expect(responseBody.opened_connections).toBe(1);
})
