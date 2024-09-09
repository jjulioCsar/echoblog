import jwt from 'jsonwebtoken';
import Usuarios from '../models/usuariosModel.js';

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.papel !== 'administrador') {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default AuthMiddleware