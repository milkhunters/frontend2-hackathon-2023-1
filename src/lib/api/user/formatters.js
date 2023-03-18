export const userFullName = (user) => {
    return `${user.lastName} ${user.firstName} ${user.patronymic}`;
};

export const userAvatarId = (user) => {
    return user.avatar_id;
}

export const roleDescription = (roleId) => {
    const startingId = 3;
    return ["User", "High User", "Administrator"][roleId - startingId];
};

export const validateProfile = (profile) => {
    return [
        "id",
        "avatar_id",
        "first_name",
        "last_name",
        "patronymic",
        "department",
        "job_title",
        "role",
    ].every((field) => field in profile);
};
