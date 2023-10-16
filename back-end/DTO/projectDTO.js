
function projectDTO(project) {
    return {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        created_at: project.created_at,
        updated_at: project.updated_at,
        deleted_at: project.deleted_at,
        tasks: null
    };
}

module.exports = projectDTO;