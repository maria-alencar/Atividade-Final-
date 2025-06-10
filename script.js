$(document).ready(function () {
  function salvarTarefas() {
    let tarefas = [];
    $('#lista-tarefas li').each(function () {
      tarefas.push({
        texto: $(this).clone().children().remove().end().text().trim(),
        concluida: $(this).hasClass('concluida')
      });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefas) {
      tarefas.forEach(function (tarefa) {
        let item = $('<li></li>').text(tarefa.texto);
        let check = $('<span class="check">&#10003;</span>');
        let lixo = $('<span class="lixo">&#128465;</span>');
        if (tarefa.concluida) {
          item.addClass('concluida');
        }
        item.append(check).append(lixo);
        $('#lista-tarefas').append(item);
      });
    }
  }

  function adicionarTarefa() {
    let tarefa = $('#nova-tarefa').val().trim();
    if (tarefa !== '') {
      let item = $('<li></li>').text(tarefa);
      let check = $('<span class="check">&#10003;</span>');
      let lixo = $('<span class="lixo">&#128465;</span>');
      item.append(check).append(lixo);
      $('#lista-tarefas').append(item);
      $('#nova-tarefa').val('');
      salvarTarefas();
    }
  }

  $('#adicionar-tarefa').click(function () {
    adicionarTarefa();
  });

  $('#lista-tarefas').on('click', '.check', function () {
    $(this).parent().toggleClass('concluida');
    salvarTarefas();
  });

  $('#lista-tarefas').on('click', '.lixo', function () {
    $(this).parent().remove();
    salvarTarefas();
  });

  carregarTarefas();

  function salvarAnotacoes() {
    let anotacoes = [];
    $('#lista-anotacoes .nota').each(function () {
      anotacoes.push($(this).clone().children().remove().end().text().trim());
    });
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
  }

  function carregarAnotacoes() {
    let anotacoes = JSON.parse(localStorage.getItem('anotacoes'));
    if (anotacoes) {
      anotacoes.forEach(function (nota) {
        let item = $('<div class="nota"></div>').text(nota);
        let lixo = $('<span class="lixo">&#128465;</span>');
        item.append(lixo);
        $('#lista-anotacoes').append(item);
      });
    }
  }

  $('#adicionar-anotacao').click(function () {
    let nota = $('#nova-anotacao').val().trim();
    if (nota !== '') {
      let item = $('<div class="nota"></div>').text(nota);
      let lixo = $('<span class="lixo">&#128465;</span>');
      item.append(lixo);
      $('#lista-anotacoes').append(item);
      $('#nova-anotacao').val('');
      salvarAnotacoes();
    }
  });

  $('#lista-anotacoes').on('click', '.lixo', function () {
    $(this).parent().remove();
    salvarAnotacoes();
  });

  carregarAnotacoes();
});







