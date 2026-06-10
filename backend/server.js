const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/unidades-conservacao', (req, res) => {

    const sql = `
        SELECT
            uc.id_unidade AS id,
            uc.nome,
            uc.descricao,
            uc.data_criacao,
            uc.imagem,
            i.nome_instituicao AS instituicao
        FROM unidade_conservacao uc
        LEFT JOIN instituicao i
            ON uc.id_instituicao = i.id_instituicao
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});