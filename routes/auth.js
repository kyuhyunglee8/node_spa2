const express = require('express');
const router = express.Router();
const { User } = require('../models')
const jwt = require("jsonwebtoken");

//회원가입
router.post("/signUp", async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;

  //닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성
  const nicknameReg = /^[a-zA-z0-9]{3,12}$/;
  if (!nicknameReg.test(nickname)) {
    return res.status(412).json({ "errorMessage": "닉네임 형식이 일치하지 않습니다." });
  }
  //비밀번호는 최소 4자 이상 
  if (password.length < 4) {
    return res.status(412).json({ "errorMessage": "최소 4글자 이상 입력해 주세요." });
  }
  //닉네임과 같은 값이 포함된 경우 회원가입에 실패로 만들기
  if (password.includes(nickname)) {
    return res.status(412).json({ "errorMessage": "패스워드에 닉네임이 포함되어 있습니다." });
  }
  //비밀번호 확인은 비밀번호와 정확하게 일치하기
  if (password !== confirmPassword) {
    return res.status(412).json({ "errorMessage": "패스워드가 일치하지 않습니다." });
  }
  // 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우
  const exUser = await User.findOne({ where: { email } });

  if (exUser !== null && exUser.nickname === nickname) {
    return res.status(412).json({ "errorMessage": "중복된 닉네임입니다." })
  }
  try {
    await User.create({ email, nickname, password });

    return res.status(200).json({ result: 'success', message: '회원가입 성공' })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: 'fail', message: "server error" })
  }
})

//로그인
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const user = await User.findOne({ where: { nickname } });

    if (!user || password !== user.password) {
      return res.status(412).json({ errorMessage: "닉네임 또는 패스워드가 틀렸습니다." });
    }

    const token = jwt.sign({ userId: user.userId }, "sparta-secret-key");
    res.cookie('token', token);

    return res.status(200).json({ result: "success", "token": token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: "로그인에 실패하였습니다." });
  }
})

module.exports = router;