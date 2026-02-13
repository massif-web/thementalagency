/** @type {import('tailwindcss').Config} */
const config = {
  content: {
    files: [
      "src/app/(frontend)/**/*",
      "src/assets/**/*",
      "src/**/components/**/*",
      "!src/app/(payload)/**/*",
    ],
  },
};

export default config;
