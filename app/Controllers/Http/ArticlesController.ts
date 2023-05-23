// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class ArticlesController {
  public async view({ view }) {
    const articles = await Database.from("users").select("*");

    return view.render("article/view", { articles });
  }

  public async create({ view }) {
    return view.render("article/create");
  }
  public async login({ view }) {
    return view.render("article/login");
  }

  public async store({ response, request }) {
    const createArticleSchema = schema.create({
      username: schema.string(),
      email: schema.string(),
      password: schema.string(),
    });
    try {
      const payload = await request.validate({ schema: createArticleSchema });
      await Database.table("users").insert({
        ...payload,
      });
      return response.redirect().toRoute("article/login");
    } catch (error) {
      response.badRequest(error.message);
    }
  }
}
