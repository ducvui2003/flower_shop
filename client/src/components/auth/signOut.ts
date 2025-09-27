const signOut = async () => {
  await fetch(`/api/auth/logout`, {
    method: 'DELETE',
  });
};
export default signOut;
