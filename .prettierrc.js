/* eslint-disable quotes, indent, no-unused-expressions */
/**
 * Prettier設定ファイル
 * コードフォーマットのルールを定義
 */
export default {
  semi: true, // 文末にセミコロンを追加
  singleQuote: true, // シングルクォートを使用
  tabWidth: 2, // インデントのスペース数
  trailingComma: 'es5', // ES5で有効な末尾のカンマを追加（オブジェクト、配列など）
  printWidth: 100, // 行の最大文字数
  bracketSpacing: true, // オブジェクトリテラルの括弧内にスペースを追加
  arrowParens: 'avoid', // 可能な場合、アロー関数の引数の括弧を省略
  endOfLine: 'lf', // 改行コードをLF（Unix形式）に設定
  jsxSingleQuote: false, // JSX内では二重引用符を使用
  jsxBracketSameLine: false, // JSXの閉じ括弧を改行して配置
  quoteProps: 'as-needed', // 必要な場合のみプロパティ名をクォートで囲む
  embeddedLanguageFormatting: 'auto', // 埋め込み言語のフォーマットを自動で行う
  htmlWhitespaceSensitivity: 'css', // HTMLの空白の扱いをCSSの表示方法に合わせる
  vueIndentScriptAndStyle: false, // Vueファイルのscriptとstyleタグをインデントしない
};
