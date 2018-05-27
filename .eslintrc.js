module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      　　"ecmaVersion": 6,
      　　"sourceType": "module",
      　　"ecmaFeatures": {
          　　"jsx": true
     　　 }
  　　},
    "globals": {
      "$": true
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [1, { allow: ["warn", "error"] }]
    }
};
