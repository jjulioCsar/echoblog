import Usuarios from "../models/usuariosModel.js";
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import formatZodError from "../helpers/formatZodError.js";

const createUsuarios = z.object({
  nome: z.string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome não pode ter mais de 50 caracteres." }),
  
  email: z.string()
    .email({ message: "O e-mail deve ser um endereço válido." }),
  
  senha: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .max(12, { message: "A senha não pode ter mais de 12 caracteres." }),
  
  papel: z.enum(["administrador", "autor", "leitor"])
    .optional()
    .default("leitor")
});

export const postUsuarios = async (req, res) => {
  const bodyValidation = createUsuarios.safeParse(req.body);

  if (!bodyValidation.success) {
    return res.status(400).json({
      msg: "Os dados recebidos do corpo da requisição são inválidos",
      detalhes: formatZodError(bodyValidation.error),
    });
  }

  const { nome, email, senha, papel } = req.body;

  try {
    const existingUser = await Usuarios.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Usuário com este e-mail já existe." });
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuarios.create({
      nome,
      email,
      senha: hashSenha,
      papel: papel || "leitor",
    });

    res.status(201).json({
      msg: "Usuário registrado com sucesso!",
      usuario: novoUsuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao registrar o usuário" });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, papel: usuario.papel },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login realizado com sucesso",
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao realizar login",
      error: error.message
    });
  }
};
