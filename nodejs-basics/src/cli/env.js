import process from 'node:process';

// implement function that parses environment variables with prefix `RSS_`
// and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`
const parseEnv = () => {
  const rssEnvVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);

  if (rssEnvVars.length > 0) {
    console.log(rssEnvVars.join('; '));
  }
};

parseEnv();
