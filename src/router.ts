import express from "express";
import UserController from "./useCases/User/userController";
import LoginController from "./useCases/Login/loginController";
import ChatController from "./useCases/ChatHistory/chatController";

const userController = new UserController();
const loginController = new LoginController();
const chatController = new ChatController();

const router = express.Router();

router.post("/user", userController.newUser);
router.post("/login", loginController.newLogin);
router.post("/chatHistory", chatController.postHistory);
router.get("/chatHistory", chatController.getHistory);

export default router;
