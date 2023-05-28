/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.get("register", "AuthController.registerShow").as("auth.register.show");
Route.post("register", "AuthController.register").as("auth.register");

Route.get("login", "AuthController.loginShow").as("auth.login.show");
Route.post("login", "AuthController.login").as("auth.login");

Route.get("posts", "AuthController.postShow").as("auth.post.show");
Route.post("posts", "AuthController.create").as("auth.create");
Route.delete("posts/:id", "AuthController.destroy").as("auth.destroy");

Route.get("logout", "AuthController.logout").as("auth.logout");

/*
Route.get("login/google", "SocialAuthController.redirect");
Route.get("login/google/callback", "SocialAuthController.callback");
Route.get("google/redirect", async ({ ally }) => {
  const google = ally.use("google");
  if (google.accessDenied()) {
    return "Access was denied";
  }

  if (google.stateMisMatch()) {
    return "Request expired. Retry";
  }

  if (google.hasError()) {
    return google.getError();
  }
  const user = await google.user();
});*/
