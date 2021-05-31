import axios from 'axios';
// import fetch from 'fetch';

const getCommits = (repo) => {
//   fetch(
//     `https://api.github.com/repos/${repo}/commits`,
//     {
//       headers: {
//         authorization: 'token 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',
//       },
//     },
//   )
//     .then((response) => console.log('response', response.json()));

  const API_URL = `https://api.github.com/repos/${repo}/commits`;
  return new Promise((resolve, reject) => {
    axios.get(API_URL)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(`github api error: ${error}`);
        reject(error);
      });
  });
};

export default getCommits;
