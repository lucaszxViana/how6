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

app.post('/comunicacoes', (req, res) => {
    const { titulo, descricao, email, id_unidade } = req.body;
    const sql = `
        INSERT INTO comunicacao (titulo, descricao, datahora, email, id_unidade, status)
        VALUES (?, ?, NOW(), ?, ?, 0)
    `;
    db.query(sql, [titulo, descricao, email, id_unidade], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensagem: 'Comunicação salva!', id: result.insertId });
    });
});

app.get('/comunicacoes/:id_unidade', (req, res) => {
    const { id_unidade } = req.params;
    const sql = `
        SELECT * FROM comunicacao
        WHERE id_unidade = ?
    `;
    db.query(sql, [id_unidade], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});