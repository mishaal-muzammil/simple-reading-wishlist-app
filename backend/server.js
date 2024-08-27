const express = require('express');

const app = express();

app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Listening on http://localhost:${PORT}`));


