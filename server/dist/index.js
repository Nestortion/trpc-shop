"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);

// src/procedures/todos.procedures.ts
var import_zod = require("zod");

// src/trpc.ts
var import_server = require("@trpc/server");
var t = import_server.initTRPC.create();
var router = t.router;
var publicProcedure = t.procedure;

// src/procedures/todos.procedures.ts
var getTodos = publicProcedure.query(() => {
  return {
    todos: ["todo 1", "todo 2", "todo 3"]
  };
});
var createTodo = publicProcedure.input(
  import_zod.z.object({
    title: import_zod.z.string(),
    userId: import_zod.z.string(),
    description: import_zod.z.string()
  })
).mutation(({ input, ctx }) => {
  return {
    todos: []
  };
});

// src/procedures/index.ts
var procedures = {
  todos: {
    getTodos,
    createTodo
  }
};

// src/index.ts
var import_express = require("@trpc/server/adapters/express");
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));
var appRouter = router(procedures);
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use("/trpc", (0, import_express.createExpressMiddleware)({ router: appRouter }));
app.listen(3e3, () => {
  console.log("server is running on port 3000");
});
