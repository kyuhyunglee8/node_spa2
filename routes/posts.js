const express = require('express');
const router = express.Router();
const { Post, User, PostLike } = require('../models')
const authMiddleware = require("../middlewares/auth-middleware");

// 게시물 작성
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const user = res.locals.user;

  console.log(user)
  try {
    await Post.create({
      title: title,
      content: content,
      userId: user.userId
    });

    res.status(200).json({ result: 'success', message: '게시글 생성 성공' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: 'fail', message: "server error" });
  }
})

// 게시물 좋아요 조회
router.get("/like", authMiddleware, async (req, res) => {
  const  user  = res.locals.user

  try {
    const posts = await PostLike.findAll({
      include: [{
        model: Post,
      }],
      where: { userId: user.userId },
      order: [[{model: Post}, 'postLikeCount', 'DESC']]
    })

    const data = []
    posts.map((x) => data.push(x.Post))

    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: "fail", message: "server error" })
  }
})

//게시물 전체 조회
router.get("/", async (req, res) => {

  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['nickname']
      }],
      order: [['postId', 'DESC']]
    })

    const data = []
    posts.map((x) => data.push(x))

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: 'fail', message: "server error" });
  }
})

//게시물 단건 조회
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const posts = await Post.findOne({
      include: [{
        model: User,
        attributes: ['nickname']
      }],
      where: {
        postId: postId
      }
    })

    if (posts === null) {
      return res.status(400).json({ result: "fail", message: "게시글이 없습니다." })
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: "fail", message: "server error" });
  };
})

//게시물 수정
router.put("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const posts = await Post.findOne({
    include: [{
      model: User,
      attributes: ['nickname']
    }],
    where: {
      postId: postId
    }
  })
  try {
    if (posts === null) {
      return res.status(400).json({ result: "fail", message: "게시글이 없습니다." });
    }

    const update = await Post.update({ title, content }, { where: { postId } });

    res.json({ result: 'success', message: '게시글을 수정하였습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ reslut: "fail", message: "server error" });
  }
})

//게시물 삭제
router.delete("/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;

  const posts = await Post.findOne({
    include: [{
      model: User,
      attributes: ['nickname']
    }],
    where: {
      postId: postId
    }
  })

  try {
    if (posts === null) {
      return res.status(400).json({ result: "fail", message: "게시글이 없습니다." });
    }
    await Post.destroy({ where: { postId } });

    res.json({ result: "게시글을 삭제하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "fail", message: "server error" });
  }
})

// 게시물 좋아요,좋아요 취소
router.post("/:postId/like", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  const post = await Post.findOne({ where: { postId } });

  if (post === null) {
    return res.status(400).json({ result: "fail", message: "게시글이 없습니다." });
  }

  try {
    const like = await PostLike.findOne({ where: { postId, userId } })

    if (!like) {
      await PostLike.create({ userId, postId });
      const postLike = await Post.findOne({ where: { postId } });
      const count = postLike.postLikeCount
      await Post.update({ postLikeCount: count + 1 }, { where: { postId } });
      return res.send("yes")
    } else {
      await PostLike.destroy({ where: { userId, postId } });
      const postLike = await Post.findOne({ where: { postId } });
      const count = postLike.postLikeCount
      await Post.update({ postLikeCount: count - 1 }, { where: { postId } });
      return res.send("no")
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: 'fail', message: "server error" })
  }
})



module.exports = router;