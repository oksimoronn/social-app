import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Post from "App/Models/Post";
import User from "App/Models/User";

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render("auth/register");
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({
          table: "users",
          column: "username",
          caseInsensitive: true,
        }),
      ]),

      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({
          table: "users",
          column: "email",
          caseInsensitive: true,
        }),
      ]),

      password: schema.string({}, [rules.minLength(8)]),
    });

    const data = await request.validate({ schema: userSchema });

    const user = await User.create(data);

    await auth.login(user);

    return response.redirect("/posts");
  }

  public async login({
    request,
    response,
    auth,
    session,
  }: HttpContextContract) {
    const { uid, password } = request.only(["uid", "password"]);

    try {
      await auth.attempt(uid, password);
    } catch (error) {
      session.flash("form", "Your email, username or password is incorrect");
      return response.redirect().back();
    }
    return response.redirect("/posts");
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout();
    return response.redirect().toRoute("auth.login.show");
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public async postShow({ view }: HttpContextContract) {
    const articles = await Database.from("posts").select("*");
    return view.render("post.posts", { articles });
  }

  public async create({ request, response }: HttpContextContract) {
    const post = new Post();

    //post.email = request.input("email");
    //post.body = request.input("msg");

    post.fill({
      email: request.input("email"),
      body: request.input("msg"),
      userId: 1,
      slug: "neki slug",
    });
    await post.save();
    return response.redirect().back();
  }
}
