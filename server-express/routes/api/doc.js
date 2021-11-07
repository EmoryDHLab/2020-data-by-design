const router = require("express").Router();
const parseDocs = require('parse-google-docs-json');

const private_key = process.env.PRIVATE_KEY_64 ? Buffer.from(process.env.PRIVATE_KEY_64, "base64") : process.env.PRIVATE_KEY;


router.get("/:id", async (req, res, next) => {
  const documentId = req.params.id;
  try {
    const parsed = await parseDocs({
      documentId,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: private_key
    });
    console.dir(parsed);
    res.json(parsed.toJson());
  } catch (error) {
    next(error);
  }
});


module.exports = router;
