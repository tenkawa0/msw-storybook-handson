# MSW + Storybook で始めるフロントエンドテスト

## はじめに

今回は簡単なTodoアプリを題材に、MSWとStorybook を使ったフロントエンドテストの書き方を解説します<br />
todoアプリはReact(Nextjs)で実装していますが、MSWとStorybookはReact以外のフロントエンドフレームワークでも利用可能ですので、是非ともご自身のプロダクトに取り入れてみてください。

## 環境構築

本リポジトリでは環境構築済みなので、以下のコマンドを実行して Storybook が起動するか確認しましょう。<br />

```bash
npm install
npm run storybook
```

各ツールのイントール方法は公式ドキュメントを参照ください。

- [Storybook](https://storybook.js.org/docs/react/get-started/install/)
- [MSW](https://mswjs.io/docs/getting-started/install)
- [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)

> **※補足** <br/>`msw-storybook-addon`は、2024/03/17時点では`msw v2`へ正式対応していません。<br/>ですが、`canary version: 2.0.0--canary.122.0f49e5c.0`で試せるようになっています。<br/>せっかくなので本リポジトリではこちらのバージョンを採用して`msw v2`を使用していきます。<br/>もしすぐにでもプロダクトへ導入したい場合は、`msw v1`を使用するようにしてください。<br/>`msw v1`と`msw v2`で書き方変わるので参照するドキュメント間違わないように注意。<br/> https://github.com/mswjs/msw-storybook-addon/pull/122

> **※参考** <br/>
> Nextjs(v14) App Router + Storybook(v8) + MSW(v2)<br/> https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/

## ディレクトリ構成

```
/
├─ .storybook -> storybookの設定
└─ src
   ├─ app -> 今回の勉強会で使用するディレクトリ
   │  ├─ step1-play-function
   │  └─ step2-msw
   │
   ├─ components -> 共通コンポーネント
   ├─ mocks -> MSWで使用するモックデータの定義
   ├─ stories -> Storybookのサンプル
   └─ types -> 型定義

```

## フロントエンドテストの概要

まずはフロントエンドテストってどんなことするのかを大雑把に理解しましょう。<br/>
以下の記事がとても参考になるので読んでいきます。

> https://qiita.com/noah-dev/items/3fd211deb8711fae8204

紹介されている「Testing Trophy」では「Integration」のテストを重点的にやるのが良いと提唱されています。<br/>
MSWとStorybookを活用することで、この「Integration」のテストが実装できるようになります

## 本題

概要が分かったところで、実際にIntegrationテストを作り方を見てみましょう。<br/>
テストコードといえばCLI上でコマンドを実行するイメージがあると思いますが、Storybookではテストが実行される様をStoryとして表示することが可能です。

- [Todoを追加するテスト](http://localhost:6006/?path=/story/work-step1-storybook%E3%81%AEplay-function%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E6%93%8D%E4%BD%9C%E3%82%92%E3%83%86%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B-sample--add-todo)
- [Todoを削除するテスト](http://localhost:6006/?path=/story/work-step1-storybook%E3%81%AEplay-function%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E6%93%8D%E4%BD%9C%E3%82%92%E3%83%86%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B-sample--delete-todos)

これはテストコードの書きやすさにもつながるし、なによりこのテストコードがそのままシステムのドキュメントにもなります。<br/>
もちろんCLI上でテストを実行することもできるので、CIに組み込むこともできますよ！<br/>

次のパートから実際に画面でライブコーディングしながらテストコードの作成方法を説明していきます。

<br/>

### <Step1.> StorybookのPlay functionを使ってユーザー操作をテストする

このパートでは `src/app/step1-play-function/_stories/index.stories.tsx`を編集します。<br/>
流れは以下の通り。

- Storybook Play functionの使い方
- アクセシビリティについてふんわり解説
- [Priority](https://testing-library.com/docs/queries/about/#priority)を読む
- テストコードの作成

> **復習するときの参考情報**
>
> - [Storybook Interaction Testing](https://storybook.js.org/docs/writing-tests/interaction-testing)
>   - 本項の内容がまとまっています
>   - 復習するときはとりあえずこれから見てください
> - [Testing Library - About Queries](https://testing-library.com/docs/queries/about)
>   - Testing Libray の使い方がまとまっている
>   - とにかく[Priority](https://testing-library.com/docs/queries/about/#priority)を読むべし最重要
> - [アクセシビリティについてふんわり知りたい](https://www.youtube.com/watch?v=ZLL0_W5w1vo&t=782s)
>   - WAI-ARIA 勉強会の動画
>   - とっかかりとしてとても参考になると思います

<br/>

### <Step2.> MSW で Web API のレスポンスをモック

このパートでは `src/app/step2-msw/_stories/index.stories.tsx`を編集します。<br/>
流れは以下の通り。

- MSWの使い方
- 実際のデータ更新ができないことによる弊害
- Story毎にモックデータを差し替える
- テストコードの作成

> **復習するときの参考情報**
>
> - [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)
>   - Storybook と MSW を連携する拡張機能
>   - MSW の具体的な使い方もこのページにまとまってます

<br/>

## さいごに

お疲れ様でした、以上で本日の内容は終了です。<br/>
Storybookはコンポーネントライブラリという文脈でしか認識していないのは、とても勿体ないです。<br/>
今日紹介できていない機能もいっぱいありますし、興味を持った方は是非Storybookのドキュメント読み込んでください！

P.S）本格導入したあとに欲しくなるであろう情報をTipsに掲載しておきますので参考までに。

## Tips

- [@mswjs/data](https://github.com/mswjs/data)
  - MSW でデータを永続化するためのライブラリ
  - いやーやっぱデータ追加したらStory上でもデータが追加されてほしいって方使ってください
  - より発展的な内容は[こちらの記事](https://zenn.dev/takepepe/articles/msw-data-userflow-testing)が参考になります
- [Visiual tests](https://storybook.js.org/docs/writing-tests/visual-testing)
  - [chromatic](https://www.chromatic.com/storybook?ref=storybook_site)というサービスを活用
  - chrometic以外のサービスもあるので、VRT(visual regression test) というキーワードでググるよろし
- [Test runner](https://storybook.js.org/docs/writing-tests/test-runner)
  - 作ったテストをCIに組み込むための仕組み
  - github actionsなら[yml](https://storybook.js.org/docs/writing-tests/test-runner#run-against-deployed-storybooks-via-github-actions-deployment)も用意してくれてる
- [Accesibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing)
  - 紹介しつつ自分はアクセシビリティにわかなんでなんもわからんです
  - せっかくだからアクセシビリティも本格的にやりたくなった方に参考になるかと、知らんけど
- [Test coverage](https://storybook.js.org/docs/writing-tests/test-coverage)
  - なんとカバレッジも出してくれるみたい
  - この勉強会の資料作ってるときにこのページを知りまして、自分も導入しようと思います
- [OpenAPIからMSW用のモックデータを生成](https://zenn.dev/leaner_dev/articles/20210908-openapi-msw-handlers)
  - スキーマ駆動で開発しとけば型情報の自動生成以外に、モックデータまで自動生成できちゃう
  - でたらめなモックデータでもよければ[Faker](https://fakerjs.dev/)を使うと楽
