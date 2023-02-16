import { createClient, ClickHouseClient } from "@clickhouse/client";
import internal, { Stream } from "stream";

let client: ClickHouseClient;
let stream: internal.Readable;

const connect = async () => {
  const url = new URL(process.env.CH_CONN!);

  client = createClient({
    host: url.origin,
    username: url.username,
    password: url.password,
    max_open_connections: 1,
  });

  stream = new Stream.Readable({
    objectMode: true,
    read: () => {},
  });

  const table = "test_ch_conn";

  await client.exec({
    query: `
      CREATE TABLE ${table}
      (id UInt64, name String, val Float64)
      ENGINE MergeTree()
      ORDER BY (id)
    `,
  });

  client.insert({
    table: `metrics.${table}`,
    values: stream,
    format: "JSONEachRow",
  });
};

type Row = { id: number; name: string; val: number };

const push = (data: Array<Row>) => {
  stream.push(data);
};

let id = 0;
const rows = (n: number) => {
  return Array.from({ length: n }).map((_) => {
    return { id: id++, name: `row ${id}`, val: id / 3.1 };
  });
};

const run = () => {
  console.log(`Running... ${process.env.CH_CONN}`);

  connect();

  const n = 1000;
  const w = 100 * n;
  while (true) {
    if (id % w === 0) {
      console.log(`id ${id}, mem: ${process.memoryUsage().heapUsed}`);
    }
    push(rows(n));
  }
};

run();
