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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const postagem = await Postagem.findOne({ where: { id } });

    if (!postagem) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(postagem);
  } catch (error) {
    console.error("Error in retrieving task by ID:", error);
    res.status(500).json({ error: "Failed to find task" });
  }
};

// //atualizar tarefa por ID
// export const updateTarefa = async (req, res) => {
  
// const bodyValidation = updateSchema.safeParse(req.body);
// if (!bodyValidation.success) {
//   return res.status(400).json({ 
//     msg: "Os dados recebidos do corpo da requisição são inválidos", 
//     detalhes: formatZodError(bodyValidation.error) 
//   });
// }
// const paramsValidation = paramsSchema.safeParse(req.params);
// if (!paramsValidation.success) {
//   return res.status(400).json({ 
//     msg: "Os dados recebidos na URL são inválidos", 
//     detalhes: formatZodError(paramsValidation.error) 
//   });
// } 

//   const { id } = req.params;
//   const { tarefa, descricao, status } = req.body;

//   //validations
//   if (!tarefa) {
//     res.status(404).json({ error: "task is mandatory" });
//     return;
//   }
//   if (!descricao) {
//     res.status(404).json({ error: "description is mandatory" });
//     return;
//   }
//   if (!status) {
//     res.status(404).json({ error: "status is mandatory" });
//     return;
//   }

//   const tarefaAtualizada = {
//     tarefa,
//     descricao,
//     status,
//   };
//   console.log(tarefaAtualizada);

//   try {
//     await Postagem.update(tarefaAtualizada, { where: { id } });
//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update task" });
//   }
// };

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

