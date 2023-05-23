export const checkPermissions = (setPermissions, { roleId }) => {
  const hasPermissions = setPermissions.includes(roleId);
  if (hasPermissions) return true;
  throw new Error('Je bent niet geautoriseerd');
};
