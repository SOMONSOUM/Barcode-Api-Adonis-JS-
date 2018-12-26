"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.get("products", "ProductController.index");
  Route.get("products/:id", "ProductController.show");
  Route.post("products", "ProductController.create");
  Route.put("products/:id", "ProductController.update");
  Route.delete("products/:id", "ProductController.delete");
}).prefix("api/v1");
