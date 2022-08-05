const nombreRole = (value: string) => {
    if (value === 'superAdmin') {
        return 'Super Admin'
    } else if (value === 'admin') {
        return 'Administrador'
    } else if (value === 'usuario') {
        return 'Usuario'
    } else {
        return null
    }
}

export default nombreRole
