[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-remove-inject-as-service/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-remove-inject-as-service/actions/workflows/ci.yml)

# ember-codemod-remove-inject-as-service

_Codemod to remove `inject as service`_<sup>1</sup>

1. [Features](#features)
1. [Usage](#usage)
    - [Arguments](#arguments)
    - [Limitations](#limitations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)

<sup>1. `@ember/service` provides `service` since [Ember 4.1](https://blog.emberjs.com/ember-4-1-released/). `inject`, which became an alias to `service`, is [planned to be deprecated in v6](https://rfcs.emberjs.com/id/1001-deprecate-named-inject).</sup>


## Features

The codemod helps you standardize how you inject services:

- Replace `inject` with `service`<sup>1</sup>
- Replace `!` with `declare` in TS files<sup>2</sup>
- Remove `private` and `readonly` keywords in TS files<sup>2</sup>

It preserves your code whenever possible.

<sup>1. Replaces `inject as ...` and `service as ...`, too.</sup>

<sup>2. Matches [the style shown in the Ember Guides](https://guides.emberjs.com/v5.8.0/typescript/core-concepts/services/#toc_using-services).</sup>


## Usage

Step 1. Quickly migrate.

```sh
cd <path/to/your/project>
npx ember-codemod-remove-inject-as-service <arguments>
```

Step 2. Fix formatting issues.

- Optional: Do a find-and-replace-all in TS files, if you want to place `@service` and `declare` on the same line whenever possible.

    - Find: `@service(\(.*\))?[\n\s]+declare`
    - Replace: `@service$1 declare`

- Run `lint:js:fix` (i.e. autofix from `eslint` and `prettier`).



### Arguments

You must pass `--type` to indicate what type of project you have.

```sh
npx ember-codemod-remove-inject-as-service --type app
npx ember-codemod-remove-inject-as-service --type v1-addon
npx ember-codemod-remove-inject-as-service --type v2-addon
```

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-remove-inject-as-service --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-remove-inject-as-service.js --root <path/to/your/project>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
