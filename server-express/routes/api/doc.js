const router = require("express").Router();
const parseDocs = require('parse-google-docs-json');

try {
  const conf = require("../../docsconfig.json");
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
} catch (e) {
  if (e.code == 'MODULE_NOT_FOUND') {
    console.error("The docsconfig.json file is missing. In order for the /doc API endpoint to work, you'll need to provide this API credentials file and put it in the server root (not the project root!), see here: https://flaviocopes.com/google-api-authentication/")
  }
}


module.exports = router;
