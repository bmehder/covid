async function getData() {
  const res = await fetch(
    `https://raw.githubusercontent.com/bmehder/projects/master/json/covid.json`
  );
  const data = await res.json();

  return data;
}
