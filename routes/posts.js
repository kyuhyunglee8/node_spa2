// const express = require("express");
// const postrouter = express.Router();
// const Post = require('../schemas/post');

// // 게시물 작성
// postrouter.post("/posts", async (req, res) => {
//   const { user, password, title, content } = req.body;
//   try {
//     await Post.create({
//       user: user,
//       password: password,
//       title: title,
//       content: content
//     });

//     res.status(200).json({ result: 'success', message: '게시글 생성 성공' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ result: 'fail', message: "server error" });
//   }
// })


// //게시물 전체 조회
// postrouter.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.find().select("title user createdAt").sort({"createdAt": -1});
//     res.status(200).json({ posts });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ result: 'fail', message: "server error" });
//   }
// })


// //게시물 단건 조회
// postrouter.get("/posts/:_id", async (req, res) => {
//   const { _id } = req.params;
//   try {
//     const post = await Post.find({_id}).select("user title content createdAt");
//     res.json({post});
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ result: "fail", message: "server error" });
//   };
// })


// //게시물 수정
// postrouter.put("/posts/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const { password, title, content } = req.body;

//   try {
//     const post = await Post.findById({_id});

//     if(post.password !== password){
//       return res.status(400).json({message : "비밀번호가 일치하지 않습니다."})
//     }
//     const update = await Post.updateOne({ _id: _id }, { $set: { title, content } });
//     res.json({ result: 'success', message: '게시글을 수정하였습니다.' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({reslut : "fail" , message : "server error"});
//   }
// })


// //게시물 삭제
// postrouter.delete("/posts/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const { password } = req.body;
//   try {
//     const post = await Post.findById({ _id });
//     if (post.password !== password) {
//       return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
//     }
//     await Post.deleteOne({_id});
//     res.json({ result: "게시글을 삭제하였습니다." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({result : "fail", message : "server error"});
//   }
// })


// module.exports = postrouter;