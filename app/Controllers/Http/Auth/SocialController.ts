/*import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SocialController {
  public redirect({ ally }: HttpContextContract) {
    return ally.use("google").redirect();
  }

  public async callback({
    ally,
    auth,
    session,
    response,
  }: HttpContextContract) {
    const google = ally.use("google");

    if (google.accessDenied()) {
      session.flash({
        notification: { type: "error", message: "Access was denied" },
      });
      return response.redirect("/login");
    }

    if (google.stateMisMatch()) {
      session.flash({
        notification: { type: "error", message: "Request exparied" },
      });
      return response.redirect("/login");
    }
    if (google.hasError()) {
      session.flash({
        notification: { type: "error", message: google.getError() },
      });
      return response.redirect("/login");
    }

    const googleUser = await google.user();

    return googleUser;
  }
}
*/