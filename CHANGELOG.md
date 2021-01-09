# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.15](https://github.com/TimSusa/cliptor/compare/v0.0.14...v0.0.15) (2021-01-09)


### Features

* Center UI Elements and use maximal space ([ba61b61](https://github.com/TimSusa/cliptor/commit/ba61b61826828181052a0caf7c79df90eff4e2ba))
* Establish removing clips and beautify UI further ([66b3540](https://github.com/TimSusa/cliptor/commit/66b35406c8ba2dd621fefbcc902017c30e197aff))
* Spit out warning on ios and safari ([03c6838](https://github.com/TimSusa/cliptor/commit/03c6838c8cff0a5150ea0fbefe019b23d4a428ec))


### Bug Fixes

* Crash on safari ([a7d915e](https://github.com/TimSusa/cliptor/commit/a7d915e5181c9d71d71ed6dd4a6dbdafc3c395b9))
* Menu Bar Control Width ([0642ef4](https://github.com/TimSusa/cliptor/commit/0642ef4e6864f1048ba35a2398105a196eb822fd))

### [0.0.14](https://github.com/TimSusa/cliptor/compare/v0.0.13...v0.0.14) (2021-01-09)


### Features

* Add link to the installer in webdemo; Bump version ([2e923fe](https://github.com/TimSusa/cliptor/commit/2e923fe32930b7ee13cbf942f56af7229d348efa))
* Establish latency compensated clip playback! YAY! ([f81788a](https://github.com/TimSusa/cliptor/commit/f81788a4bf4401a7fbe35f2cc0bbc7201b855893))
* Establish Stopping all clips globally ([5f719db](https://github.com/TimSusa/cliptor/commit/5f719db611f1db8d5806b4261bc3a6a2d2fc8b4d))
* Establish Timer clock value label in menubar ([7bf9878](https://github.com/TimSusa/cliptor/commit/7bf9878fbc636a2918f43b75ac054f4710b8a1ad))
* use only registered clips ([ce157f9](https://github.com/TimSusa/cliptor/commit/ce157f93133ac6163b36eee29ed844bfeaf90c69))


### Bug Fixes

* Get rid of failing loading feature ([a5856ea](https://github.com/TimSusa/cliptor/commit/a5856ea1a368ef3ad88daa37c424d01a6af0f19f))
* Stop only if play was called ([70413b0](https://github.com/TimSusa/cliptor/commit/70413b07e5ae0a99004dc4013d4e730ffff2147d))

### [0.0.13](https://github.com/TimSusa/cliptor/compare/v0.0.12...v0.0.13) (2021-01-07)


### Features

* Load file into clip via dialog on web ([d872513](https://github.com/TimSusa/cliptor/commit/d872513801d063bfa5d1cde3932341cbb8b599a3))
* Load file on electron app ([8dc6717](https://github.com/TimSusa/cliptor/commit/8dc6717903ff8242c93e16ccd805acc178f10186))
* try to use a webworker for the timer ([2cbf435](https://github.com/TimSusa/cliptor/commit/2cbf435c5fd5db97109dfefad45a4ee415165ae4))


### Bug Fixes

* Compensate only after first play ([38125e3](https://github.com/TimSusa/cliptor/commit/38125e3ebe44ca7c277bcc6763f996a96b0ada69))
* correction of audio context constructor calling on safari ([b3a83e8](https://github.com/TimSusa/cliptor/commit/b3a83e82df027c5f704d2b54b2cee8971cd338f3))
* Get rid of approach ([285af4b](https://github.com/TimSusa/cliptor/commit/285af4b769fef2a897043dcade3aa91441d5f6ff))
* hotfix play start ([ae991b3](https://github.com/TimSusa/cliptor/commit/ae991b3dcf40655d39d1e27e691b3c405b5332c6))
* no compensation on play ([42282c5](https://github.com/TimSusa/cliptor/commit/42282c531add3c2649963db34e2b84edc7fc07ac))
* Safari Browser desktop ([5c5f307](https://github.com/TimSusa/cliptor/commit/5c5f307bbd8d0bcd8892443d2ecdc556d8059cce))
* zero does not make it better at play ([0ae2c13](https://github.com/TimSusa/cliptor/commit/0ae2c139f311d7c17a9c6d807e756e69991ddcaa))

### [0.0.12](https://github.com/TimSusa/cliptor/compare/v0.0.11...v0.0.12) (2021-01-05)


### Features

* give stop measured latency for compensation ([ea2656a](https://github.com/TimSusa/cliptor/commit/ea2656ab49dd56563107cc48a8410165a6f5b121))
* Improve clip latenncy compensation ([1178acb](https://github.com/TimSusa/cliptor/commit/1178acb4efccb37f2e3e635189215c480b2059fe))


### Bug Fixes

* play and stop of clips; Fix Safari ([6b8aac0](https://github.com/TimSusa/cliptor/commit/6b8aac0f7dcbf8d754ec94fc0beefd3382015948))

### [0.0.11](https://github.com/TimSusa/cliptor/compare/v0.0.10...v0.0.11) (2021-01-04)


### Features

* Change audiodriver on playback without issues ([afc8a48](https://github.com/TimSusa/cliptor/commit/afc8a48134229809bef124fbbc85fa286d260ad2))
* Establish stop of scenes ([168963b](https://github.com/TimSusa/cliptor/commit/168963b8f6fa5045094fec9cd677e571bee1c868))
* Set clip rate ([4fc6cbf](https://github.com/TimSusa/cliptor/commit/4fc6cbf4a2972d769fd1f101ee922f20a767bf10))
* Sync clip playback, stop other clips ([3f5bfa6](https://github.com/TimSusa/cliptor/commit/3f5bfa67efd6ccc5b7366e3289e4df98e2978fb5))


### Bug Fixes

* default driver ([fa2a99f](https://github.com/TimSusa/cliptor/commit/fa2a99f323c0dfed54171a1fed9c412eda78fefd))
* having only default driver ([97be2ca](https://github.com/TimSusa/cliptor/commit/97be2ca653f4fc02b7c49be75d4fe6ff8c2f8498))
* label ([1810899](https://github.com/TimSusa/cliptor/commit/1810899bda8f9c4cd7c5588d37518fe29b638694))
* not using self audiocontext ([f3adfec](https://github.com/TimSusa/cliptor/commit/f3adfec1f8dd3565c1ba89a826f120c74271abc0))
* put try catch arround scanfordrivers ([afea0fc](https://github.com/TimSusa/cliptor/commit/afea0fc59faf772359d80dca6959781574da6401))
* Stop scene ui behaviour ([a13b202](https://github.com/TimSusa/cliptor/commit/a13b202de6fe88099ac9af59972e02e253e31d36))
* Try to fix on raspi audio out ([09cfe36](https://github.com/TimSusa/cliptor/commit/09cfe36daed13c581a42e5c8f157f4e55595b2bf))
* Wording ([860ded7](https://github.com/TimSusa/cliptor/commit/860ded7ef4c967b3f29df161e627632e47e90f8a))

### [0.0.10](https://github.com/TimSusa/cliptor/compare/v0.0.9...v0.0.10) (2021-01-02)


### Features

* Have different audio output driver for every clip available ([b855173](https://github.com/TimSusa/cliptor/commit/b85517359fae4ced8342237fd88d90c3d4ac50af))
* introduce loading ([1e16462](https://github.com/TimSusa/cliptor/commit/1e164628745f4ea3b3eb3010423e2efdbf03c869))
* show loading on iphone ([8a47c92](https://github.com/TimSusa/cliptor/commit/8a47c9215a19aa8442cb8f14c3b500595e6c70e4))
* Try to fix touch scroll ([2edc2bd](https://github.com/TimSusa/cliptor/commit/2edc2bda2717906140a7858432921f5c880e2bef))
* use webaudio backend ([377afec](https://github.com/TimSusa/cliptor/commit/377afec735821e27cc4860b7ed6c9b1bc35628bb))

### [0.0.9](https://github.com/TimSusa/cliptor/compare/v0.0.6...v0.0.9) (2021-01-02)


### Features

* Add second line to demo and adapt over sync ([66cc182](https://github.com/TimSusa/cliptor/commit/66cc18259103c5d986b200effa262e570cd32b55))
* Have Scene playback synced to each other ([02297ae](https://github.com/TimSusa/cliptor/commit/02297aee5d1473be32d68ade9a5dc54ec32d58fe))
* Hide waveform until ready ([1b82a3c](https://github.com/TimSusa/cliptor/commit/1b82a3cc1950ff4dbd20e086bc7512bf111c93a7))
* Renew Logo ([6db4c91](https://github.com/TimSusa/cliptor/commit/6db4c913e555180148136b98cdce5a7875a6279b))
* Save space due to converting to m4a ([88b48b2](https://github.com/TimSusa/cliptor/commit/88b48b2b3b6227b4c2caf41b72a68277598e3e6b))


### Bug Fixes

* cancel ongoing ajax ([34933fc](https://github.com/TimSusa/cliptor/commit/34933fc2004ba5e8dcadaa4645e2a391705e8121))
* fix ([c759111](https://github.com/TimSusa/cliptor/commit/c7591119897fb1a39e85e6563ce278f2201ecf95))

### [0.0.6](https://github.com/TimSusa/cliptor/compare/v0.0.5...v0.0.6) (2021-01-01)


### Features

* Introduce shifting samples forward and backward ([62be32d](https://github.com/TimSusa/cliptor/commit/62be32d96b5d5f39548bcd784e1257ebf980da60))

### [0.0.5](https://github.com/TimSusa/cliptor/compare/v0.0.4...v0.0.5) (2021-01-01)


### Features

* Add Menubar and loading / saving functionality; Add Demo Example at startup ([5824dd2](https://github.com/TimSusa/cliptor/commit/5824dd25b70e3d606325c7c8b0d4a8bc73fcf4f9))


### Bug Fixes

* Scene Playback ([9b74ef5](https://github.com/TimSusa/cliptor/commit/9b74ef59bf9dc1349dda971dc5d41579578b8610))

### [0.0.4](https://github.com/TimSusa/cliptor/compare/v0.0.2...v0.0.4) (2021-01-01)


### Features

* Add auto loop ([86c07a1](https://github.com/TimSusa/cliptor/commit/86c07a1f8e77fda327e7f757e8dca88f205c4ef7))
* Beatify Matrix View ([d70f4fd](https://github.com/TimSusa/cliptor/commit/d70f4fdef202878640e210de87ec5e2ca5f5e6c3))
* Convert to wavesurfer.js and establish more exciting ux ([025f05a](https://github.com/TimSusa/cliptor/commit/025f05ace6a73d79bc80f9b0f91725d85397dddf))
* Introduce minimizing of waveforms ([6e49d32](https://github.com/TimSusa/cliptor/commit/6e49d32e201f04bf3f803fdf3e896a5775186399))
* Introduce Playing of Scenes ([308b4fc](https://github.com/TimSusa/cliptor/commit/308b4fcfd9945159e9f34bb0c67dcf2da9af7e5b))
* Screenshot ([dcac08e](https://github.com/TimSusa/cliptor/commit/dcac08e2abb122884a9321222849c43a2cfb5d4e))

### [0.0.2](https://github.com/TimSusa/cliptor/compare/v0.0.1...v0.0.2) (2020-12-31)


### Features

* Establish new logo ([907cabc](https://github.com/TimSusa/cliptor/commit/907cabc81f407126147b94bd28564827a3653b0b))


### Bug Fixes

* Remind on last volume change when stopping or pausing ([56f6bf1](https://github.com/TimSusa/cliptor/commit/56f6bf170ce6c8880fc4d5fc4a7f5049d95444ac))

### 0.0.1 (2020-12-30)


### Features

* Add play, pause and stop for all clips inclusive drag and drop file support ([fe175f7](https://github.com/TimSusa/cliptor/commit/fe175f7a6e4dd4111d51e4ac64cb99be9449e6e7))
* Establish configurable matrix ([b2a5733](https://github.com/TimSusa/cliptor/commit/b2a5733eb65ced35a7146bf6ce0535060d764056))
* Initial shot without functionality ([393530d](https://github.com/TimSusa/cliptor/commit/393530d7fc796001552acd283241b1713b22ba86))
* Introduce fading of clips, so there is no bad clicking ([e2414cc](https://github.com/TimSusa/cliptor/commit/e2414cc14b3c8e8a31324bd7648b0d97db310c9a))
* Set individual volume for each clip ([420d0d4](https://github.com/TimSusa/cliptor/commit/420d0d47a577f0f5ca6c78e6873478f3f0a366e5))
