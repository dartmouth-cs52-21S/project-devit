import axios from 'axios';

const getCommits = (repo) => {
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
