const router = require("express").Router();
const conf = require("../../docsconfig.json");
const parseDocs = require('parse-google-docs-json');

router.get("/:id", async (req, res, next) => {
  const documentId = req.params.id;
  try {
    const parsed = await parseDocs({
      documentId,
      clientEmail: conf.client_email,
      privateKey: conf.private_key
    });
    console.dir(parsed);
    res.json(parsed.toJson());
  } catch (error) {
    next(error);
  }

});

module.exports = router;
