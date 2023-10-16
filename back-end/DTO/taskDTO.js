
function taskDTO(task) {
    return {
        id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        projectId: task.projectId,
        creator: task.creator,
        assignee: task.assignee,
        resolutionDate: task.resolutionDate,
        timeEstimate: task.timeEstimate,
        timeSpent: task.timeSpent
    }
}

module.exports = taskDTO;