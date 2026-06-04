async function enviarForm(e) {
  e.preventDefault();
  const fd = new FormData(e.target);

  const body = {
    titulo: fd.get('titulo'),
    descricao: fd.get('mensagem'),
    email: fd.get('email'),
    unidade_conservacao_id: fd.get('parque'),
    datahora: fd.get('datahora'),
    status: 0
  };

  try {
    const resp = await fetch('http://localhost:3000/comunicacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (resp.ok) {
        alert('Enviado com sucesso!');
    } else {
      alert('Erro ao enviar. Tente novamente.');
    }
  } catch (err) {
    alert('Erro ao enviar. Tente novamente.');
  }
}

async function carregarParques() {
  const resp = await fetch('http://localhost:3000/unidades-conservacao');
  const parques = await resp.json();

  const select = document.querySelector('select[name="parque"]');
  parques.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nome;
    select.appendChild(opt);
  });
}
carregarParques();