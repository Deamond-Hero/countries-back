const { Router } = require("express");
const { createActivities } = require("./handlers");

const postRouter = Router();

postRouter.post("/activities", createActivities);

module.exports = {
  postRouter,
};
