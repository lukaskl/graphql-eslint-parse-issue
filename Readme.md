
### Description

This repository is meant just to reproduce and report an issue ([dotansimha/graphql-eslint#422](https://github.com/dotansimha/graphql-eslint/issues/422)) which occurs using [graphql-eslint](https://github.com/dotansimha/graphql-eslint/)


it seems that if `processor: '@graphql-eslint/graphql'` option is used together with `.graphql` or `.gql` files and if those files contain comments, processor might fail to process the file.

E.g.

- This one is processed without any issues:
  ```gql
  fragment UserFields on User {
    id
    name
  }
  ```
- This one is processed as well without any issues:
  ```gql
  # Just any comment without any other file mentions
  fragment UserFields on User {
    id
    name
  }
  ```
- This file fails:
  ```gql
  # Lets mention another file, e.g.: User1.fragment.gql in this comment
  fragment UserFields on User {
    id
    name
  }
  ```

### Steps to reproduce

run:
```
git clone git@github.com:lukaskl/graphql-eslint-parse-issue.git
cd graphql-eslint-parse-issue
yarn install --frozen-lockfile
yarn eslint .
```

### ✅ Expected result

The output should be something like this:
```
➜  graphql-eslint-parse-issue yarn eslint .
yarn run v1.15.2

***/src/User0.fragment.gql
  3:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

***/src/User1.fragment.gql
  4:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

***/src/User2.fragment.gql
  4:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

✖ 3 problems (0 errors, 3 warnings)
```

### 🔴 Actual result

```
➜  graphql-eslint-parse-issue yarn eslint .
yarn run v1.15.2
$ ***/node_modules/.bin/eslint .
[graphql-eslint/processor]: Unable to process file "***/src/User2.fragment.gql":  SyntaxError: Unexpected token (1:0)
    at Object._raise (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:776:17)
    at Object.raiseWithData (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:769:17)
    at Object.raise (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:737:17)
    at Object.unexpected (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:9253:16)
    at Object.parseExprAtom (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:10743:20)
    at Object.parseExprAtom (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:4996:20)
    at Object.parseExprSubscripts (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:10318:23)
    at Object.parseUpdate (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:10298:21)
    at Object.parseMaybeUnary (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:10276:23)
    at Object.parseExprOps (***/node_modules/@graphql-tools/graphql-tag-pluck/node_modules/@babel/parser/lib/index.js:10141:23) {
  loc: Position { line: 1, column: 0 },
  pos: 0
}

***/src/User0.fragment.gql
  3:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

***/src/User1.fragment.gql
  4:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

***/src/User2.fragment.gql
  4:4  warning  This field is marked as deprecated in your GraphQL schema (reason: Use `firstName` instead.)  @graphql-eslint/no-deprecated

✖ 3 problems (0 errors, 3 warnings)
```

