const express = require('express');
const path = require('path');

const app = express();

// Serve arquivos estáticos do diretório atual
app.use(express.static(path.join(__dirname))); // Isso serve arquivos do diretório raiz

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // ou o nome do seu arquivo HTML principal
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
