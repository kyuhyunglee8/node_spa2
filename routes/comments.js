// const express = require("express");
// const commentrouter = express.Router();
// const Comment = require('../schemas/comment');
// const Post = require('../schemas/post');

// //댓글 작성
// commentrouter.post("/comments/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const { user, password, content } = req.body;

//   if (content === "") {
//     return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
//   }
//   try {
//     const post = await Post.findById(_id);
//     console.log(post)
//     if (post.title === "") {
//       return res.status(400).json({ message: "게시물이 없습니다." });
//     }
//     await Comment.create({
//       user: user,
//       password: password,
//       content: content,
//       postId: _id
//     });
//     return res.status(200).json({ result: 'success', message: '댓글 생성 성공' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ result: "fail", message: "server error" });
//   }
// })

// //댓글 조회
// commentrouter.get("/comments", async (req, res) => {
//   try {
//     const comments = await Comment.find().sort({"createdAt": -1})
//     res.json({result : comments});
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ result: "fail", message: "server error" })
//   }
// })

// //댓글 수정
// commentrouter.put("/comments/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const { password, content } = req.body;

//   try {
//     const comment = await Comment.findById({_id});

//     if(comment.password !== password){
//       return res.status(400).json({message : "비밀번호가 일치하지 않습니다."})
//     }
//     const update = await Comment.updateOne({ _id: _id }, { $set: { content } });
//     res.json({ result: 'success', message: '댓글을 수정하였습니다.' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({reslut : "fail" , message : "server error"});
//   }
// })

// //댓글 삭제
// commentrouter.delete("/comments/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const { password } = req.body;
//   try {
//     const comment = await Comment.findById({ _id });
//     if (comment.password !== password) {
//       return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
//     }
//     await Comment.deleteOne({_id});
//     res.json({ result: "댓글을 삭제하였습니다." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({result : "fail", message : "server error"});
//   }
// })


// module.exports = commentrouter;