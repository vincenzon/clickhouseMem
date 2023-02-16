### Demonstration for Issue 135

[Github issue](https://github.com/ClickHouse/clickhouse-js/issues/135)

- Clone the repo
- npm install
- run: `CH_CONN=https://<username>:<password>@<clickhouse-server>:<port> NODE_OPTIONS=--max-old-space-size=128 npm run dev`

```
Running... https://username:password@clickhouse.server.com:8443
id 0, mem: 77900552
id 100000, mem: 89639608
id 200000, mem: 96477496
id 300000, mem: 110214248
id 400000, mem: 123906208
id 500000, mem: 126996568

<--- Last few GCs --->
lo[3521212:0x4b2e030]     1237 ms: Mark-sweep (reduce) 128.0 (130.6) -> 127.4 (131.1) MB, 40.3 / 0.0 ms  (+ 29.4 ms in 17 steps since start of marking, biggest step 3.0 ms, walltime since start of marking 72 ms) (average mu = 0.328, current mu = 0.132) allo[3521212:0x4b2e030]     1340 ms: Mark-sweep (reduce) 128.6 (131.1) -> 128.0 (131.6) MB, 94.8 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 95 ms) (average mu = 0.201, current mu = 0.079) alloca

<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb02ec0 node::Abort() [node]
 2: 0xa181fb node::FatalError(char const*, char const*) [node]
 3: 0xced88e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xcedc07 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xea5ea5  [node]
 6: 0xeb557d v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
 7: 0xeb827e v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [node]
 8: 0xe796aa v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationType, v8::internal::AllocationOrigin) [node]
 9: 0x11f2e86 v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [node]
10: 0x15e7879  [node]
[nodemon] app crashed - waiting for file changes before starting...
```
