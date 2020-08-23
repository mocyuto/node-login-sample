const router = require("express").Router();
const passport = require("passport");

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) { // ログインしてるかチェック
    console.log('login succeed');
    next();
  } else {
    console.log('login failed');
    res.redirect(302, '/login');
  }
};

router.get("/login", (req, res) => {

  res.render("./login.ejs");
});

router.post("/login", passport.authenticate(
  "mylogin",
  {
    successRedirect: "/ok",
    failureRedirect: "/login",
    session: false // セッションにログイン情報を保存しない。trueとすると、passport.serializeUserやpassport.deserializeUserというメソッドを実装する事でセッションに保存したログイン情報が正しいか判別出来る。
  }
));

router.get("/ok", (req, res) => {
  res.render("./ok.ejs");
});

module.exports = router;
