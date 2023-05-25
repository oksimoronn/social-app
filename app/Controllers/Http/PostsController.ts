import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class PostsController {
  public async view({ view }) {
    const articles = await Database.from("users").select("*");

    return view.render("article/view", { articles });
  }

  public async show({ view }: HttpContextContract) {
    return view.render("posts/posts");
  }
}
