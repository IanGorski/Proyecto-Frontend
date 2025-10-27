const API_URL = 'http://localhost:3000/api/auth';

export async function register (username, email, password){

    try{
        const body = {
            name: username, 
            email,
            password
        }
    
    
        //Fetch es una funcion nativa de JS para hacer consultas HTTP
        const response_http = await fetch(
            `${API_URL}/register`,
            {
                method: 'POST',
                headers: {
                    //Indica a mi servidor que voy a enviar un JSON por body
                    "Content-Type": 'application/json'
                },
                //Transformo el objeto de JS a JSON (texto)
                body: JSON.stringify(body)
            }
        )
        //Transformamos el body de respuesta de JSON a objeto de JS 
        const response = await response_http.json()
    
        return response
    }
    catch(error){
        console.error('Error al registrar:', error)
        throw new Error('Error interno del servidor')
    }
}

export async function login (email, password){
    try{
        const body = {
            email, 
            password
        } 
    
        const response_http = await fetch(
                `${API_URL}/login`,
            {
                method: 'POST',
                headers: {
                    //Indica a mi servidor que voy a enviar un JSON por body
                    "Content-Type": 'application/json'
                },
                //Transformo el objeto de JS a JSON (texto)
                body: JSON.stringify(body)
            }
        )
        
        const response = await response_http.json()
    
        return response

    }
    
    catch(error){
        console.error('Error al registrar:', error)
        throw new Error('Error interno del servidor')
    }
}

export async function inviteUserToWorkspace(email_invited, id_workspace, id_inviter, invited_role) {
  const user = await UserRepository.getByEmail(email_invited);

  if (!user) {
    throw createError(404, `El usuario con el email ${email_invited} no existe.`);
  }

  // Verificar que el usuario no esté ya en el workspace usando el repositorio
  const isMember = await WorkspaceRepository.isMember(id_workspace, user.id);

  if (isMember) {
    throw createError(400, `El usuario con el email ${email_invited} ya es miembro del workspace.`);
  }

  // Usar el repositorio para manejar la lógica de generación de token
  const token = await WorkspaceRepository.generateInviteToken({
    id_invited: user.id,
    id_inviter,
    id_workspace,
    invited_role
  });

  return {
    message: `Usuario ${email_invited} invitado correctamente.`,
    token
  };
}