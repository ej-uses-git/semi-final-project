const SERVER_URL = "http://localhost:8080";

async function getReq(pathname) {
  const res = await fetch(`${SERVER_URL}${pathname}`, { method: "GET" });
  if (!res.ok) return new Error(res.statusText);
  let data;
  if (res.headers.get("Content-type").includes("application/json"))
    data = await res.json();
  else data = await res.text();
  return data;
}

async function postReq(pathname, body) {
  const raw = JSON.stringify(body);
  const res = await fetch(`${SERVER_URL}${pathname}`, {
    method: "POST",
    body: raw,
    headers: new Headers({ "Content-type": "application/json" }),
  });
  if (!res.ok) return new Error(res.statusText);
  let data;
  if (res.headers.get("Content-type").includes("application/json"))
    data = await res.json();
  else data = await res.text();
  return data;
}

async function putReq(pathname, body) {
  const raw = JSON.stringify(body);
  const res = await fetch(`${SERVER_URL}${pathname}`, {
    method: "PUT",
    body: raw,
    headers: new Headers({ "Content-type": "application/json" }),
  });
  if (!res.ok) return new Error(res.statusText);
  const data = await res.text();
  return data;
}

async function deleteReq(pathname) {
  const res = await fetch(`${SERVER_URL}${pathname}`, {
    method: "DELETE",
  });
  if (!res.ok) return new Error(res.statusText);
  const data = await res.text();
  return data;
}

export { deleteReq, getReq, postReq, putReq };
