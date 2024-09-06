import Postagem from "../models/postagensModel.js";
import {z} from "zod";

//ZOD VALIDATIONS
import formatZodError from "../helpers/formatZodError.js";

//Query (optional) - Params (mandatory)
//postagens?paginas=1&limit=10
//req.params.limit --> to retrieve all registered items, must be changed

//validações com ZOD
//validação post :
const postValidação = z.object({
  titulo: z.string().min(3).max(100),
  conteudo: z.string().min(50).max(1000),
  autor: z.string().min(3).max(50),
});
//validação por ID
const puxarPorID = z.object({
  id: z.string().uuid(),
})

const atualizarPostagem = z.object({
  titulo: z.string().min(3).max(100),
  conteudo: z.string().min(50).max(1000),
  autor: z.string().min(3).max(50),
})

const paramsSchema = z.object({
  id: z.string().uuid(),
})


//puxar postagens
export const puxarPostagens = async (req, res) => {

  const paginas = parseInt(req.query.paginas) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (paginas - 1) * limit;
  try {
    const postagens = await Postagem.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(postagens.count / limit);
    res.status(200).json({
      totalPostagens: postagens.count,
      totalPaginas,
      paginaAtual: paginas,
      itemsPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:9090/postagens?paginas=${paginas + 1}`,
      postagens: postagens.rows,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error ao listar a postagem" });
  }
};

// Função de Postar
export const postPostagens = async (req, res) => {
  const bodyValidation = postValidação.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ 
      msg: "Os dados recebidos do corpo da requisição são inválidos", 
      detalhes: formatZodError (bodyValidation.error) 
    });
  }

  const { titulo, conteudo, dataPublicacao, autor, imagem } = req.body;

  // Validação dos campos obrigatórios
  if (!titulo) {
    return res.status(400).json({ error: "Titulo é obrigatório" });
  }
  if (!conteudo) {
    return res.status(400).json({ error: "Conteúdo é obrigatório" });
  }
  if (!autor) {
    return res.status(400).json({ error: "Autor é obrigatório" });
  }
  if (!imagem) {
    return res.status(400).json({ error: "Imagem é obrigatória" });
  }

  const novaPostagem = { titulo, conteudo, dataPublicacao, autor, imagem};

  try {
    // Criação da nova postagem
    await Postagem.create(novaPostagem);
    return res.status(201).json(novaPostagem);
  } catch (error) {
    console.error("Erro ao criar a postagem:", error);
    return res.status(500).json({ error: "Falha ao criar a imagem" });
  }
};

//puxar postagem por ID
export const puxarPostagemID = async (req, res) => {
  const bodyValidation = puxarPorID.safeParse(req.params);
  if (!bodyValidation.success) {
    return res.status(400).json({ 
      msg: "Os dados recebidos do corpo da requisição são inválidos", 
      detalhes: formatZodError (bodyValidation.error) 
    });
  }

  try {
    const { id } = req.params;
    const postagem = await Postagem.findOne({ where: { id } });

    if (!postagem) {
      return res.status(404).json({ error: "Postagem não encontrada" });
    }

    res.status(200).json(postagem);
  } catch (error) {
    console.error("Erro em puxar a postagem pelo id", error);
    res.status(500).json({ error: "Falha ao achar a postagem" });
  }
};

//atualizar postagem por ID
export const postagemAtualizar = async (req, res) => {
  
const bodyValidation = atualizarPostagem.safeParse(req.body);
if (!bodyValidation.success) {
  return res.status(400).json({ 
    msg: "Os dados recebidos do corpo da requisição são inválidos", 
    detalhes: formatZodError(bodyValidation.error) 
  });
}
const paramsValidation = paramsSchema.safeParse(req.params);
if (!paramsValidation.success) {
  return res.status(400).json({ 
    msg: "Os dados recebidos na URL são inválidos", 
    detalhes: formatZodError(paramsValidation.error) 
  });
} 

  const { id } = req.params;
  const { titulo, conteudo, autor } = req.body;

  //validations
  if (!titulo) {
    res.status(404).json({ error: "Titulo é obrigatorio" });
    return;
  }
  if (!conteudo) {
    res.status(404).json({ error: "Descrição é obrigatorio" });
    return;
  }
  if (!autor) {
    res.status(404).json({ error: "Autor é obrigatorio" });
    return;
  }

  const postagemAtualizada = {
    titulo,
    conteudo,
    autor,
  };
  console.log(postagemAtualizada);

  try {
    await Postagem.update(postagemAtualizada, { where: { id } });
    res.status(200).json({ message: "Postagem atualizada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha em atualizar postagem" });
  }
};

// //atualizar status de tarefa por id
// export const  updateStatusTarefa = async (req, res) => {
//   const { id } = req.params;
  
//   try{
//     const tarefa = await Postagem.findOne({ raw: true, where: { id } });
//     if(tarefa === null){
//       return res.status(404).json({ error: "Task not found" });
//     }
//     if(tarefa.status === "pendente"){
//       await Postagem.update({ status: "concluída" }, { where: { id } });
//     }else if(tarefa.status === "concluída"){
//       await Postagem.update({ status: "pendente" }, { where: { id } });
//     }
    
//     const taskAtualizada = await Postagem.findOne({ raw: true, where: { id } });
//     res.status(200).json(taskAtualizada);
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to find task" });
//     return;
//     }

// };

// //buscar tarefas por status
// export const buscarTarefaPorSituacao = async (req, res) => {
//   const { situacao } = req.params;

//   if (situacao !== "pendente" && situacao !== "concluída") {
//     return res.status(400).json({ error: "Invalid situation, use 'pendente' or 'concluída'" });
//   }

//   try {
//     const postagens = await Postagem.findAll({ where: { status: situacao }, raw: true });
//     res.status(200).json(postagens);
//   } catch (error) {
//     console.error("Error finding postagens by situation:", error);
//     res.status(500).json({ error: "Failed to find postagens" });
//   }
// };

