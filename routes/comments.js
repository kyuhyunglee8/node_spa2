const express = require("express");
const router = express.Router();
const { Comment, Post } = require('../models')
const authMiddleware = require("../middlewares/auth-middleware");

//댓글 작성
router.post("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { userId } = res.locals.user;

  if (content === "") {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }
  try {
    const post = await Post.findOne({ where: { postId } });
    console.log(post)
    if (!post) {
      return res.status(400).json({ message: "게시물이 없습니다." });
    }
    await Comment.create({ content, postId, userId });
    return res.status(200).json({ result: 'success', message: '댓글 생성 성공' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: "fail", message: "server error" });
  }
})

//댓글 조회
router.get("/", async (req, res) => {
  try {
    const comment = await Comment.findAll({
      include: [{
        model: Post
      }],
      order: [["userId", "DESC"]]
    })
    res.json({ comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: "fail", message: "server error" })
  }
})

//댓글 수정
router.put("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const { userId } = res.locals.user;

  const comment = await Comment.findOne({ where: { commentId } });
  console.log(comment)
  if (comment === null || !comment) {
    return res.status(400).json({ message: "수정 가능한 댓글이 없습니다." })
  }
  if (comment.userId !== userId) {
    return res.status(401).json({ message: "작성자가 쓴 게시글이 아닙니다." })
  }

  try {
    const update = await Comment.update({ content }, { where: { commentId } });
    res.json({ result: 'success', message: '댓글을 수정하였습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ reslut: "fail", message: "server error" });
  }
})

//댓글 삭제
router.delete("/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { userId } = res.locals.user;

  const comment = await Comment.findOne({ where: { commentId } });

  if (!comment) {
    return res.status(404).json({result : "fail", message : "댓글이 존재하지 않습니다."})
  }
  if (comment.userId !== userId) {
    return res.status(401).json({result : "fail", message : "작성자가 쓴 댓글이 아닙니다."})
  }
  try {
    await Comment.destroy({ where: { commentId } });
    res.json({ result: "댓글을 삭제하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "fail", message: "server error" });
  }
})


module.exports = router;