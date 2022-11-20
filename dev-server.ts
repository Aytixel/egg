import { contentType } from "https://deno.land/std@0.165.0/media_types/mod.ts";

const server = Deno.listen({ port: 8080 });

console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    try {
      const url = new URL(requestEvent.request.url).pathname;

      requestEvent.respondWith(
        new Response(
          await Deno.readFile("." + url),
          {
            status: 200,
            headers: {
              "content-type": contentType(url.split(".").pop() || "") || "",
            },
          },
        ),
      );
    } catch {
      requestEvent.respondWith(new Response(null, { status: 404 }));
    }
  }
}
