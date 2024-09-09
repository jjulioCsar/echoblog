import Usuarios from "../models/usuariosModel.js";
import {z} from "zod";


//ZOD VALIDATIONS
import formatZodError from "../helpers/formatZodError.js";

//Query (optional) - Params (mandatory)
//postagens?paginas=1&limit=10
//req.params.limit --> to retrieve all registered items, must be changed

//validações com ZOD

//puxar postagens
// export const puxarPostagens = async (req, res) => {

//   const paginas = parseInt(req.query.paginas) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = (paginas - 1) * limit;
//   try {
//     const postagens = await Postagem.findAndCountAll({
//       limit,
//       offset,
//     });
//     const totalPaginas = Math.ceil(postagens.count / limit);
//     res.status(200).json({
//       totalPostagens: postagens.count,
//       totalPaginas,
//       paginaAtual: paginas,
//       itemsPorPagina: limit,
//       proximaPagina:
//         totalPaginas === 0
//           ? null
//           : `http://localhost:9090/postagens?paginas=${paginas + 1}`,
//       postagens: postagens.rows,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Error ao listar a postagem" });
//   }
// };

// Função de Postar
// export const postUsuarios = async (req, res) => {
//   const { titulo, conteudo, dataPublicacao, autor, imagem } = req.body;

//   // Validação dos campos obrigatórios
//   if (!titulo) {
//     return res.status(400).json({ error: "Titulo é obrigatório" });
//   }
//   if (!conteudo) {
//     return res.status(400).json({ error: "Conteúdo é obrigatório" });
//   }
//   if (!autor) {
//     return res.status(400).json({ error: "Autor é obrigatório" });
//   }
//   if (!imagem) {
//     return res.status(400).json({ error: "Imagem é obrigatória" });
//   }

//   const novaPostagem = { titulo, conteudo, dataPublicacao, autor, imagem};

//   try {
//     // Criação da nova postagem
//     await Postagem.create(novaPostagem);
//     return res.status(201).json(novaPostagem);
//   } catch (error) {
//     console.error("Erro ao criar a postagem:", error);
//     return res.status(500).json({ error: "Falha ao criar a imagem" });
//   }
// };

// //puxar postagem por ID
// export const puxarPostagemID = async (req, res) => {
//   const bodyValidation = puxarPorID.safeParse(req.params);
//   if (!bodyValidation.success) {
//     return res.status(400).json({ 
//       msg: "Os dados recebidos do corpo da requisição são inválidos", 
//       detalhes: formatZodError (bodyValidation.error) 
//     });
//   }

//   try {
//     const { id } = req.params;
//     const postagem = await Postagem.findOne({ where: { id } });

//     if (!postagem) {
//       return res.status(404).json({ error: "Postagem não encontrada" });
//     }

//     res.status(200).json(postagem);
//   } catch (error) {
//     console.error("Erro em puxar a postagem pelo id", error);
//     res.status(500).json({ error: "Falha ao achar a postagem" });
//   }
// };
