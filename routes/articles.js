const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// // Create an article
// router.get("/create", async (req, res) => {
//     res.redirect('create');
// });

router.post("/create", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      slug: req.body.slug,
    };
    console.log(data, "data");
    await Article.create(data);
    res.redirect("/views/articles/");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all articles
router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.render("index", { articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/create", async (req, res) => {
  res.render("create");
});
// Edit an article
router.get("/edit/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render("edit", { article });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an article
router.post("/articles12/:id", async (req, res) => {
  console.log("ff");
  try {
    console.log("ddddd");
    const data = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };
    const article = await Article.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    console.log(article, "art");
    res.redirect("/views/articles");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an article
router.get("/delete/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/views/articles");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search articles
router.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const articles = await Article.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.render("index", { articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/searchD", async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  console.log("articles");
  try {
    let query = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });
    console.log(articles, "articles");
    res.render("index", { articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
