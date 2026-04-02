/**
 * ESLint設定ファイル
 * コード品質とスタイルのルールを定義
 */

// 各種プラグインとモジュールのインポート
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // ビルド成果物やnode_modulesなどをチェック対象から除外
  globalIgnores(['dist', 'node_modules', 'eslint.config.js', '.prettierrc.js']),

  // ===== 共通ルール（すべてのファイル） =====
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended, // JavaScriptの推奨ルール
      prettierConfig, // Prettierとの競合を回避
    ],
    plugins: {
      import: importPlugin, // importの順序などを制御するプラグイン
    },
    rules: {
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreVoid: true,
          ignoreIIFE: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      // ----- 一般的なルール -----
      'no-console': ['warn', { allow: ['warn', 'error'] }], // コンソール出力を警告（本番環境では不要なため）
      'no-alert': 'warn', // alert/confirm/promptの使用を警告
      'no-debugger': 'warn', // debuggerの使用を警告
      'prefer-const': 'error', // 再代入されない変数はconstを使用
      'no-var': 'error', // varの使用を禁止
      eqeqeq: ['error', 'always', { null: 'ignore' }], // 等価演算子は===を使用（nullとの比較は==を許可）

      // ----- 未使用変数に関するルール -----
      'no-unused-expressions': 'warn', // 未使用の式を警告（副作用のない式は不要）

      // ----- importの順序を制御 -----
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js組み込みモジュール（fs, pathなど）
            'external', // npm パッケージ（react, lodashなど）
            'internal', // プロジェクト内の内部パス（@/componentsなど）
            ['parent', 'sibling'], // 親ディレクトリと同じディレクトリ
            'index', // 現在のディレクトリのindex
            'object', // オブジェクトのimport
            'type', // 型のimport
          ],
          'newlines-between': 'always', // グループ間に空行を挿入
          alphabetize: {
            order: 'asc', // アルファベット順に並べる
            caseInsensitive: true, // 大文字小文字を区別しない
          },
        },
      ],
    },
  },
  // ===== TypeScript固有のルール =====
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended, // TypeScriptの基本ルール
      tseslint.configs.recommendedTypeChecked, // 型チェックを活用した厳格なルール
      tseslint.configs.stylisticTypeChecked, // スタイルに関するルール
      reactHooks.configs.flat.recommended, // React Hooksのルール
      reactRefresh.configs.vite, // Vite + React用の設定
    ],
    languageOptions: {
      ecmaVersion: 2022, // 対応するECMAScriptのバージョン
      globals: globals.browser, // ブラウザ環境のグローバル変数
      parserOptions: {
        // 型チェックを行うためのtsconfig
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ----- TypeScript固有のルール -----
      '@typescript-eslint/explicit-function-return-type': [
        'off',
        {
          allowExpressions: true, // 表現式は戻り値の型を省略可能
          allowTypedFunctionExpressions: true, // 型付き関数式は戻り値の型を省略可能
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any型の使用を警告
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // _で始まる引数は未使用でも警告しない
          varsIgnorePattern: '^_', // _で始まる変数は未使用でも警告しない
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // 型のインポートはimport typeを使用
          disallowTypeAnnotations: false, // 型アノテーションでのインポートを許可
        },
      ],
      // ----- 命名規則 -----
      '@typescript-eslint/naming-convention': [
        'error',
        // インターフェース名はIで始める（例: IUserProps）
        {
          selector: 'interface',
          format: ['PascalCase'], // パスカルケース（大文字始まり）
          prefix: ['I'], // 接頭辞「I」を付ける
        },
        // 型名はPascalCase（例: UserType, ResponseData）
        {
          selector: 'typeLike',
          format: ['PascalCase'], // パスカルケース（大文字始まり）
        },
        // privateメンバーは_で始める（例: private _userId）
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'], // キャメルケース（小文字始まり）
          leadingUnderscore: 'require', // 接頭辞「_」を付ける
        },
      ],
    },
  },
  // ===== Reactコンポーネント固有のルール =====
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      // ----- Reactコンポーネントのルール -----
      'react-hooks/exhaustive-deps': 'warn', // useEffectの依存配列の不足を警告
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // コンポーネントのみをエクスポート（定数は許可）
    },
  },
  // ===== React Query固有のルール =====
  {
    files: ['src/hooks/**/*.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  // ===== テストファイル用のルール =====
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      // ----- テスト用に一部ルールを緩和 -----
      'no-console': 'off', // テスト中のコンソール出力を許可
      '@typescript-eslint/no-explicit-any': 'off', // テスト中のany型の使用を許可
    },
  },
]);
