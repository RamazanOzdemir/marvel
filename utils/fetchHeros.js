import makeHash from "./makeHash";

export default async () => {
  const ts = "rmzn";
  const hash = makeHash(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY);
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&hash=${hash}&apikey=${process.env.PUBLIC_KEY}&limit=30`;

  return fetch(url).then((res) =>
    res.json().then(({ data: { results } }) => {
      if (res.status === 200) {
        return results;
      }
    })
  );
};
