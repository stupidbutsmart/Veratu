const express = require("express");
const app = express();
const PORT = 3000 || 3001;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
