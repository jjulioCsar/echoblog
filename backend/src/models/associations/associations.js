import { Usuarios } from "../usuariosModel.js";
import Post  from "../postagensModel.js";

Usuarios.hasMany(Post, { foreignKey: 'usuarioId', as: 'Postagens' });
Post.belongsTo(Usuarios, { foreignKey: 'usuarioId', as: 'usuario' });