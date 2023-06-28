function giveData(e) {
  e.preventDefault();
  const { username, password } = e.target.serialize();
  getResponse({ username, password });
}
